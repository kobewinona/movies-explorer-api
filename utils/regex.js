// noinspection RegExpSimplifiable
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
const idRegex = /^[0-9a-fA-F]{24}$/;
const nameRegex = /^[A-Za-z\s]+$/;

module.exports = { urlRegex, idRegex, nameRegex };
