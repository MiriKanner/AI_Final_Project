import React from 'react';

const EmailResult = ({ result }) => {
    if (!result) return null;

    const { phishingLikelihood, summary, advice } = result;

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
            <h2>Email Analysis Result</h2>
            <p>
                <strong>Phishing Likelihood:</strong> <span style={{ color: phishingLikelihood > 80 ? 'red' : 'green' }}>{phishingLikelihood}%</span>
            </p>
            <h3>Summary:</h3>
            <p>{summary}</p>
            <h3>Advice:</h3>
            <ul>
                {advice.split('\n').map((item, index) => (
                    item.trim() && <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmailResult;
