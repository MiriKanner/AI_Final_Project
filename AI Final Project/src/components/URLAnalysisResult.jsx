import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const URLAnalysisResult = ({ data }) => {
  if (!data) {
    return <p>No data available for analysis.</p>;
  }

  // Convert riskFactors values to numbers
  const riskFactors = Object.entries(data.riskFactors).reduce((acc, [key, value]) => {
    acc[key] = parseFloat(value); // Convert string to float
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(riskFactors),
    datasets: [
      {
        data: Object.values(riskFactors),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8E44AD", "#2ECC71"],
      },
    ],
  };

  return (
    <div className="analysis-result">
      <h2>URL Analysis Result</h2>
      <p>
        <strong>Phishing Likelihood:</strong> {data.phishingLikelihood}%
      </p>
      <Doughnut data={chartData} />
      <h3>Summary:</h3>
      <p>{data.summary || "No summary available."}</p>
      <h3>Advice:</h3>
      <ul>
        {data.advice
          ? data.advice.split("\n").map((advice, idx) => (
              <li key={idx}>{advice}</li>
            ))
          : "No advice available."}
      </ul>
    </div>
  );
};

export default URLAnalysisResult;
