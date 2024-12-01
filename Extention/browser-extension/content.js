/**
 * Adds an "Analyze" button to email headers in the Gmail interface.
 */
const addAnalyzeButton = () => {
  const emailHeader = document.querySelector(".hP"); // Selects the email title element in Gmail (CSS Class: "hP").

  // Checks if the email header exists and if the button hasn't already been added.
  if (emailHeader && !document.querySelector(".analyze-button")) {
      const analyzeButton = document.createElement("button"); // Creates a new button element.
    
      // Sets the inner HTML of the button, including an icon and label for the "Analyze" button.
      analyzeButton.innerHTML = `
          <img src="https://cdn-icons-png.flaticon.com/512/6815/6815042.png" alt="Analyze Email" style="width: 24px; height: 24px; margin-right: 5px;">
          <span style="font-size: 14px; color: #007bff;">Analyze</span>
      `;
    
      analyzeButton.className = "analyze-button"; // Adds a class name to the button for easier identification.
    
      // Styles the button with inline CSS for a transparent background and custom layout.
      analyzeButton.style =
          "background-color: transparent; border: none; cursor: pointer; padding: 5px; display: flex; align-items: center; margin-left: 10px;";
    
      // Adds a click event listener to the button that triggers the `analyzeEmail` function.
      analyzeButton.addEventListener("click", async () => {
          console.log("Analyze Email button clicked!"); // Logs the button click to the console.
          await analyzeEmail(document.querySelector(".adn.ads .a3s.aiL")); // Passes the email content element to the `analyzeEmail` function.
      });
    
      emailHeader.parentElement.appendChild(analyzeButton); // Appends the button to the parent of the email header.
  }
};

/**
* Analyzes the content of an email by sending it to the backend server.
* @param {HTMLElement} emailBody - The element containing the email content.
*/
const analyzeEmail = async (emailBody) => {
  const emailContent = emailBody.innerText.trim(); // Extracts and trims the email content text.

  // If the email content is empty, show an error popup.
  if (!emailContent) {
      displayPopup("No email content found.", "error");
      return;
  }

  try {
      // Sends a POST request to the backend server with the email content.
      const response = await fetch("http://localhost:5001/email/analyze", {
          method: "POST",
          headers: {
              "Content-Type": "application/json", // Indicates the request body is JSON.
          },
          body: JSON.stringify({ emailContent }), // Sends the email content in the request body.
      });

      // Checks if the server responded with an error.
      if (!response.ok) {
          throw new Error(`Failed to analyze the email. Status: ${response.status}`);
      }

      const data = await response.json(); // Parses the JSON response from the server.

      // Extracts the phishing likelihood from the server response using a regex pattern.
      const phishingLikelihood = data.data.match(/Phishing Likelihood: (\d+)%/);
      const likelihood = phishingLikelihood ? phishingLikelihood[1] : "Unknown"; // Defaults to "Unknown" if no match.

      // Displays a success popup with the phishing likelihood percentage.
      displayPopup(
          `<strong>Phishing Likelihood:</strong> ${likelihood}%`,
          "success"
      );
  } catch (error) {
      console.error("Error analyzing email:", error); // Logs any errors to the console.

      // Displays an error popup if the analysis fails.
      displayPopup(
          "An error occurred while analyzing the email. Please try again.",
          "error"
      );
  }
};

/**
* Displays a popup notification on the screen.
* @param {string} message - The message to display in the popup.
* @param {string} type - The type of popup ("success" or "error").
*/
const displayPopup = (message, type) => {
  const popup = document.createElement("div"); // Creates a new div element for the popup.
  popup.className = `custom-popup ${type}`; // Adds classes for custom styling based on the type.
  popup.innerHTML = message; // Sets the popup content to the provided message.

  // Styles the popup with inline CSS, including colors for success and error types.
  popup.style =
      "position: fixed; top: 10px; right: 10px; background-color: " +
      (type === "success" ? "#28a745" : "#dc3545") +
      "; color: white; padding: 15px; border-radius: 8px; z-index: 10000; font-size: 14px; box-shadow: 0px 4px 6px rgba(0,0,0,0.1);";

  document.body.appendChild(popup); // Appends the popup to the document body.

  // Automatically removes the popup after 3 seconds.
  setTimeout(() => {
      popup.remove();
  }, 3000);
};

// Runs the `addAnalyzeButton` function every 3 seconds to ensure the button is added dynamically.
setInterval(addAnalyzeButton, 3000);
