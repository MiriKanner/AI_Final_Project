import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmailResult = ({ result }) => {
  if (!result) return null;

  const { phishingLikelihood, summary, advice, categories } = result;

  const chartData = {
    labels: Object.keys(categories || {}),
    datasets: [
      {
        label: "Phishing Risk Factors",
        data: Object.values(categories || {}),
        backgroundColor: ["#007bff", "#dc3545", "#ffc107", "#28a745"],
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
        text: "Phishing Risk Analysis",
      },
    },
  };

  return (
    <div className="email-analysis-container">
      <h2>Email Analysis Result</h2>
      <p>
        <strong>Phishing Likelihood:</strong>{" "}
        <span style={{ color: phishingLikelihood > 80 ? "red" : "green" }}>
          {phishingLikelihood}%
        </span>
      </p>
      <Bar data={chartData} options={chartOptions} />
      <h3>Summary:</h3>
      <p>{summary}</p>
      <h3>Advice:</h3>
      <ul>
        {advice.split("\n").map(
          (item, index) => item.trim() && <li key={index}>{item}</li>
        )}
      </ul>
    </div>
  );
};

export default EmailResult;
