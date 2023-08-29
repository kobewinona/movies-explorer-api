// noinspection JSUnresolvedFunction

const app = require('./app');
const { PORT } = require('./utils/appConfig');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at port ${PORT}`);
});
