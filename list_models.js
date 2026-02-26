const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');

// You must initialize with the proper endpoint/client setup.
// GenAI SDK lists models via ai.models.list()
const ai = new GoogleGenAI({ apiKey: 'AIzaSyCeVmJr1ML-_oANxz8-lUUchBUFom8CIlg' });

async function listModels() {
    try {
        const models = await ai.models.list();
        let text = "";
        for await (const model of models) {
            text += JSON.stringify(model) + "\n";
        }
        fs.writeFileSync('valid_models.txt', text);
        console.log("Wrote full models");
    } catch (error) {
        console.error("Error listing models:", error);
    }
}
listModels();
