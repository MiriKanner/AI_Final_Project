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
            
            // עיבוד הפלט למבנה קריא
            const formattedResult = {
                phishingLikelihood: parseInt(rawResult.match(/Phishing Likelihood: (\d+)%/)[1]),
                summary: rawResult.match(/- \*\*Summary:\*\*([\s\S]*?)- \*\*Advice:\*\*/)?.[1]?.trim(),
                advice: rawResult.match(/- \*\*Advice:\*\*([\s\S]*)/)?.[1]?.trim(),
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
            <EmailResult result={result} />
        </div>
    );
};

export default EmailAnalysisForm;
