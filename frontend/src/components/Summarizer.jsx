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
    setSummary(""); // Clear the old summary
    try {
      // The payload key 'length_preset' must match the FastAPI backend model.
      const res = await axios.post("http://localhost:8000/summarize/", {
        text,
        length_preset: length, // This key stays the same
      });
      setSummary(res.data.summary);
    } catch (err) {
      setError(err.response?.data?.detail || "Error connecting to the server.");
      setSummary("");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
      <textarea
        className="w-full h-48 p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 transition-shadow"
        placeholder="Paste the text to summarize here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex items-center justify-between mb-4">
        <label className="text-gray-700">
          Summary Length:
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="ml-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading || !text}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Processing..." : "Summarize"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {summary && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <h2 className="font-bold text-lg mb-2 text-gray-800">Your Summary:</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
}