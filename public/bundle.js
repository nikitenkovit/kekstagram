/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Api; });
/* harmony import */ var _model_pictures_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/pictures.js */ "./src/model/pictures.js");


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

class Api {
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


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: UpdateType, UserAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateType", function() { return UpdateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAction", function() { return UserAction; });
const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const UserAction = {
  UPDATE_PICTURE: `UPDATE_PICTURE`,
  ADD_PICTURE: `ADD_PICTURE`,
  DELETE_PICTURE: `DELETE_PICTURE`
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_img_upload_overlay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/img-upload-overlay.js */ "./src/view/img-upload-overlay.js");
/* harmony import */ var _view_img_upload_message_dragndrop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/img-upload-message-dragndrop.js */ "./src/view/img-upload-message-dragndrop.js");
/* harmony import */ var _view_img_upload_message_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/img-upload-message-error.js */ "./src/view/img-upload-message-error.js");
/* harmony import */ var _model_pictures_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/pictures.js */ "./src/model/pictures.js");
/* harmony import */ var _presenter_board_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presenter/board.js */ "./src/presenter/board.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api.js */ "./src/api.js");








const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j1`;
const END_POINT = `https://javascript.pages.academy/kekstagram`;

const siteMainElement = document.querySelector(`main`);

const api = new _api_js__WEBPACK_IMPORTED_MODULE_6__["default"](END_POINT, AUTHORIZATION);

const picturesModel = new _model_pictures_js__WEBPACK_IMPORTED_MODULE_3__["default"]();

const boardPresenter = new _presenter_board_js__WEBPACK_IMPORTED_MODULE_4__["default"](siteMainElement, picturesModel);

boardPresenter.init();

api.getPictures()
  .then((tasks) => {
    picturesModel.setPictures(_const_js__WEBPACK_IMPORTED_MODULE_5__["UpdateType"].INIT, tasks);
    // console.log(picturesModel.getPictures())
  })
  .catch(() => {
    picturesModel.setPictures(_const_js__WEBPACK_IMPORTED_MODULE_5__["UpdateType"].INIT, []);
  });


/***/ }),

/***/ "./src/model/pictures.js":
/*!*******************************!*\
  !*** ./src/model/pictures.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Pictures; });
/* harmony import */ var _utils_observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/observer.js */ "./src/utils/observer.js");


