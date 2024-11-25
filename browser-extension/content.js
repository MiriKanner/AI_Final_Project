const addAnalyzeButton = () => {
    // מציאת אזור הכותרת של המייל
    const emailHeader = document.querySelector(".hP"); // CSS Class לכותרת המייל
  
    if (emailHeader && !document.querySelector(".analyze-button")) {
      // יצירת כפתור עם אייקון וטקסט
      const analyzeButton = document.createElement("button");
      analyzeButton.innerHTML = `
        <img src="https://cdn-icons-png.flaticon.com/512/6815/6815042.png" alt="Analyze Email" style="width: 24px; height: 24px; margin-right: 5px;">
        <span style="font-size: 14px; color: #007bff;">Analyze</span>
      `;
      analyzeButton.className = "analyze-button";
      analyzeButton.style =
        "background-color: transparent; border: none; cursor: pointer; padding: 5px; display: flex; align-items: center; margin-left: 10px;";
  
      // הוספת אירוע לחיצה
      analyzeButton.addEventListener("click", async () => {
        console.log("Analyze Email button clicked!");
        await analyzeEmail(document.querySelector(".adn.ads .a3s.aiL"));
      });
  
      // הוספת הכפתור לצד הכותרת
      emailHeader.parentElement.appendChild(analyzeButton);
    }
  };
  
  const analyzeEmail = async (emailBody) => {
    const emailContent = emailBody.innerText.trim();
    if (!emailContent) {
      displayPopup("No email content found.", "error");
      return;
    }
  
    try {
      // קריאה ל-API לניתוח המייל
      const response = await fetch("http://localhost:5000/email/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailContent }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to analyze the email. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // הצגת תוצאה
      const phishingLikelihood = data.data.match(/Phishing Likelihood: (\d+)%/);
      const likelihood = phishingLikelihood ? phishingLikelihood[1] : "Unknown";
  
      displayPopup(
        `<strong>Phishing Likelihood:</strong> ${likelihood}%`,
        "success"
      );
    } catch (error) {
      console.error("Error analyzing email:", error);
      displayPopup(
        "An error occurred while analyzing the email. Please try again.",
        "error"
      );
    }
  };
  
  // פונקציה להצגת Popup
  const displayPopup = (message, type) => {
    const popup = document.createElement("div");
    popup.className = `custom-popup ${type}`;
    popup.innerHTML = message;
  
    popup.style =
      "position: fixed; top: 10px; right: 10px; background-color: " +
      (type === "success" ? "#28a745" : "#dc3545") +
      "; color: white; padding: 15px; border-radius: 8px; z-index: 10000; font-size: 14px; box-shadow: 0px 4px 6px rgba(0,0,0,0.1);";
  
    document.body.appendChild(popup);
  
    // הסרת ה-Popup לאחר 3 שניות
    setTimeout(() => {
      popup.remove();
    }, 3000);
  };
  
  // בדיקה כל 3 שניות אם מייל פתוח
  setInterval(addAnalyzeButton, 3000);
  