import React from "react";

function Extensions() {
  return (
    <div className="page extensions-page">
      <h2>Our Extensions</h2>
      <p>
        We provide two Chrome extensions to make phishing analysis quick and easy:
      </p>
      <ul>
        <li>
          <strong>Email Analyzer:</strong> Analyze suspicious emails directly from your Gmail inbox.
        </li>
        <li>
          <strong>File Analyzer:</strong> Upload and analyze files for potential threats.
        </li>
      </ul>
      <p>
        <strong>How to use:</strong> Install the extensions, and you'll see buttons appear directly
        in your Gmail or file explorer.
      </p>
    </div>
  );
}

export default Extensions;
