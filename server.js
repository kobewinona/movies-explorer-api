// noinspection JSUnresolvedFunction

require('dotenv').config();

const app = require('./app');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at port ${PORT}`);
});
