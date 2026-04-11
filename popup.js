document.addEventListener('DOMContentLoaded' , () => {
    const analyzeBtn = document.getElementById('analyzeBtn')
    const spinner = document.getElementById('analyzeSpinner')
    const statusArea = document.getElementById('statusArea')
    const statusText = document.getElementById('statusText')

    
    analyzeBtn.addEventListener('click', () => {
        spinner.classList.remove('hidden'); 
        statusArea.classList.remove('hidden');
        statusArea.className = 'status-area status-loading'; 
        statusText.innerText = "Capturing screen..."; 

    
    chrome.runtime.sendMessage({ action: "capture_vibe" }, (response) => {
            
        spinner.classList.add('hidden');

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