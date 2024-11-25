const AnalysisResult = ({ data }) => {
    return (
        <div>
            <h2>Analysis for: {data.url}</h2>
            <p><strong>Safety Rating:</strong> {data.safetyRating}/10</p>
            <p><strong>Summary:</strong> {data.summary}</p>
            <p><strong>Numerical Statistics:</strong></p>
            <ul>
                <li><strong>Harmless:</strong> {data.numericalStatistics.harmless}%</li>
                <li><strong>Undetected:</strong> {data.numericalStatistics.undetected}%</li>
                <li><strong>Malicious:</strong> {data.numericalStatistics.malicious}%</li>
            </ul>
            <p><strong>Recommendation:</strong> {data.recommendation}</p>
        </div>
    );
};
export default AnalysisResult;
