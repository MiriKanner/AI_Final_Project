import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [url, setUrl] = useState('');
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
          console.log("dpsdpsd")
            const response = await axios.post('http://localhost:5000/url', { url });
            console.log(response, "Full response from server");
console.log(response.data, "Data from server");

            setAnalysisData(response.data.data); // גישה לנתונים מ-response
        } catch (err) {
            setError('Failed to fetch analysis. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>URL Safety Analyzer</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <label htmlFor="url">Enter URL:</label>
                <input
                    id="url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
                />
                <button type="submit" style={{ marginLeft: '10px', padding: '5px 15px' }}>
                    Analyze
                </button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {analysisData && (
                <div>
                    <h2>Analysis Result:</h2>
                    <pre>{analysisData}</pre> {/* הצגת הנתונים כמו שהם */}
                </div>
            )}
        </div>
    );
};

export default App;
