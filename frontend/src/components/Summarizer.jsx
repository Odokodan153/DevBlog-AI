import React, { useState } from "react";
import axios from "axios";

export default function Summarizer() {
  const [text, setText] = useState("");
  const [length, setLength] = useState("medium");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/summary/", { text, length });
      setSummary(res.data.summary);
    } catch (err) {
      setError(err.response?.data?.detail || "Грешка при обобщаване.");
      setSummary("");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl">
      <textarea
        className="w-full h-40 p-2 border rounded mb-2"
        placeholder="Въведи текст за обобщаване..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label className="block mb-2">
        Избери дължина на обобщението:{" "}
        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="ml-2 p-1 border rounded"
        >
          <option value="short">Кратко</option>
          <option value="medium">Средно</option>
          <option value="long">Дълго</option>
        </select>
      </label>

      <button
        onClick={handleSubmit}
        disabled={loading || !text}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Обобщаване..." : "Обобщи"}
      </button>

      {error && <p className="mt-2 text-red-600">{error}</p>}

      {summary && (
        <div className="mt-4 p-4 bg-white shadow rounded">
          <h2 className="font-semibold mb-2">Обобщение:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
