console.log("Spiker has been Spiked! 🚀")

async function captureWebpage() {
    try {
        const imageCaptured = await chrome.tabs.captureVisibleTab(null , {
            format: 'jpeg',
            quality: 85
        });

        console.log("Image Capturation Succesful! 📸")
        return imageCaptured;
    }
    catch (error) {
        console.error("Web Capture was Unsuccessful due to: " , error)
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.action === "capture_vibe") {
        console.log("Message received from UI! Snapping a picture... 📷");

        captureWebpage().then((imageResult) => {
            console.log("Raw Image data: ", imageResult.substring(0, 100) + "...");
            
            sendResponse({ status: "success", imageBase64: imageResult });
        });

        return true; 
    }
});