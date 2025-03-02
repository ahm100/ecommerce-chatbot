const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('E-commerce Chatbot Backend');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});