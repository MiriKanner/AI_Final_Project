import React from "react";

const AnalysisResults = ({ results }) => {
  const getRiskClass = (risk) => {
    switch (risk) {
      case "low":
        return "risk-low";
      case "medium":
        return "risk-medium";
      case "high":
        return "risk-high";
      default:
        return "risk-unknown";
    }
  };

  return (
    <div className="analysis-results">
      <h2>Analysis Results</h2>
      <ul>
        {results.map((result, idx) => (
          <li key={idx} className={getRiskClass(result.riskLevel)}>
            <p>
              <strong>{result.type}:</strong> {result.value}
            </p>
            <p>Risk Level: {result.riskLevel}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisResults;
