document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const spinner = document.getElementById('analyzeSpinner');
    const statusArea = document.getElementById('statusArea');
    const statusText = document.getElementById('statusText');
    const descriptionBox = document.getElementById('descriptionBox');
    const descriptionText = document.getElementById('descriptionText');

    analyzeBtn.addEventListener('click', () => {
        spinner.classList.remove('hidden'); 
        statusArea.classList.remove('hidden');
        statusArea.className = 'status-area status-loading'; 
        statusText.innerText = "Capturing screen and analyzing vibe..."; 

        chrome.runtime.sendMessage({ action: "capture_vibe" }, (response) => {
            spinner.classList.add('hidden');

            if (chrome.runtime.lastError || !response) {
                statusArea.className = 'status-area status-error';
                statusText.innerText = "Error: Could not wake up the background engine.";
                descriptionBox.classList.add('hidden');
                return;
            }

            if (response.status === "success") {
                statusArea.className = 'status-area status-done';
                statusText.innerText = `Vibe analyzed successfully${response.modelUsed ? ` (${response.modelUsed})` : ''}!`;

                descriptionBox.classList.remove('hidden');
                descriptionText.innerText = response.description || "No description returned.";

                if (response.imageBase64) {
                    console.log("Victory! Base64 received in popup: ", response.imageBase64.substring(0, 50) + "...");
                }
            } else {
                statusArea.className = 'status-area status-error';
                statusText.innerText = response.description || "Failed to analyze the webpage.";

                descriptionBox.classList.remove('hidden');
                descriptionText.innerText = response.description || "No additional error details available.";
            }
        });
    });
});