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

      {/* Section for images */}
      <div className="extensions-images">
        <img
          src="C:\Users\The user\AI_Final_Project-1\AI Final Project\IMG.jpg"
          alt="Email Analyzer Extension"
          className="extension-image"
        />
        
        <img
          src="C:\Users\The user\AI_Final_Project-1\AI Final Project\צילום מסך 2024-11-29 005625.png"
          alt="File Analyzer Extension"
          className="extension-image"
        />
        <img
          src="C:\Users\The user\AI_Final_Project-1\AI Final Project\צילום מסך 2024-11-29 005625.png"
          alt="URL Analyzer Extension"
          className="extension-image"
        />
      </div>
    </div>
  );
}

export default Extensions;
