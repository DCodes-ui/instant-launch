import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.error('Invalid request method');
    return res.status(405).end();
  }

  const { message } = req.body;

  if (!message) {
    console.error('Message is missing');
    return res.status(400).json({ error: 'Message is required' });
  }

  // Log the environment variable to ensure it is being read correctly
  console.log('Using OpenAI API Key:', process.env.OPENAI_API_KEY);

  try {
    console.log('Sending request to OpenAI API with message:', message);
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4', // oder das Modell Ihrer Wahl
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const { choices } = response.data;
    console.log('Response from OpenAI API:', choices);
    res.status(200).json({ response: choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    res.status(500).json({ error: 'Error communicating with OpenAI API' });
  }
}