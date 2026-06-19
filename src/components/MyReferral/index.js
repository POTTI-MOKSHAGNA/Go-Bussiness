import { useState } from "react";

export default function MyReferral({ referral }) {
  const link = referral?.link ?? "";
  const code = referral?.code ?? "";
  const [copied, setCopied] = useState("");

  async function copy(value, which) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      /* noop */
    }
  }

  return (
    <section className="card share" aria-label="Share referral">
      <h2 className="section-title">Refer friends and earn more</h2>

      <div className="field">
        <label htmlFor="referral-link">Your Referral Link</label>
        <div className="row">
          <input
            id="referral-link"
            type="text"
            value={link}
            readOnly
            onFocus={(e) => e.target.select()}
          />
          <button
            type="button"
            className="btn"
            onClick={() => copy(link, "link")}
          >
            {copied === "link" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="field">
        <label htmlFor="referral-code">Your Referral Code</label>
        <div className="row">
          <input
            id="referral-code"
            type="text"
            value={code}
            readOnly
            onFocus={(e) => e.target.select()}
          />
          <button
            type="button"
            className="btn"
            onClick={() => copy(code, "code")}
          >
            {copied === "code" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </section>
  );
}