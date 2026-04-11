console.log("Spiker has been Spiked! 🚀");

async function captureWebpage() {
    try {
        const imageCaptured = await chrome.tabs.captureVisibleTab(null, {
            format: 'jpeg',
            quality: 85
        });
        console.log("Image Capturation Succesful! 📸");
        return imageCaptured;
    } catch (error) {
        console.error("Web Capture was Unsuccessful due to: ", error);
    }
}

async function analyzeVibeWithGemini(base64Image) {
    const apiKey = "YOUR_API_KEY_HERE"; 
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const cleanBase64 = base64Image.split(',')[1];
    
    const systemPrompt = "You are an expert accessibility assistant. Describe the visual aesthetic, layout, and main subject of this webpage interface in 2 short, conversational sentences for a visually impaired user. Be concise, warm, and helpful.";

    const requestBody = {
        contents: [{
            parts: [
                { text: systemPrompt },
                { inline_data: { mime_type: "image/jpeg", data: cleanBase64 } }
            ]
        }]
    };

    try {
        console.log("Sending picture to Gemini API... 🧠");
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        const vibeDescription = data.candidates[0].content.parts[0].text;
        
        console.log("Gemini says: ", vibeDescription);
        return vibeDescription;

    } catch (error) {
        console.error("Gemini API Error ❌:", error);
        return "Sorry, I am having trouble reading the screen right now.";
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "capture_vibe") {
        console.log("Message received from UI! Snapping a picture... 📷");

        captureWebpage().then(async (imageResult) => {
            const aiText = await analyzeVibeWithGemini(imageResult);
            
            sendResponse({ 
                status: "success", 
                imageBase64: imageResult,
                description: aiText 
            });
        });

        return true; 
    }
});