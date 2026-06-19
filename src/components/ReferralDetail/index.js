import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "../NavBar";
import Footer from "../Footer";
import {ThreeDots} from 'react-loader-spinner'

// ── Formatters ──────────────────────────────────────────
function formatDateYYYYMMDD(iso) {
  if (!iso) return "";
  return String(iso).slice(0, 10).replaceAll("-", "/");
}

function formatUSD(value) {
  const n = Number(value ?? 0);
  if (!Number.isFinite(n)) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

// ── API ─────────────────────────────────────────────────
const BASE_URL = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals";

async function fetchReferralById(id) {
  const token = Cookies.get("jwt_token");
  if (!token)
    throw Object.assign(new Error("Not authenticated"), { status: 401 });

  const res = await fetch(`${BASE_URL}?id=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok)
    throw Object.assign(new Error(res.statusText), { status: res.status });

  const json = await res.json();
  if (!json.success)
    throw new Error(json.message || "Failed to fetch referral");

  const d = json.data;
  const matched =
    d?.id && String(d.id) === String(id)
      ? d
      : (d?.referrals ?? (Array.isArray(d) ? d : []))
          .find((r) => String(r.id) === String(id));

  if (!matched)
    throw Object.assign(new Error("Referral not found"), { status: 404 });

  return matched;
}

// ── Component ────────────────────────────────────────────
export default function ReferralDetail() {
  const { id } = useParams();
  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const r = await fetchReferralById(id);
        if (!cancelled) setRow(r);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [id]);

  return (
    <div className="page">
      <NavBar />
      <main className="container main">
        <h1>Referral Details</h1>

          {loading && <div className="loader-container" data-testid="loader">
            <ThreeDots color="#ff0b37" height={50} width={50} />
          </div>}

        {!loading && error && (
          <div role="alert" className="error">
            {error.message}
            {error.status ? ` (status ${error.status})` : ""}
          </div>
        )}

        {!loading && !error && !row && (
          <section className="card">
            <h2>Referral not found</h2>
            <p className="muted">We couldn't find a referral with id "{id}".</p>
            <Link to="/" className="link">← Back to dashboard</Link>
          </section>
        )}

        {!loading && !error && row && (
          <section className="card">
            <h2>{row.name}</h2>
            <dl className="summary-grid">
              <div className="summary-row">
                <dt>Referral ID</dt>
                <dd>{row.id}</dd>
              </div>
              <div className="summary-row">
                <dt>Service Name</dt>
                <dd>{row.serviceName}</dd>
              </div>
              <div className="summary-row">
                <dt>Date</dt>
                <dd>{formatDateYYYYMMDD(row.date)}</dd>
              </div>
              <div className="summary-row">
                <dt>Profit</dt>
                <dd>{formatUSD(row.profit)}</dd>
              </div>
            </dl>
            <Link to="/" className="link">← Back to dashboard</Link>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}