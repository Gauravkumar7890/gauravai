
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3007;

//connection to root
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//add api key 
const apiKey = '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';

app.post('/get-response', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        prompt: userMessage,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const aiResponse = response.data.choices[0].text.trim();
    res.json({ aiResponse });
  } catch (error) {
    console.error('Error from ChatGPT API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
