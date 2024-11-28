import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const FileAnalysisResult = ({ data }) => {
  if (!data) {
    return null;
  }

  const { virusTotalData, geminiAnalysis } = data;

  const chartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Analysis Results",
        data: virusTotalData
          ? [
              virusTotalData.positive || 0,
              virusTotalData.negative || 0,
              virusTotalData.neutral || 0,
            ]
          : [0, 0, 0],
        backgroundColor: ["#dc3545", "#28a745", "#ffc107"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "VirusTotal Analysis Results",
      },
    },
  };

  return (
    <div className="file-analysis-container">
      <h2>File Analysis Result</h2>
      <div className="analysis-section">
        <h3 className="section-header">VirusTotal Analysis</h3>
        <ul className="result-list">
          <li>
            <strong>File ID:</strong>{" "}
            <span className="result-value">{virusTotalData?.id || "N/A"}</span>
          </li>
          <li>
            <strong>File Type:</strong>{" "}
            <span className="result-value">{virusTotalData?.type || "N/A"}</span>
          </li>
          <li>
            <strong>Analysis Link:</strong>{" "}
            {virusTotalData?.analysisLink ? (
              <a
                href={virusTotalData.analysisLink}
                target="_blank"
                rel="noopener noreferrer"
                className="analysis-link"
              >
                View on VirusTotal
              </a>
            ) : (
              "N/A"
            )}
          </li>
        </ul>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FileAnalysisResult;
