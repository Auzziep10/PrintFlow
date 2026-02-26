const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: 'AIzaSyCeVmJr1ML-_oANxz8-lUUchBUFom8CIlg' });

async function testGeneration() {
    try {
        console.log("Testing gemini-2.5-flash-image with responseModalities IMAGE...");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: "A photorealistic cat",
            config: {
                responseModalities: ["IMAGE"]
            }
        });

        if (response) {
            console.log("SUCCESS!");
            console.log(response.text?.substring(0, 100)); // Might not have text

            // Let's see if there's inlineData in the response
            if (response.candidates && response.candidates[0].content.parts) {
                const parts = response.candidates[0].content.parts;
                for (let part of parts) {
                    if (part.inlineData) {
                        console.log("Found image data! Length:", part.inlineData.data.length);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testGeneration();
