// Waits for the DOM content to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
  const analyzeButton = document.getElementById('analyzeButton'); 
  // Select the "Analyze" button by its ID
  const resultDisplay = document.getElementById('analysisResult'); 
  // Select the result display container by its ID

  // Attach an event listener to the button for the 'click' event
  analyzeButton.addEventListener('click', async () => {
      const emailContent = document.getElementById('emailContent').value.trim(); 
      // Get the trimmed value of the email content from the text area

      if (!emailContent) {
          // If no content is provided, display an error message
          resultDisplay.innerHTML = '<p class="error">Please provide email content to analyze.</p>';
          return;
      }

      try {
          // Log the email content being sent for analysis
          console.log('Sending request to server with emailContent:', emailContent);

          // Send a POST request to the server with the email content
          const response = await fetch('http://localhost:5000/email/analyze', {
              method: 'POST', // HTTP method
              headers: {
                  'Content-Type': 'application/json', // Specify JSON content type
              },
              body: JSON.stringify({ emailContent }), // Convert the email content to JSON
          });

          if (!response.ok) {
              // If the server responds with a status indicating an error, throw an error
              throw new Error(`Failed to analyze email. Server responded with status: ${response.status}`);
          }

          // Parse the response JSON from the server
          const result = await response.json();
          console.log('Response from server:', result); 
          // Log the server's response for debugging purposes

          // Destructure the relevant data fields from the response
          const { phishingLikelihood, advice, riskFactors } = result.data;

          // Process the advice text to create a list of toggleable advice items
          const adviceList = advice.split('\n').map((line, index) => `
              <div class="advice-item">
                  <button class="advice-title" data-index="${index}">
                      ${line.split('.')[0]}...
                  </button>
                  <div class="advice-details hidden" id="advice-${index}">
                      ${line}
                  </div>
              </div>
          `).join('');

          // Update the result display with the analysis data
          resultDisplay.innerHTML = `
              <h3>Analysis Results</h3>
              <p><strong>Phishing Likelihood:</strong> ${phishingLikelihood}%</p>
              <div class="progress-bar">
                  <div class="progress" style="width: ${phishingLikelihood}%;"></div>
              </div>
              <h3>Advice</h3>
              <div class="advice-list">
                  ${adviceList}
              </div>
              <h3>Risk Factors</h3>
              <ul>
                  ${Object.entries(riskFactors).map(([key, value]) => `<li>${key}: ${value}%</li>`).join('')}
              </ul>
          `;

          // Add event listeners to toggle the visibility of advice details
          document.querySelectorAll('.advice-title').forEach(button => {
              button.addEventListener('click', () => {
                  const index = button.getAttribute('data-index'); 
                  const details = document.getElementById(`advice-${index}`);
                  details.classList.toggle('hidden'); 
                  // Toggle the 'hidden' class to show/hide the advice details
              });
          });
      } catch (error) {
          console.error('Error analyzing email:', error); 
          // Log the error for debugging purposes

          // Display an error message to the user
          resultDisplay.innerHTML = `
              <p class="error">Error analyzing email: ${error.message}</p>
          `;
      }
  });
});
