import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const msg = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const reply = msg.content[0].text;
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return res.status(500).json({ error: 'Failed to get response' });
  }
}