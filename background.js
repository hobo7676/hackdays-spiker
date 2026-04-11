// Load API key from config
importScripts('config.js');

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
        console.error("Web Capture Failed (Are you on a settings page?): ", error);
        return null; // Return null so our AI knows the picture failed!
    }
}

async function analyzeVibeWithGemini(base64Image) {
    // Safety Net 1: Did the picture even take?
    if (!base64Image) {
        return {
            ok: false,
            text: "Error: Could not take screenshot. You cannot use this extension on Chrome/Edge settings pages or New Tab pages. Please go to a normal website!"
        };
        return {
            ok: false,
            text: "Error: Could not take screenshot. You cannot use this extension on Chrome/Edge settings pages or New Tab pages. Please go to a normal website!"
        };
    }

    // 🚨 PASTE YOUR NEW KEY HERE 🚨
    const apiKey = "AIzaSyCn6mgVfJa2U-s8CNW0_KeCIe-NdjgodAo"; 
    const cleanBase64 = base64Image.split(',')[1];
    const modelsToTry = [
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-1.5-flash-8b"
    ];
    
    // Make sure this isn't empty!
    const systemPrompt = "You are an expert accessibility assistant. Describe the visual aesthetic, layout, and main subject of this webpage interface in 2 short, conversational sentences for a visually impaired user. Be concise, warm, and helpful.";

    const requestBody = {
        contents: [{
            parts: [
                { text: systemPrompt },
                { inline_data: { mime_type: "image/jpeg", data: cleanBase64 } }
            ]
        }]
    };

    let lastErrorMessage = "Unknown Gemini API error.";

    for (const model of modelsToTry) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        try {
            console.log(`Sending picture to Gemini API with ${model}... 🧠`);
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (!response.ok) {
                lastErrorMessage = data.error?.message || `HTTP ${response.status}`;
                console.error(`❌ Model ${model} failed:`, data);
                continue;
            }

            const vibeDescription = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!vibeDescription) {
                lastErrorMessage = "No text returned by Gemini.";
                continue;
            }

            console.log("Gemini says: ", vibeDescription);
            return {
                ok: true,
                text: vibeDescription,
                model
            };

        } catch (error) {
            console.error(`Gemini API request failed for ${model} ❌:`, error);
            lastErrorMessage = "Network error while contacting Gemini.";
        }
    }

    return {
        ok: false,
        text: `API Error: ${lastErrorMessage}`
    };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "capture_vibe") {
        console.log("Message received from UI! Snapping a picture... 📷");

        captureWebpage().then(async (imageResult) => {
            const aiResult = await analyzeVibeWithGemini(imageResult);
            const captureOk = Boolean(imageResult);
            const finalSuccess = captureOk && aiResult.ok;
            
            sendResponse({ 
                status: finalSuccess ? "success" : "error", 
                imageBase64: imageResult,
                description: aiResult.text,
                aiOk: aiResult.ok,
                modelUsed: aiResult.model || null
                description: aiResult.text,
                aiOk: aiResult.ok,
                modelUsed: aiResult.model || null
            });
        });

        return true; 
    }
});