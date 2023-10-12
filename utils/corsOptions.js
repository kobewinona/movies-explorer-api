const allowedCors = ['https://movies.dk.nomoredomainsrocks.ru'];

module.exports.corsOptions = {
  origin: (origin, callback) => {
    if (allowedCors.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};
