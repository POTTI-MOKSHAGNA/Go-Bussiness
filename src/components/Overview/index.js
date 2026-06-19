export default function Overview({ metrics }) {
  return (
    <section
      className="card"
      role="region"
      aria-label="Overview metrics"
    >
      <h2 className="section-title">Overview</h2>
      <div className="metrics-grid">
        {metrics.map((m) => (
          <div className="metric" key={m.id}>
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}