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
    }

    // API key loaded from config.js / .env
    const apiKey = CONFIG.GEMINI_API_KEY;
    
    const url = "https://api.groq.com/openai/v1/chat/completions";
    
    // Groq vision expects the full data URI (data:image/jpeg;base64,...)
    const imageDataUrl = base64Image.startsWith("data:") 
        ? base64Image 
        : `data:image/jpeg;base64,${base64Image}`;
    
    const systemPrompt = "You are an expert accessibility assistant. Describe the visual aesthetic, layout, and main subject of this webpage interface in 2 short, conversational sentences for a visually impaired user. Be concise, warm, and helpful.";

    const requestBody = {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
            { role: "system", content: systemPrompt },
            {
                role: "user",
                content: [
                    { type: "text", text: "Analyze this webpage screenshot:" },
                    {
                        type: "image_url",
                        image_url: { url: imageDataUrl }
                    }
                ]
            }
        ],
        max_tokens: 300
    };

    try {
        console.log("Sending picture to Gemini API... 🧠");
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        
        // Safety Net 2: Did the API reject the key or prompt?
        if (!response.ok) {
            console.error("❌ API REJECTED IT! Reason:", data);
            return {
                ok: false,
                text: `API Error: ${data.error?.message || "Check the background console."}`
            };
        }

        const vibeDescription = data.choices[0].message.content;
        console.log("Gemini says: ", vibeDescription);
        return {
            ok: true,
            text: vibeDescription,
            model: data.model
        };

    } catch (error) {
        console.error("Gemini API Error :", error);
        return {
            ok: false,
            text: "Sorry, a critical error occurred while contacting the AI."
        };
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "capture_vibe") {
        console.log("Message received from UI! Snapping a picture... 📷");

        captureWebpage().then(async (imageResult) => {
            const aiResult = await analyzeVibeWithGemini(imageResult);
            
            sendResponse({ 
                status: aiResult.ok ? "success" : "error", 
                imageBase64: imageResult,
                description: aiResult.text,
                aiOk: aiResult.ok,
                modelUsed: aiResult.model || null
            });
        });

        return true; 
    }
});