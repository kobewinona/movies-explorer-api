const fixturedInvalidMovieData = {
  image: 'invalid image link',
  trailerLink: 'invalid trailer link',
  thumbnail: 'invalid thumbnail link',
};

const fixturedValidMovieData = {
  country: 'United Kingdom',
  director: 'Ridley Scott',
  duration: 94,
  year: '1979',
  description: 'Alien is a 1979 science fiction horror film'
    + "directed by Ridley Scott and written by Dan O'Bannon."
    + "Based on a story by O'Bannon and Ronald Shusett,"
    + 'it follows the crew of the commercial space tug Nostromo,'
    + 'who, after coming across a mysterious derelict spaceship'
    + 'on an uncharted planetoid, find themselves up against'
    + 'an aggressive and deadly extraterrestrial set loose on the Nostromo.'
    + 'The film stars Tom Skerritt, Sigourney Weaver, Veronica Cartwright,'
    + 'Harry Dean Stanton, John Hurt, Ian Holm, and Yaphet Kotto.'
    + 'It was produced by Gordon Carroll, David Giler, and Walter Hill'
    + 'through their company Brandywine Productions and was distributed by 20th Century-Fox.',
  image: 'https://filmartgallery.com/cdn/shop/files/Alien-Vintage-Movie-Poster-Original-1-Sheet-27x41.jpg?v=1684645235',
  trailerLink: 'https://www.youtube.com/watch?v=jQ5lPt9edzQ',
  thumbnail: 'https://www.themoviedb.org/t/p/w220_and_h330_face/rPV3tePkV3EdlheLP1mt0OjKqWb.jpg',
  movieId: 210740237509,
  nameRU: 'Чужой',
  nameEN: 'Alien',
};

module.exports = {
  fixturedInvalidMovieData,
  fixturedValidMovieData,
};
