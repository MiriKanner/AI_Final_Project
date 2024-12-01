import React from "react";

const FileAnalysisResult = ({ result }) => {
  return (
    <div className="analysis-result-container">
      <h2 className="analysis-header">File Analysis Result</h2>

      {/* VirusTotal Analysis */}
      <div className="section">
        <h3 className="section-header">VirusTotal Analysis</h3>
        <div className="section-content">
          <p>
            <strong>File ID:</strong> {result.virusTotalData?.id || "N/A"}
          </p>
          <p>
            <strong>File Type:</strong> {result.virusTotalData?.type || "N/A"}
          </p>
          <p>
            <strong>Analysis Link:</strong>{" "}
            {result.virusTotalData?.analysisLink ? (
              <a
                href={result.virusTotalData.analysisLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                View on VirusTotal
              </a>
            ) : (
              "N/A"
            )}
          </p>
        </div>
      </div>

      {/* Gemini Analysis */}
      <div className="section">
        <h3 className="section-header">Gemini Analysis</h3>
        <div className="section-content">
          <p>
            <strong>Summary:</strong> {result.geminiAnalysis || "No summary available."}
          </p>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="section">
        <p className="notes">
          Ensure to use the VirusTotal link for a comprehensive analysis report.
        </p>
      </div>
    </div>
  );
};

export default FileAnalysisResult;
