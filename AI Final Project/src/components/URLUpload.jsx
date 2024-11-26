import React, { useState } from "react";
import axios from "axios";

function URLUpload() {
  const [url, setUrl] = useState("");
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/url", { url });
      setAnalysisData(response.data.data);
    } catch (err) {
      setError("Failed to fetch analysis. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="url-upload">
      <h2>URL Safety Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">Enter URL:</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <button type="submit">Analyze</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {analysisData && (
        <div className="analysis-result">
          <h3>Analysis Result:</h3>
          <pre>{analysisData}</pre>
        </div>
      )}
    </div>
  );
}

export default URLUpload;
