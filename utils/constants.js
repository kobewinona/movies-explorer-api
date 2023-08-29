// status codes

module.exports.OK = 200;

module.exports.BAD_REQUEST = 400;
module.exports.UNAUTHORIZED = 401;
module.exports.FORBIDDEN = 403;
module.exports.NOT_FOUND = 404;
module.exports.CONFLICT = 409;

module.exports.INTERNAL_SERVER_ERROR = 500;

// response messages

module.exports.MSSG_CONFLICT_EMAIL = 'Пользователь с таким Email уже существует';
module.exports.MSSG_SUCCESS_SIGNOUT = 'Выход прошел успешно';
module.exports.MSSG_NOT_FOUND_USER = 'Запрашиваемый пользователь не найден';
module.exports.MSSG_NOT_FOUND_MOVIE = 'Запрашиваемый фильм не найден';
module.exports.MSSG_NOT_FOUND_SERVER = 'Что-то пошло не так...';
module.exports.MSSG_UNAUTHORIZED = 'У Вас нет прав для совершения данного действия';
module.exports.MSSG_UNAUTHORIZED_AUTH = 'Необходимо авторизоваться';
module.exports.MSSG_UNAUTHORIZED_CREDENTIALS = 'Неправильные почта или пароль';
module.exports.MSSG_BAD_REQUEST = 'Данные введены некорректно';
module.exports.MSSG_INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';

// model messages

module.exports.MSSG_REQUIRED = 'Поле должно быть заполнено';
module.exports.MSSG_MINLENGTH_2 = 'Поле должно содержать более 2 символов';
module.exports.MSSG_MAXLENGTH_30 = 'Поле должно содержать не более 30 символов';
module.exports.MSSG_URL = 'Поле должно содержать URL адрес';
module.exports.MSSG_UNIQUE_EMAIL = 'Данный Email адрес уже используется';
module.exports.MSSG_VALIDATE_EMAIL = 'Поле должно содержать Email адрес';
module.exports.MSSG_VALIDATE_NAME = 'Поле должно содержать имя';
