import React from "react";

const FileAnalysisResult = ({ data }) => {
    if (!data) {
        return null; // לא להציג כלום אם אין נתונים
    }

    const { virusTotalData, geminiAnalysis } = data;

    return (
        <div className="file-analysis-container">
            <h2>File Analysis Result</h2>

            <div className="analysis-section">
                <h3 className="section-header">VirusTotal Analysis</h3>
                <ul className="result-list">
                    <li>
                        <strong>File ID:</strong>{" "}
                        <span className="result-value">{virusTotalData?.id || "N/A"}</span>
                    </li>
                    <li>
                        <strong>File Type:</strong>{" "}
                        <span className="result-value">{virusTotalData?.type || "N/A"}</span>
                    </li>
                    <li>
                        <strong>Analysis Link:</strong>{" "}
                        {virusTotalData?.analysisLink ? (
                            <a
                                href={virusTotalData.analysisLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="analysis-link"
                            >
                                View on VirusTotal
                            </a>
                        ) : (
                            "N/A"
                        )}
                    </li>
                </ul>
            </div>

            <div className="analysis-section">
                <h3 className="section-header">Gemini Analysis</h3>
                <p>
                    <strong>Summary:</strong>{" "}
                    <span className="result-value">{geminiAnalysis?.summary || "N/A"}</span>
                </p>
                <p>
                    <strong>Risk Evaluation:</strong>{" "}
                    <span className="result-value">{geminiAnalysis?.riskEvaluation || "N/A"}</span>
                </p>
                <p>
                    <strong>Advice:</strong>{" "}
                    <span className="result-value">{geminiAnalysis?.advice || "N/A"}</span>
                </p>
            </div>
        </div>
    );
};

export default FileAnalysisResult;
