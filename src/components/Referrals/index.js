import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import Cookies from "js-cookie";
import { FiSearch, FiChevronLeft, FiChevronRight, FiAlertCircle } from "react-icons/fi";

const BASE_URL = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals";
const ITEMS_PER_PAGE = 10;

function Referrals() {
  const navigate = useNavigate();

  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const debounceTimer = useRef(null);

  const fetchReferrals = useCallback(async (searchQuery, sortOrder) => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("jwt_token");
      if (!token) {
        navigate("/login");
        return;
      }

      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (sortOrder)   params.set("sort", sortOrder);
      const qs = params.toString() ? `?${params.toString()}` : "";

      const res = await fetch(BASE_URL + qs, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok)
        throw Object.assign(new Error(res.statusText), { status: res.status });

      const json = await res.json();

      if (!json.success)
        throw new Error(json.message || "Failed to fetch referrals");

      const data = json.data || json;
      setReferrals(Array.isArray(data.referrals) ? data.referrals : []);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Fetch on mount and when sort changes
  useEffect(() => {
    fetchReferrals(search, sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, fetchReferrals]);

  // Debounced search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchReferrals(value, sort);
    }, 300);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);

  // Formatters
  const formatProfit = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val ?? 0);

  const formatDate = (dateStr) =>
    dateStr ? String(dateStr).slice(0, 10).replaceAll("-", "/") : "";

  // Pagination math
  const totalItems = referrals.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const indexOfFirst = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentReferrals = referrals.slice(indexOfFirst, indexOfFirst + ITEMS_PER_PAGE);
  const fromEntry = totalItems === 0 ? 0 : indexOfFirst + 1;
  const toEntry = Math.min(indexOfFirst + ITEMS_PER_PAGE, totalItems);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="dashboard-section">
      {/* Filters */}
      <div className="table-header-bar">
        <h2 className="section-title">All referrals</h2>
        <div className="table-controls">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Name or service…"
              value={search}
              onChange={handleSearchChange}
              aria-label="Search referrals"
            />
          </div>
          <div className="sort-box">
            <label htmlFor="sort-select">
              Sort by date
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="state-container error-state" role="alert">
          <FiAlertCircle className="error-state-icon" />
          <p className="error-text">{error}</p>
          <button className="btn-retry" onClick={() => fetchReferrals(search, sort)}>
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      {!error && (
        <div className="table-container">
          {loading && (
            <div className="table-overlay">
              <div className="spinner small-spinner" />
            </div>
          )}
          <table className="referrals-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {currentReferrals.length > 0 ? (
                currentReferrals.map((row) => (
                  <tr
                    key={row.id}
                    className="clickable-row"
                    onClick={() => navigate(`/referral/${row.id}`)}
                  >
                    <td className="cell-name">{row.name}</td>
                    <td>{row.serviceName}</td>
                    <td>{formatDate(row.date)}</td>
                    <td className="cell-profit">{formatProfit(row.profit)}</td>
                  </tr>
                ))
              ) : (
                !loading && (
                  <tr>
                    <td colSpan={4} className="empty-table-cell">
                      No matching entries
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalItems > 0 && !error && (
        <div className="table-footer-pagination">
          <p className="pagination-summary">
            Showing {fromEntry}–{toEntry} of {totalItems} entries
          </p>
          <div className="pagination-buttons">
            <button
              className="btn-pagination"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <FiChevronLeft /> Previous
            </button>
            {pageNumbers.map((num) => (
              <button
                key={num}
                className={`btn-page-number ${currentPage === num ? "active" : ""}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
            <button
              className="btn-pagination"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Referrals;