import React from "react";

function Home() {
  return (
    <div className="page home-page">
      <h2>Welcome to Email Phishing Analyzer</h2>
      <p>
        Cybersecurity is a growing concern, and phishing is one of the most common threats. 
        Our tool empowers you to stay safe by analyzing emails, files, and URLs to detect potential threats. 
      </p>
      <p>
        <strong>Features:</strong>
        <ul>
          <li>Analyze emails to identify phishing attempts.</li>
          <li>Upload files to scan for malicious content.</li>
          <li>Verify URLs to ensure they are safe to visit.</li>
          <li>Browser extensions for instant email and file analysis.</li>
        </ul>
      </p>
      <h3>Why Choose Us?</h3>
      <p>
        Our system uses advanced algorithms and integration with top security platforms like VirusTotal and Gemini
        to provide accurate and fast analysis. You can trust us to help protect your personal and professional information.
      </p>
      <h3>How to Use the Tool:</h3>
      <p>
        Using our service is simple:
        <ol>
          <li>Navigate to the relevant section (Email, File, or URL).</li>
          <li>Paste or upload the content you wish to analyze.</li>
          <li>Review the results and follow the advice provided to stay secure.</li>
        </ol>
      </p>
      <h3>Stay Educated</h3>
      <p>
        We believe in not just providing tools but also educating our users. Explore our "Tips" section to learn
        about identifying phishing attempts and improving your cybersecurity knowledge.
      </p>
      <h3>Need Help?</h3>
      <p>
        Have questions or need support? Visit our <a href="/support">Support Page</a> or contact us at 
        <a href="mailto:support@phishing-analyzer.com">support@phishing-analyzer.com</a>.
      </p>
    </div>
  );
}

export default Home;
