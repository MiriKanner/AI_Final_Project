import React, { useState } from "react";

const tips = [
  {
    title: "Verify the Sender's Email Address",
    description:
      "Always check the sender's email address. Make sure it matches the domain of the organization it claims to be from.",
    link: "https://www.phishing.org/how-to-identify-phishing",
  },
  {
    title: "Be Cautious with Password Requests",
    description:
      "Legitimate companies rarely ask you to update your password via email. Always verify such requests on the company's official website.",
    link: "https://www.ftc.gov/tips-advice/password-security",
  },
  {
    title: "Avoid Clicking Suspicious Links",
    description:
      "Hover over links to see their actual destination before clicking. If it looks suspicious, don't click it.",
    link: "https://www.phishing.org/phishing-links",
  },
  {
    title: "Look for Grammar Mistakes",
    description:
      "Many phishing emails contain grammatical errors or unnatural wording. This can be a sign of a scam.",
    link: "https://www.cyber.gov.au/grammar-errors-in-phishing",
  },
  {
    title: "Do Not Open Unexpected Attachments",
    description:
      "Avoid opening attachments in emails you didn’t expect, especially from unknown senders.",
    link: "https://www.cisa.gov/email-attachment-safety",
  },
  {
    title: "Keep Your Antivirus Updated",
    description:
      "Regularly update your antivirus software to protect against new threats.",
    link: "https://www.avast.com/antivirus",
  },
];

const Tips = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="tips-page">
      <h2>Phishing Prevention Tips</h2>
      <div className="tip-box">
        <h3>{tips[currentTip].title}</h3>
        <p>{tips[currentTip].description}</p>
        <a href={tips[currentTip].link} target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      </div>
      <button onClick={nextTip} className="next-tip-button">
        Next Tip
      </button>
    </div>
  );
};

export default Tips;
