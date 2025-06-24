// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash',
  headers: { 'Content-Type': 'application/json' },
});

export async function generateContent(prompt) {
  const { data, status } = await apiClient.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_KEY}`, {
    contents: [{ parts: [{ text: prompt }] }]
  });
  if (status !== 200) throw new Error('AI response error');
  return data.candidates[0].content.parts.map(p => p.text).join('');
}
