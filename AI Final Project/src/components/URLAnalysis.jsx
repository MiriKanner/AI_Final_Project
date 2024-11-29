import React from "react";
import { Doughnut } from "react-chartjs-2";

const URLAnalysisResult = ({ data }) => {
    if (!data) {
        return <p>No data available for analysis.</p>;
    }

    const chartData = {
        labels: Object.keys(data.riskFactors),
        datasets: [
            {
                data: Object.values(data.riskFactors),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8E44AD", "#2ECC71"],
            },
        ],
    };

    return (
        <div className="analysis-result">
            <h2>URL Analysis Result</h2>
            <p><strong>Phishing Likelihood:</strong> {data.phishingLikelihood}%</p>
            <Doughnut data={chartData} />
            <h3>Summary:</h3>
            <p>{data.summary}</p>
            <h3>Advice:</h3>
            <ul>
                {data.advice.split("\n").map((advice, idx) => (
                    <li key={idx}>{advice}</li>
                ))}
            </ul>
        </div>
    );
};

export default URLAnalysisResult;
