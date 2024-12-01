import React, { useState } from 'react';
import axios from 'axios';
import EmailResult from './EmailResult';

const EmailAnalysisForm = () => {
    const [emailContent, setEmailContent] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/email/analyze', { emailContent });
            const rawResult = response.data.data;
            const formattedResult = {
                phishingLikelihood: rawResult.phishingLikelihood || 0,
                summary: rawResult.summary || 'No summary provided.',
                advice: rawResult.advice || 'No advice provided.',
                riskFactors: rawResult.riskFactors || {},
            };

            setResult(formattedResult);
        } catch (error) {
            console.error('Error analyzing email:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h1>Email Phishing Analyzer</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Paste the suspicious email content here"
                    rows="10"
                    cols="50"
                />
                <button type="submit">Analyze</button>
            </form>
            {result && <EmailResult result={result} />}
        </div>
    );
};

export default EmailAnalysisForm;
