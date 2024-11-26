import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/file/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
       console.log(response.data.data);
       console.log(response.data.data.virusTotalData);
       console.log(response.data.data.geminiAnalysis);
       console.log(response);
      setResult(response.data.data); // עדכון ה-UI עם התוצאה מהשרת
    } catch (err) {
      setError("Failed to analyze the file. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>File Analyzer</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze File"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>File Analysis Result</h2>
          <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
            <h3 style={{ color: "blue" }}>VirusTotal Analysis</h3>
            <p><strong>File ID:</strong> {result.virusTotalData?.id || "N/A"}</p>
            <p><strong>File Type:</strong> {result.virusTotalData?.type || "N/A"}</p>
            <p>
              <strong>Analysis Link:</strong>{" "}
              {result.virusTotalData?.analysisLink ? (
                <a href={result.virusTotalData.analysisLink} target="_blank" rel="noopener noreferrer">
                  View on VirusTotal
                </a>
              ) : (
                "N/A"
              )}
            </p>

            <h3 style={{ color: "blue", marginTop: "16px" }}>Gemini Analysis</h3>
            <p><strong>Summary:</strong> {result.geminiAnalysis}</p>
            {/* <p><strong>Risk Evaluation:</strong> {result.geminiAnalysis?.RiskEvaluation || "N/A"}</p>
            <p><strong>Advice:</strong> {result.geminiAnalysis?.Advice || "N/A"}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
