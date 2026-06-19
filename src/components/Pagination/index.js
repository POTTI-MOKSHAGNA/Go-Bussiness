import './index.css';
export default function Pagination({ page, pageCount, total, pageSize, onChange }) {
  if (total === 0) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  const pages = [];
  for (let i = 1; i <= pageCount; i++) pages.push(i);

  return (
    <div className="pagination">
      <span className="muted">
        Showing {start}–{end} of {total} entries
      </span>
      <div className="page-buttons">
        <button
          type="button"
          className="btn"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Previous
        </button>
        {pageCount > 1 &&
          pages.map((p) => (
            <button
              key={p}
              type="button"
              className={`btn page-num${p === page ? " active" : ""}`}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          ))}
        <button
          type="button"
          className="btn"
          disabled={page >= pageCount}
          onClick={() => onChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}