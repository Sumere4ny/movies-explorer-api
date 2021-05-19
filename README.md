# movies-explorer-api

#### Api дипломного проекта.

Публичный IP: 84.252.135.174

[Ссылка на api, размещенный в Яндекс.Облаке](https://api.sumere4ny-movies.nomoredomains.icu)

##### Роуты
- POST /signup - создаёт пользователя с переданными в теле email, password и name
- POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT
- POST /signout - очищение cookies и удаление токена, выход из учетной записи
- GET /users/me - возвращает информацию о пользователе (email и имя)
- PATCH /users/me - обновляет информацию о пользователе (email и имя)
- GET /movies - возвращает все сохранённые пользователем фильмы
- POST /movies - создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail 
- DELETE /movies/movieId - удаляет сохранённый фильм по _id
