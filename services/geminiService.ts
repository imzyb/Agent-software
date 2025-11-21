import { GoogleGenAI } from "@google/genai";

// Initialize the client securely using the environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const summarizeChangelog = async (changelog: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key 未配置，无法使用 AI 摘要功能。";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful assistant for a software download site. 
      Please summarize the following software update log (changelog) into concise Simplified Chinese (简体中文).
      Highlight key features, bug fixes, and important changes. Use bullet points.
      Keep it technical but easy to read.
      
      Changelog:
      ${changelog}`,
    });

    return response.text || "无法生成摘要。";
  } catch (error) {
    console.error("Gemini summarization failed:", error);
    return "AI 摘要生成失败，请稍后再试。";
  }
};