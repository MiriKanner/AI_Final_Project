import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EmailResult = ({ result }) => {
    
    if (!result) return null;
    const { phishingLikelihood, summary, advice, riskFactors } = result;

    const chartData = {
        labels: Object.keys(riskFactors),
        datasets: [
            {
                label: 'Risk Factors',
                data: Object.values(riskFactors),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40'],
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    return (
        <div>
            <h2>Email Analysis Result</h2>
            <p>
                <strong>Phishing Likelihood:</strong> {phishingLikelihood}%
            </p>
            <Doughnut data={chartData} options={chartOptions} />
            <h3>Summary:</h3>
            {summary ? (
                <p>{summary}</p>
            ) : (
                <p style={{ color: 'red' }}>No summary available.</p>
            )}
            <h3>Advice:</h3>
            {advice ? (
                <ul>
                    {advice.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            ) : (
                <p style={{ color: 'red' }}>No advice available.</p>
            )}
        </div>
    );
};

export default EmailResult;
