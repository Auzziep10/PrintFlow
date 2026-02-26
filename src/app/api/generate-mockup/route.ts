import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { prompt, logoBase64 } = body;

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // Must configure in Vercel or locally
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Missing GEMINI_API_KEY environment variable. Please add it to .env.local' }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey });

        // Base generation parameter structure
        const generateParams: any = {
            model: 'gemini-3.0-pro', // Fallback model if image specific endpoint string differs
            prompt: prompt,
            config: {
                numberOfImages: 1,
                aspectRatio: "1:1",
                outputMimeType: "image/jpeg"
            }
        };

        // If a logo is provided, we can pass it as a reference image for the Gemini model to utilize.
        // We will try using editing or subject reference via the API config if needed.
        // (If the SDK accepts editConfig or referenceImages, we append it)
        if (logoBase64) {
            generateParams.config.editConfig = {
                editMode: 'DEFAULT',
                referenceImages: [{
                    image: {
                        imageBytes: logoBase64
                    }
                }]
            };
        }

        // Create the contents layout
        const contents: any[] = [{ text: prompt }];

        if (logoBase64) {
            // For multimodal edit or reference, just attach the image to the multimodal prompt
            contents.unshift({
                inlineData: {
                    mimeType: "image/png", // generic, or infer from base64
                    data: logoBase64
                }
            });
        }

        // Call standard generation endpoint but specify IMAGE modality
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: contents,
            config: {
                responseModalities: ["IMAGE"]
            }
        });

        let base64Image = null;

        if (response?.candidates && response.candidates.length > 0) {
            const parts = response.candidates[0].content?.parts || [];
            const imagePart = parts.find(p => p.inlineData);
            if (imagePart && imagePart.inlineData) {
                base64Image = imagePart.inlineData.data;
            }
        }

        if (!base64Image) {
            throw new Error(`Failed to generate image. No images returned from API.`);
        }

        const dataUrl = `data:image/jpeg;base64,${base64Image}`;

        return NextResponse.json({ success: true, url: dataUrl });

    } catch (error: any) {
        console.error('API Route Error generating AI mockup:', error?.message || error);
        return NextResponse.json({ error: error?.message || 'Failed to generate mockup' }, { status: 500 });
    }
}
