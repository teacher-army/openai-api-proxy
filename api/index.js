import express from "express";

const {PORT} = process.env;
const OPEN_AI_SERVER = `https://api.openai.com`;

const app = express();

app.use('/', async (req, res) => {
  const url = `${OPEN_AI_SERVER}${req.url}`;
  const options = {
    method: req.method,
    headers: {
      ...req.headers
    },
    body: req.method === 'GET' ? null : JSON.stringify(req.body)
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;
