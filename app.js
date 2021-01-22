const express = require('express');

const app = express();
const path = require('path');

const { PORT = 3000 } = process.env;
const routes = require('./routes/index.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
