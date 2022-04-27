const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve('build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Served at http://127.0.0.1:${port}`);
});