document.addEventListener('DOMContentLoaded' , () => {

    /* 'DOMContentLoaded' is used to hold the script until the html is fully loaded */

    const analyzeBtn = document.getElementById('analyzeBtn')
    const spinner = document.getElementById('analyzeSpinner')
    const statusArea = document.getElementById('statusArea')
    const statusText = document.getElementById('statusText')

    // Grabbing Elements used in the HTML
    
    analyzeBtn.addEventListener('click', () => {
        spinner.classList.remove('hidden'); 
        statusArea.classList.remove('hidden');
        statusArea.className = 'status-area status-loading'; 
        statusText.innerText = "Capturing screen..."; 
    

    /* Note: on click of analyzeBtn, the spinner and statusArea are made visible by removing 'hidden' class.
     * statusArea's class is updated to 'status-area status-loading' to show loading animation.
     * statusText is updated to "Capturing screen..." to inform user about the current action.
     */

    
    chrome.runtime.sendMessage({ action: "capture_vibe" }, (response) => {
            
        /* Removing the loading spinner if message is received */
        spinner.classList.add('hidden');

        /* Error Checking and Reporting */
        if (chrome.runtime.lastError || !response) {
            statusArea.className = 'status-area status-error';
            statusText.innerText = "Error: Could not wake up the background engine.";
            console.error("Messaging Error:", chrome.runtime.lastError);
            return;
        }

        
        if (response.status === "success") {
            statusArea.className = 'status-area status-done';
            statusText.innerText = "Image captured successfully!";
                
        
            console.log("Victory! Base64 received in popup: ", response.imageBase64.substring(0, 50) + "...");
        } else {
            statusArea.className = 'status-area status-error';
            statusText.innerText = "Failed to capture the webpage.";
        }
    });
})
});