class Pictures extends _utils_observer_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._pictures = [];
  }

  setPictures(updateType, pictures) {
    this._pictures = pictures.slice();

    this._notify(updateType);
  }

  getPictures() {
    return this._pictures;
  }

  // updatePhotos(updateType, update) {
  //   const index = this._pictures.findIndex((picture) => picture.id === update.id);
  //
  //   if (index === -1) {
  //     throw new Error(`Can't update unexisting picture`);
  //   }
  //
  //   this._pictures = [
  //     ...this._pictures.slice(0, index),
  //     update,
  //     ...this._pictures.slice(index + 1)
  //   ];
  //
  //   this._notify(updateType, update);
  // }

  addPicture(updateType, update) {
    this._pictures = [
      update,
      ...this._pictures
    ];

    this._notify(updateType, update);
  }

  deletePhoto(updateType, update) {
    const index = this._pictures.findIndex((picture) => picture.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting picture`);
    }

    this._pictures = [
      ...this._pictures.slice(0, index),
      ...this._pictures.slice(index + 1)
    ];

    this._notify(updateType);
  }
}


/***/ }),

/***/ "./src/presenter/board.js":
/*!********************************!*\
  !*** ./src/presenter/board.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Board; });
/* harmony import */ var _view_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/filter.js */ "./src/view/filter.js");
/* harmony import */ var _view_img_upload_message_loading_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/img-upload-message-loading.js */ "./src/view/img-upload-message-loading.js");
/* harmony import */ var _view_img_upload_message_processing_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/img-upload-message-processing.js */ "./src/view/img-upload-message-processing.js");
/* harmony import */ var _view_pictures_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/pictures-container */ "./src/view/pictures-container.js");
/* harmony import */ var _view_uploadNewImgForm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/uploadNewImgForm.js */ "./src/view/uploadNewImgForm.js");
/* harmony import */ var _picture_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./picture.js */ "./src/presenter/picture.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../const.js */ "./src/const.js");









class Board {
  constructor(container, picturesModel) {
    this._picturesModel = picturesModel;
    this._boardContainer = container;
    this._isLoading = true;

    this._filterComponent = null;
    this._messageProcessingComponent = new _view_img_upload_message_processing_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this._picturesContainerComponent = new _view_pictures_container__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this._uploadNewImgFormComponent = new _view_uploadNewImgForm_js__WEBPACK_IMPORTED_MODULE_4__["default"]();

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(this._boardContainer, this._picturesContainerComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(this._picturesContainerComponent, this._uploadNewImgFormComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);

    this._picturesModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  _getPictures() {
    return this._picturesModel.getPictures();
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      // case UpdateType.PATCH:
      //   this._picturePresenter[data.id].init(data);
      //   break;
      // case UpdateType.MINOR:
      //   this._clearBoard();
      //   this._renderBoard();
      //   break;
      // case UpdateType.MAJOR:
      //   this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
      //   this._renderBoard();
      //   break;
      case _const_js__WEBPACK_IMPORTED_MODULE_7__["UpdateType"].INIT:
        this._isLoading = false;
        Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["remove"])(this._messageProcessingComponent);
        this._renderBoard();
        break;
    }
  }

  _renderFilters() {
    if (this._filterComponent !== null) {
      this._filterComponent = null;
    }

    this._filterComponent = new _view_filter_js__WEBPACK_IMPORTED_MODULE_0__["default"]() // needed add (this._currentSortType);
    // this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(this._boardContainer, this._filterComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].AFTERBEGIN);
  }

  _renderMessageProcessing() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(this._boardContainer, this._messageProcessingComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
  }

  _renderPicture(picture) {
    const picturePresenter = new _picture_js__WEBPACK_IMPORTED_MODULE_5__["default"](this._picturesContainerComponent); // added this._handleViewAction, this._handleModeChange
    picturePresenter.init(picture);
    // this._picturePresenter[picture.id] = picturePresenter;
  }

  _renderPictures(pictures) {
    pictures.forEach((picture) => this._renderPicture(picture));
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderMessageProcessing();
      return;
    }

    this._renderFilters();

    const pictures = this._getPictures();

    this._renderPictures(pictures.slice());
  }
}


/***/ }),

/***/ "./src/presenter/picture.js":
/*!**********************************!*\
  !*** ./src/presenter/picture.js ***!
  \**********************************/
/*! exports provided: State, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Picture; });
/* harmony import */ var _view_picture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/picture.js */ "./src/view/picture.js");
/* harmony import */ var _view_big_picture_overlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/big-picture-overlay.js */ "./src/view/big-picture-overlay.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const.js */ "./src/const.js");





const Mode = {
  DEFAULT: `DEFAULT`,
  MODAL_OPEN: `MODAL_OPEN`
};

const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

class Picture {
  constructor(pictureListContainer) { // added changeData and changeMode
    this._pictureListContainer = pictureListContainer;
    // this._changeData = changeData;
    // this._changeMode = changeMode;

    this._pictureComponent = null;
    this._bigPictureOverlayComponent = null;
    this._mode = Mode.DEFAULT;
  }

  init(picture) {
    this._picture = picture;

    this._pictureComponent = new _view_picture_js__WEBPACK_IMPORTED_MODULE_0__["default"](picture);
    this._bigPictureOverlayComponent = new _view_big_picture_overlay_js__WEBPACK_IMPORTED_MODULE_1__["default"](picture);

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["render"])(this._pictureListContainer, this._pictureComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_2__["RenderPosition"].BEFOREEND);
  }
}


/***/ }),

/***/ "./src/utils/observer.js":
/*!*******************************!*\
  !*** ./src/utils/observer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observer; });
class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter((existedObserver) => existedObserver !== observer);
  }

  _notify(event, payload) {
    this._observers.forEach((observer) => observer(event, payload));
  }
}


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: RenderPosition, render, createElement, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony import */ var _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/abstract.js */ "./src/view/abstract.js");


const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, child, place) => {
  if (container instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    container = container.getElement();
  }

  if (child instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// export const replace = (newChild, oldChild) => {
//   if (oldChild instanceof Abstract) {
//     oldChild = oldChild.getElement();
//   }
//
//   if (newChild instanceof Abstract) {
//     newChild = newChild.getElement();
//   }
//
//   const parent = oldChild.parentElement;
//
//   if (parent === null || oldChild === null || newChild === null) {
//     throw new Error(`Can't replace unexisting elements`);
//   }
//
//   parent.replaceChild(newChild, oldChild);
// };

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};


/***/ }),

/***/ "./src/view/abstract.js":
/*!******************************!*\
  !*** ./src/view/abstract.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Abstract; });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");


const SHAKE_ANIMATION_TIMEOUT = 600;

class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}


/***/ }),

