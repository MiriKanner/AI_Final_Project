document.getElementById("analyzeButton").addEventListener("click", async () => {
    const emailContent = document.getElementById("emailContent").value;
    const loadingElement = document.getElementById("loading");
    const analysisResult = document.getElementById("analysisResult");
  
    if (!emailContent) {
      alert("Please paste the email content first.");
      return;
    }
  
    // הצגת טקסט טעינה
    loadingElement.classList.remove("hidden");
    analysisResult.innerHTML = "";
  
    try {
      const response = await fetch("http://localhost:5000/email/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailContent }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to analyze the email.");
      }
  
      const data = await response.json();
      loadingElement.classList.add("hidden");
  
      // עיבוד תוצאת השרת
      const likelihoodMatch = data.data.match(/Phishing Likelihood: (\d+)%/);
      const likelihood = likelihoodMatch ? parseInt(likelihoodMatch[1]) : 0;
  
      const adviceMatch = data.data.match(/- \*\*Advice:\*\*\n([\s\S]*)/);
      const advice = adviceMatch ? adviceMatch[1].trim() : "No advice available.";
  
      analysisResult.innerHTML = `
        <div class="bar-container">
          <div class="bar" style="width: ${likelihood}%; background-color: ${likelihood > 50 ? '#dc3545' : '#28a745'};">
            ${likelihood}%
          </div>
        </div>
        <div>
          <strong>Advice:</strong>
          <p>${advice.split("\n").map(line => `<li>${line.replace("*", "").trim()}</li>`).join("")}</p>
        </div>
      `;
    } catch (error) {
      loadingElement.classList.add("hidden");
      analysisResult.innerHTML = `
        <div class="error">
          <strong>Error analyzing email:</strong>
          <p>${error.message}</p>
        </div>
      `;
    }
  });
  