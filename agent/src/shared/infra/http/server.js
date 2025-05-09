/* eslint-disable no-console */
const dotenv = require('dotenv')
dotenv.config();

const app = require('./app');

const port = process.env.PORT ?? 3001;

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${process.env.PORT || port}! 🏆`);
});
