import express from 'express';
import { OpenAI } from 'openai';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate-summary', async (req, res) => {
  const { topic } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You're a resume expert helping users write clear, 2–4 sentence summaries about their background.",
        },
        {
          role: "user",
          content: `Generate a short professional resume summary for someone in the field of ${topic}.`,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const generatedText = response.choices[0].message.content;
    res.status(200).json({ summary: generatedText });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate summary.' });
  }
});

export default router;
