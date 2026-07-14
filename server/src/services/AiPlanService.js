import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import mime from "mime-types";
import { academicPlannerPrompt } from "../utils/academicPrompt.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function createAiPlan(data) {
    try {
      const prompt = academicPlannerPrompt(
        data.title,
        data.subjectName,
        data.description,
        data.date,
        data.duration,
        data.hours,
        data.priority,
        Boolean(data.referenceLocalPath)
    );

    let parts = [];

    // if image exists
    if (data.referenceLocalPath) {

        const imageBuffer = fs.readFileSync(data.referenceLocalPath);

        parts.push({
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: mime.lookup(data.referenceLocalPath)
                }
        });

    }

    parts.push({
        text: prompt
    });

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: [
            {
                role: "user",
                parts
            }
        ],

        config: {
            temperature: 0.6,
            responseMimeType: "application/json"
        }

    });
    console.log(response);

   

    const text = response.text;

    const parsedText = JSON.parse(text);

    return {
        success : true, 
        data : parsedText
    }
    } catch (error) {
        return {
            success : false,
            error : error.message
        }
    }

}