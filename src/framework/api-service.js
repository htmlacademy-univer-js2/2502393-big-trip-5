export default class ApiService {
  /**
   * @param {string} endPoint
   * @param {string} authorization
   */
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  /**
   * Метод для отправки запроса к серверу
   * @param {Object} config
   * @param {string} config.url
   * @param {string} [config.method]
   * @param {string} [config.body]
   * @param {Headers} [config.headers]
   * @returns {Promise<Response>}
   */

  async _load({
    url,
    method = 'GET',
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    const response = await fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  /**
   * @param {Response} response Объект ответа
   * @returns {Promise<JSON>}
   */
  static parseResponse(response) {
    return response.json();
  }

  /**
   * @param {Response} response Объект ответа
   */
  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  /**
   * @param {Error} err Объект ошибки
   */
  static catchError(err) {
    throw err;
  }
}
