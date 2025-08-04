
import { useState } from "react";

function App() {
  const [entry, setEntry] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const submitEntry = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: entry }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Devlog AI</h1>
      <textarea
        rows={8}
        style={{ width: "100%", marginTop: 10 }}
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Напиши тук какво си правил днес..."
      />
      <button onClick={submitEntry} disabled={loading || !entry}>
        {loading ? "Генерира се..." : "Изпрати към AI"}
      </button>
      {summary && (
        <div style={{ marginTop: 20 }}>
          <strong>AI summary:</strong>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
