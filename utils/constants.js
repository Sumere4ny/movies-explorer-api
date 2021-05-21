const BAD_REQUEST = 'Указаны некорректные данные:';
const CONFLICT = 'Пользователь с таким email уже зарегистрирован';
const FORBIDDEN = 'Недостаточно прав для выполнения операции';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка:';
const NOT_FOUND = 'Ресурс не найден';
const MOVIE_NOT_FOUND = 'Фильм не найден';
const UNAUTHORIZED = 'Необходима авторизация';
const SUCCESS = 'Успешная авторизация';
const SUCCESS_LOGOUT = 'Вы вышли из приложения';
const LIMITER_MESSAGE = 'Слишком много запросов с вашего IP, попробуйте повторить попытку позже';

module.exports = {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  MOVIE_NOT_FOUND,
  UNAUTHORIZED,
  SUCCESS,
  SUCCESS_LOGOUT,
  LIMITER_MESSAGE,
};