/***/ "./src/view/big-picture-overlay.js":
/*!*****************************************!*\
  !*** ./src/view/big-picture-overlay.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BigPictureOverlay; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createBigPictureOverlayTemplate = () => {
  return (
    `<section class="big-picture overlay">
      <h2 class="big-picture__title visually-hidden">Просмотр фотографии</h2>
      <div class="big-picture__preview">

        <div class="big-picture__img">
          <img class="big-picture__img--img" src="#" alt="Выбранная фотография" width="600" height="600">
        </div>

        <div class="big-picture__social social">
          <div class="social__header">
            <img class="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии" width="35" height="35">
            <p class="social__caption"></p>
            <p class="social__likes">Нравится <span class="likes-count"></span></p>
          </div>
          <div class="social__comment-count"><span class="current-comment-count">5</span> из <span class="comments-count">125</span> комментариев</div>
          <ul class="social__comments">
          </ul>
          <button class="social__loadmore" type="button">Загрузить еще</button>
          <div class="social__footer">
            <img class="social__picture" src="img/avatar-6.svg" alt="Аватар комментатора фотографии" width="35" height="35">
            <input type="text" class="social__footer-text" placeholder="Ваш комментарий...">
            <button type="button" class="social__footer-btn" name="button">Отправить</button>
          </div>
        </div>
        <button type="reset" class="big-picture__cancel cancel" id="picture-cancel">Закрыть</button>
      </div>
    </section>`
  );
};

class BigPictureOverlay extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createBigPictureOverlayTemplate();
  }
}


/***/ }),

/***/ "./src/view/filter.js":
/*!****************************!*\
  !*** ./src/view/filter.js ***!
  \****************************/
/*! exports provided: createFilterTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilterTemplate", function() { return createFilterTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createFilterTemplate = () => {
  return (
    `<section class="img-filters container">
      <h2 class="img-filters__title visually-hidden">Фильтр фотографий</h2>

      <form class="img-filters__form" action="index.html" method="get" autocomplete="off">
        <button type="button" class="img-filters__button img-filters__button--active" id="filter-popular">Популярные</button>
        <button type="button" class="img-filters__button" id="filter-new">Новые</button>
        <button type="button" class="img-filters__button" id="filter-discussed">Обсуждаемые</button>
      </form>
    </section>`
  );
};

class Filter extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filters = null, currentFilterType = null) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}


/***/ }),

/***/ "./src/view/img-upload-message-dragndrop.js":
/*!**************************************************!*\
  !*** ./src/view/img-upload-message-dragndrop.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImgUploadMessageDragndrop; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createMessageDragndropTemplate = () => {
  return `<div class="img-upload__message img-upload__message--dragndrop">Сюда!</div>`;
};

class ImgUploadMessageDragndrop extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createMessageDragndropTemplate();
  }
}


/***/ }),

/***/ "./src/view/img-upload-message-error.js":
/*!**********************************************!*\
  !*** ./src/view/img-upload-message-error.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImgUploadMessageError; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createMessageErrorTemplate = () => {
  return (
    ` <div class="img-upload__message img-upload__message--error error">Ошибка загрузки файла
      <div class="error__links">
        <a class="error__link" href="#">Попробовать снова</a>
        <a class="error__link" href="#">Загрузить другой файл</a>
      </div>
    </div>`
  );
};

class ImgUploadMessageError extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createMessageErrorTemplate();
  }
}


/***/ }),

/***/ "./src/view/img-upload-message-loading.js":
/*!************************************************!*\
  !*** ./src/view/img-upload-message-loading.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImgUploadMessageLoading; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createMessageLoadingTemplate = () => {
  return `<div class="img-upload__message img-upload__message--loading">Загружаем...</div>`;
};

class ImgUploadMessageLoading extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createMessageLoadingTemplate();
  }
}


/***/ }),

/***/ "./src/view/img-upload-message-processing.js":
/*!***************************************************!*\
  !*** ./src/view/img-upload-message-processing.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImgUploadMessageProcessing; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createMessageProcessingTemplate = () => {
  return `<div class="img-upload__message img-upload__message--processing">Кексограмим...</div>`;
};

class ImgUploadMessageProcessing extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createMessageProcessingTemplate();
  }
}


/***/ }),

