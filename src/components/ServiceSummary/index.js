import './index.css';
function ServiceSummary({ summary }) {
  const rows = [
    ["Service", summary.service],
    ["Your Referrals", summary.yourReferrals],
    ["Active Referrals", summary.activeReferrals],
    ["Total Ref. Earnings", summary.totalRefEarnings],
  ];
  return (
    <section className="card" aria-label="Service summary">
      <h2 className="section-title">Service summary</h2>
      <dl className="summary-grid">
        {rows.map(([label, value]) => (
          <div className="summary-row" key={label}>
            <dt>{label}</dt>
            <dd>{value ?? "—"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
export default ServiceSummary;