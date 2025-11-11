
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
} else {
    console.warn("API_KEY environment variable not set. Gemini API calls will be disabled.");
}

export const getChatbotResponse = async (message: string, history: { from: 'user' | 'bot'; text: string }[]): Promise<string> => {
  if (!ai) {
    return "Lo siento, mi conexión con la IA no está configurada. Por favor, verifica la clave de API.";
  }
  try {
    // Basic context from previous messages
    const context = history.map(msg => `${msg.from === 'user' ? 'User' : 'JuniorPac'}: ${msg.text}`).join('\n');
    
    const fullPrompt = `You are JuniorPac, a friendly and helpful virtual assistant for Reybanpac employees. 
    Your knowledge is about company policies, benefits, training, and general HR questions.
    Keep your answers concise and friendly.
    
    Conversation History:
    ${context}
    
    User: "${message}"
    JuniorPac:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "Lo siento, estoy teniendo problemas para conectarme en este momento. Por favor, inténtalo de nuevo más tarde.";
  }
};
