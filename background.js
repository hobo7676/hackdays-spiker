/* A log message to indicate that script has started running */
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


/* NOTES:
 * await and async is used to hold the script running as webpage capturation takes time and no other task must be executed until. Possible Error: "Script sending empty image to Vision API"

 * quality to 85 : Larger image = more time and more power {hence minimizing for faster result}

 * imageCaptured converts the captured image to Base64 format using captureVisibleTab.
 * ++++ using null in parameter as the windowID option is not required, it is used when we want to describe which exact window to capture
*/


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

/* NOTES:
 * chrome.runtime.onMessage.addListener : Listens for messages sent from other parts of extension and executes a function 
 * if conditional checks if the action in from script received is "capture_vibe" and if true, it calls captureWebpage function to convert image captured to Base64.
 * Finally, sends a success response if image is captured  else error will be shown in console.
 */

