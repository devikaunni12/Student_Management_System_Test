// src/components/Spinner.jsx
// Small loading spinner used while API requests are in progress.

export default function Spinner() {
  return (
    <div className="spinner" aria-label="Loading">
      <div className="spinner__circle" />
    </div>
  )
}

