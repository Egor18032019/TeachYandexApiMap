import axios from "axios";

const Error = {
  INVALID_LOGIN: 400,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 404,
  NO_INTERNET: `Network Error`,
  BAD_TIMEOUT: `timeout of 5000ms exceeded`,
};

export const createAPI = (onUnauthorized, onBadRequest) => {
  const api = axios.create({
    baseURL: ``,
    timeout: 5000,
    withCredentials: true,
    // Запросы должны предоставлять доступ к кукам. В случае, если запросы отправляются через axios, должен быть проставлен параметр withCredentials: true.
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    if (err.message === Error.NO_INTERNET || err.message === Error.BAD_TIMEOUT) {
      onBadRequest(err.message);
      throw err;
      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
    } else if (err.response.status === Error.UNAUTHORIZED) {
      // Запрос авторизации - это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw err;
    } else if (err.response.status === Error.BAD_REQUEST) {
      onBadRequest(err);
      throw err;
    }
    throw err;

  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
