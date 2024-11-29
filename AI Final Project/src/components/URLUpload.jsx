import React, { useState } from "react";
import axios from "axios";
import URLAnalysisResult from "./URLAnalysisResult";

const URLUpload = () => {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {
        try {
            const response = await axios.post("http://localhost:5000/url/analyze", { url });
            setResult(response.data.data);
        } catch (error) {
            console.error("Error analyzing URL:", error.response?.data || error.message);
        }
    };

    return (
        <div className="url-upload">
            <h1>Analyze URL</h1>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to analyze"
            />
            <button onClick={handleAnalyze}>Analyze</button>
            {result && <URLAnalysisResult data={result} />}
        </div>
    );
};

export default URLUpload;