/***/ "./src/view/img-upload-overlay.js":
/*!****************************************!*\
  !*** ./src/view/img-upload-overlay.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImgUploadOverlay; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createImgUploadOverlayTemplate = () => {
  return (
    `<div class="img-upload__overlay">
        <div class="img-upload__wrapper">
          <div class="img-upload__preview-container">
  
            <fieldset class="img-upload__resize resize">
              <button type="button" class="resize__control resize__control--minus">Уменьшить</button>
              <input type="text" class="resize__control resize__control--value" value="50%" title="Image Scale" name="scale" readonly>
              <button type="button" class="resize__control resize__control--plus">Увеличить</button>
            </fieldset>
  
            <div class="img-upload__preview">
              <img src="img/upload-default-image.jpg" alt="Предварительный просмотр фотографии">
            </div>
  
            <fieldset class="img-upload__scale scale">
              <input type="number" class="scale__value" name="effect-level" min="0" max="100" value="100">
              <div class="scale__line">
                <div class="scale__pin" tabindex="0">Кнопка изменения глубины эффекта фотографии</div>
                <div class="scale__level">Глубина эффекта фотографии</div>
              </div>
            </fieldset>
  
            <button type="reset" class="img-upload__cancel cancel" id="upload-cancel">Закрыть</button>
          </div>
  
          <fieldset class="img-upload__effects effects">
            <ul class="effects__list">
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-none" value="none" checked>
                <label for="effect-none" class="effects__label">
                  <span class="effects__preview effects__preview--none">Превью фото без эффекта</span>
                  Оригинал
                </label>
              </li>
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-chrome" value="chrome">
                <label for="effect-chrome" class="effects__label">
                  <span class="effects__preview effects__preview--chrome">Превью эффекта Хром</span>
                  Хром
                </label>
              </li>
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-sepia" value="sepia">
                <label for="effect-sepia" class="effects__label">
                  <span class="effects__preview effects__preview--sepia">Превью эффекта Сепия</span>
                  Сепия
                </label>
              </li>
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-marvin" value="marvin">
                <label for="effect-marvin" class="effects__label">
                  <span class="effects__preview effects__preview--marvin">Превью эффекта Марвин</span>
                  Марвин
                </label>
              </li>
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-phobos" value="phobos">
                <label for="effect-phobos" class="effects__label">
                  <span class="effects__preview effects__preview--phobos">Превью эффекта Фобос</span>
                  Фобос
                </label>
              </li>
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-heat" value="heat">
                <label for="effect-heat" class="effects__label">
                  <span class="effects__preview effects__preview--heat">Превью эффекта Зной</span>
                  Зной
                </label>
              </li>
            </ul>
          </fieldset>
  
          <fieldset class="img-upload__text text">
            <input class="text__hashtags" type="text" name="hashtags" placeholder="#хэш-тег">
            <textarea class="text__description" name="description" placeholder="Ваш комментарий..." maxlength="140"></textarea>
          </fieldset>
  
          <button type="submit" class="img-upload__submit" id="upload-submit">Опубликовать</button>
        </div>
      </div>`
  );
};

class ImgUploadOverlay extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createImgUploadOverlayTemplate();
  }
}


/***/ }),

/***/ "./src/view/picture.js":
/*!*****************************!*\
  !*** ./src/view/picture.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Picture; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createPictureTemplate = (picture) => {
  const {comments, likes, url} = picture;

  return (
    `<a href="#" class="picture__link">
      <img class="picture__img" src="${url}" width="182" height="182" alt="Случайная фотография">
      <p class="picture__stats">
        <span class="picture__stat picture__stat--comments">${comments.length}</span>
        <span class="picture__stat picture__stat--likes">${likes}</span>
      </p>
    </a>`
  );
};

class Picture extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(picture) {
    super();

    this._picture = picture;
  }

  getTemplate() {
    return createPictureTemplate(this._picture);
  }
}


/***/ }),

/***/ "./src/view/pictures-container.js":
/*!****************************************!*\
  !*** ./src/view/pictures-container.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PicturesContainer; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createPicturesContainerTemplate = () => {
  return (
    `<section class="pictures container">
      <h2 class="pictures__title visually-hidden">Фотографии других пользователей</h2>
    </section>`
  );
};

class PicturesContainer extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createPicturesContainerTemplate();
  }
}


/***/ }),

/***/ "./src/view/uploadNewImgForm.js":
/*!**************************************!*\
  !*** ./src/view/uploadNewImgForm.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UploadNewImgForm; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createNewImgFormTemplate = () => {
  return (
    `<section class="img-upload">
      <div class="img-upload__wrapper">
        <h2 class="img-upload__title visually-hidden">Загрузка фотографии</h2>

        <form class="img-upload__form" id="upload-select-image" method="post" enctype="multipart/form-data" action="https://js.dump.academy/kekstagram" autocomplete="off">

          <fieldset class="img-upload__start">
            <input type="file" id="upload-file" class="img-upload__input visually-hidden" name="filename" required>
            <label for="upload-file" class="img-upload__label img-upload__control">Загрузить</label>
          </fieldset>
 
        </form>
      </div>
    </section>`
  );
};

class UploadNewImgForm extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createNewImgFormTemplate();
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map