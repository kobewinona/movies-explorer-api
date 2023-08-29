// noinspection RegExpSimplifiable
const urlRegex = /^(https?:\/\/(?:www\.)?[a-zA-Z0-9.-]{2,}(?:\.[a-zA-Z]{2,})+(?::\d+)?(?:\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+)?(?:\.[a-zA-Z0-9]{2,})?|https?:\/\/(?:www\.)?[a-zA-Z0-9]{2,}(?:\.[a-zA-Z0-9]{2,}){2,})$/;
const idRegex = /^[0-9a-fA-F]{24}$/;
const nameRegex = /^[A-Za-z\s]+$/;

module.exports = { urlRegex, idRegex, nameRegex };
