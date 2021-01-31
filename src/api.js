import PictureModel from "./model/pictures.js";

const Method = {
  GET: `GET`,
  // PUT: `PUT`,
  POST: `POST`,
  // DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPictures() {
    return this._load({url: `data`})
      .then(Api.toJSON)
      // .then((pictures) => Object.assign({}, pictures));
  }

  // updateTask(task) {
  //   return this._load({
  //     url: `tasks/${task.id}`,
  //     method: Method.PUT,
  //     body: JSON.stringify(PhotosModel.adaptToServer(task)),
  //     headers: new Headers({"Content-Type": `application/json`})
  //   })
  //     .then(Api.toJSON)
  //     .then(PhotosModel.adaptToClient);
  // }
  //
  // addTask(task) {
  //   return this._load({
  //     url: `tasks`,
  //     method: Method.POST,
  //     body: JSON.stringify(PhotosModel.adaptToServer(task)),
  //     headers: new Headers({"Content-Type": `application/json`})
  //   })
  //     .then(Api.toJSON)
  //     .then(PhotosModel.adaptToClient);
  // }

  // deleteTask(task) {
  //   return this._load({
  //     url: `tasks/${task.id}`,
  //     method: Method.DELETE
  //   });
  // }

  _load({
    url,
    method = Method.GET,
    body = null,
    // headers = new Headers()
  }) {
    // headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
