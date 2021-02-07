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
/*! exports provided: COMMENT_COUNT_PER_STEP, FILE_TYPES, UpdateType, UserAction, ScaleParameter, LimitEffectValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENT_COUNT_PER_STEP", function() { return COMMENT_COUNT_PER_STEP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILE_TYPES", function() { return FILE_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateType", function() { return UpdateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAction", function() { return UserAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScaleParameter", function() { return ScaleParameter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LimitEffectValue", function() { return LimitEffectValue; });
const COMMENT_COUNT_PER_STEP = 5;

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
};

const UserAction = {
  UPDATE_PICTURE: `UPDATE_PICTURE`,
  ADD_PICTURE: `ADD_PICTURE`,
  DELETE_PICTURE: `DELETE_PICTURE`
};

const ScaleParameter = {
  DEFAULT: 75,
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const LimitEffectValue = {
  PHOBOS_MAX: 3,
  HEAT_MAX: 3,
  HEAT_MIN: 1,
  DEFAULT: 100
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
/* harmony import */ var _model_pictures_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/pictures.js */ "./src/model/pictures.js");
/* harmony import */ var _presenter_board_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presenter/board.js */ "./src/presenter/board.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api.js */ "./src/api.js");
// import ImgUploadOverlayView from "./view/img-upload-overlay.js";
// import ImgUploadMessageDragndropView from "./view/img-upload-message-dragndrop.js";
// import ImgUploadMessageErrorView from "./view/img-upload-message-error.js";
// import ImgUploadMessageProcessingView from "./view/img-upload-message-processing.js";






const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j1`;
const END_POINT = `https://javascript.pages.academy/kekstagram`;

const siteMainElement = document.querySelector(`main`);

const api = new _api_js__WEBPACK_IMPORTED_MODULE_3__["default"](END_POINT, AUTHORIZATION);

const picturesModel = new _model_pictures_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

const boardPresenter = new _presenter_board_js__WEBPACK_IMPORTED_MODULE_1__["default"](siteMainElement, picturesModel);

boardPresenter.init();

api.getPictures()
  .then((tasks) => {
    picturesModel.setPictures(_const_js__WEBPACK_IMPORTED_MODULE_2__["UpdateType"].INIT, tasks);
    // console.log(picturesModel.getPictures())
  })
  .catch(() => {
    picturesModel.setPictures(_const_js__WEBPACK_IMPORTED_MODULE_2__["UpdateType"].INIT, []);
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

/***/ "./src/presenter/big-picture-overlay.js":
/*!**********************************************!*\
  !*** ./src/presenter/big-picture-overlay.js ***!
  \**********************************************/
/*! exports provided: State, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BigPictureOverlay; });
/* harmony import */ var _view_big_picture_overlay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/big-picture-overlay.js */ "./src/view/big-picture-overlay.js");
/* harmony import */ var _view_social_load_more_btn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/social-load-more-btn */ "./src/view/social-load-more-btn.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");





const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

class BigPictureOverlay { // added changeData and changeMode
  constructor(pictureListContainer) {
    this._pictureListContainer = pictureListContainer;
    this._renderedCommentsCount = _const_js__WEBPACK_IMPORTED_MODULE_2__["COMMENT_COUNT_PER_STEP"];
    this._socialLoadMoreBtnComponent = new _view_social_load_more_btn__WEBPACK_IMPORTED_MODULE_1__["default"]();
    // this._changeData = changeData;
    // this._changeMode = changeMode;

    this._closePopap = this._closePopap.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleSocialLoadMoreBtnClick = this._handleSocialLoadMoreBtnClick.bind(this);
  }

  init(picture) {
    this._picture = picture;
    this._comments = this._picture.comments;

    this._bigPictureOverlayComponent = new _view_big_picture_overlay_js__WEBPACK_IMPORTED_MODULE_0__["default"](this._picture, this._comments);

    Object(_utils_render__WEBPACK_IMPORTED_MODULE_3__["render"])(this._pictureListContainer, this._bigPictureOverlayComponent, _utils_render__WEBPACK_IMPORTED_MODULE_3__["RenderPosition"].BEFOREEND);
    this._renderComments(0, _const_js__WEBPACK_IMPORTED_MODULE_2__["COMMENT_COUNT_PER_STEP"]);
    this._renderSocialLoadMoreBtn();
  }

  resetPopapHandlers() {
    this._bigPictureOverlayComponent.setCancelButtonClickHandler(this._closePopap);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closePopap() {
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_3__["remove"])(this._bigPictureOverlayComponent);

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopap();
    }
  }

  _renderComments(from, to) {
    this._bigPictureOverlayComponent.renderComments(from, to);
  }

  _renderSocialLoadMoreBtn() {
    if (this._comments.length > _const_js__WEBPACK_IMPORTED_MODULE_2__["COMMENT_COUNT_PER_STEP"]) {
      this._bigPictureOverlayComponent.renderSocialLoadMoreBtn();
      this._bigPictureOverlayComponent.setSocialLoadMoreBtnClickHandler(this._handleSocialLoadMoreBtnClick);
    }
  }

  _removeSocialLoadMoreBtn() {
    this._bigPictureOverlayComponent.removeSocialLoadMoreBtn(this._handleSocialLoadMoreBtnClick);
  }

  _handleSocialLoadMoreBtnClick() {
    this._renderComments(this._renderedCommentsCount, this._renderedCommentsCount + _const_js__WEBPACK_IMPORTED_MODULE_2__["COMMENT_COUNT_PER_STEP"]);
    this._renderedCommentsCount += _const_js__WEBPACK_IMPORTED_MODULE_2__["COMMENT_COUNT_PER_STEP"];

    if (this._renderedCommentsCount >= this._comments.length) {
      this._removeSocialLoadMoreBtn();
    }
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
/* harmony import */ var _view_pictures_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/pictures-container */ "./src/view/pictures-container.js");
/* harmony import */ var _view_upload_new_img_form_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/upload-new-img-form.js */ "./src/view/upload-new-img-form.js");
/* harmony import */ var _picture_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./picture.js */ "./src/presenter/picture.js");
/* harmony import */ var _new_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./new-image */ "./src/presenter/new-image.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../const.js */ "./src/const.js");









class Board {
  constructor(container, picturesModel) {
    this._picturesModel = picturesModel;
    this._boardContainer = container;
    this._isLoading = true;

    this._filterComponent = null;
    this._messageLoadingComponent = new _view_img_upload_message_loading_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this._picturesContainerComponent = new _view_pictures_container__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this._uploadNewImgFormComponent = new _view_upload_new_img_form_js__WEBPACK_IMPORTED_MODULE_3__["default"]();

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._showImgUploadOverlay = this._showImgUploadOverlay.bind(this);
  }

  init() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(this._boardContainer, this._picturesContainerComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(this._picturesContainerComponent, this._uploadNewImgFormComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);

    this._uploadNewImgFormComponent.setImgUploadInputHandler(this._showImgUploadOverlay);

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
        Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["remove"])(this._messageLoadingComponent);
        this._renderBoard();
        break;
    }
  }

  _renderFilters() {
    if (this._filterComponent !== null) {
      this._filterComponent = null;
    }

    this._filterComponent = new _view_filter_js__WEBPACK_IMPORTED_MODULE_0__["default"](); // needed add (this._currentSortType);
    // this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(this._boardContainer, this._filterComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].AFTERBEGIN);
  }

  _renderMessageProcessing() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(this._boardContainer, this._messageLoadingComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
  }

  _renderPicture(picture) {
    const picturePresenter = new _picture_js__WEBPACK_IMPORTED_MODULE_4__["default"](this._picturesContainerComponent); // added this._handleViewAction, this._handleModeChange
    picturePresenter.init(picture);
    // this._picturePresenter[picture.id] = picturePresenter;
  }

  _renderPictures(pictures) {
    pictures.forEach((picture) => this._renderPicture(picture));
  }

  _showImgUploadOverlay() { // переписать ивент Лоад на проммис
    const file = this._uploadNewImgFormComponent.getFile();
    const fileName = file.name.toLowerCase();

    const matches = _const_js__WEBPACK_IMPORTED_MODULE_7__["FILE_TYPES"].some((type) => fileName.endsWith(type));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        const formContainer = this._uploadNewImgFormComponent.getFormContainer();
        const newImagePresenter = new _new_image__WEBPACK_IMPORTED_MODULE_5__["default"](formContainer);

        newImagePresenter.init(reader.result);

        // this._uploadNewImgFormComponent.resetInputValue();
      });

      reader.readAsDataURL(file);
    }
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

/***/ "./src/presenter/new-image.js":
/*!************************************!*\
  !*** ./src/presenter/new-image.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewImage; });
/* harmony import */ var _view_img_upload_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/img-upload-overlay */ "./src/view/img-upload-overlay.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");



class NewImage {
  constructor(container) {
    this._newImageContainer = container;

    this._closeOverlay = this._closeOverlay.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(file) {
    this._file = file;

    this._imgUploadOverlayComponent = new _view_img_upload_overlay__WEBPACK_IMPORTED_MODULE_0__["default"](this._file);

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["render"])(this._newImageContainer, this._imgUploadOverlayComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_1__["RenderPosition"].BEFOREEND);

    this._imgUploadOverlayComponent.createMiniatures();

    this._imgUploadOverlayComponent.setInitialImageSettings();

    this._resetHandlers();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closeOverlay() {
    document.removeEventListener(`keydown`, this._escKeyDownHandler);

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["remove"])(this._imgUploadOverlayComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeOverlay();
    }
  }

  _resetHandlers() {
    this._imgUploadOverlayComponent.setCancelButtonClickHandler(this._closeOverlay);
    this._imgUploadOverlayComponent.setDraggingHandler();
    this._imgUploadOverlayComponent.setScaleLineClickHandler();
    this._imgUploadOverlayComponent.setResizeControlMinusClickHandler();
    this._imgUploadOverlayComponent.setResizeControlPlusClickHandler();
    this._imgUploadOverlayComponent.setEffectsListChangeHandler();
    this._imgUploadOverlayComponent.setUserHashtagsChangeHandler();
  }
}


/***/ }),

/***/ "./src/presenter/picture.js":
/*!**********************************!*\
  !*** ./src/presenter/picture.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Picture; });
/* harmony import */ var _view_picture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/picture.js */ "./src/view/picture.js");
/* harmony import */ var _big_picture_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./big-picture-overlay */ "./src/presenter/big-picture-overlay.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");




class Picture {
  constructor(pictureListContainer) {
    this._pictureListContainer = pictureListContainer;

    this._pictureComponent = null;

    this._showPopap = this._showPopap.bind(this);
  }

  init(picture) {
    this._picture = picture;

    this._pictureComponent = new _view_picture_js__WEBPACK_IMPORTED_MODULE_0__["default"](this._picture);

    this._pictureComponent.setClickHandler(this._showPopap);

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["render"])(this._pictureListContainer, this._pictureComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_2__["RenderPosition"].BEFOREEND);
  }

  _showPopap() {
    const bigPictureOverlayPresenter = new _big_picture_overlay__WEBPACK_IMPORTED_MODULE_1__["default"](this._pictureListContainer);
    bigPictureOverlayPresenter.init(this._picture);

    bigPictureOverlayPresenter.resetPopapHandlers();
  }
}


/***/ }),

/***/ "./src/utils/drag-n-drop.js":
/*!**********************************!*\
  !*** ./src/utils/drag-n-drop.js ***!
  \**********************************/
/*! exports provided: startDragging */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startDragging", function() { return startDragging; });
const startDragging = (evt, callback, scaleLine, scalePin, scaleLevel) => {
  evt.preventDefault();

  const scalePinPositionLimits = {
    min: 0,
    max: scaleLine.offsetWidth
  };

  let startX = evt.clientX;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shiftX = startX - moveEvt.clientX;

    startX = moveEvt.clientX;

    scalePin.style.left = (scalePin.offsetLeft - shiftX) + `px`;

    if (parseInt(scalePin.style.left, 10) < scalePinPositionLimits.min) {
      scalePin.style.left = scalePinPositionLimits.min + `px`;
    }
    if (parseInt(scalePin.style.left, 10) > scalePinPositionLimits.max) {
      scalePin.style.left = scalePinPositionLimits.max + `px`;
    }

    scaleLevel.style.width = (parseInt(scalePin.style.left, 10) / scalePinPositionLimits.max) * 100 + `%`;

    callback();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};


/***/ }),

/***/ "./src/utils/hashtags-validation.js":
/*!******************************************!*\
  !*** ./src/utils/hashtags-validation.js ***!
  \******************************************/
/*! exports provided: validityHashtags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validityHashtags", function() { return validityHashtags; });
const MAXIMUM_HASHTAGS = 5;
const HASHTAG_MAX_LENGTH = 20;

const validityHashtags = (userHashtags, errorColor) => {
  let arrayHashtags = userHashtags.value.split(` `);

  if (!userHashtags.value) {
    return ``;
  }

  if (arrayHashtags.length > MAXIMUM_HASHTAGS) {
    errorColor();
    return `Хэш-тегов должно быть не больше пяти`;
  }

  for (let i = 0; i < arrayHashtags.length; i++) {
    if (!arrayHashtags[i].startsWith(`#`)) {
      errorColor();
      return `Хэш-тег должен начинаться со знака "#": ${arrayHashtags[i]}`;
    } else if (arrayHashtags[i].startsWith(`#`) && arrayHashtags[i].length < 2) {
      errorColor();
      return `Хэш-тег не должен состоять только из одного знака "#": ${arrayHashtags[i]}`;
    } else if (arrayHashtags[i].lastIndexOf(`#`) !== 0 || arrayHashtags[i].indexOf(`,`) > -1) {
      errorColor();
      return `Хэш-теги должны разделяться пробелами: ${arrayHashtags[i]}`;
    } else if (arrayHashtags[i].length > HASHTAG_MAX_LENGTH) {
      errorColor();
      return `Максимальная длина одного хэш-тега 20 символов, включая решётку: ${arrayHashtags[i]}`;
    }

    let currentHashtag = arrayHashtags[i].toLowerCase();
    for (let j = i + 1; j < arrayHashtags.length; j++) {
      let nextHashTag = arrayHashtags[j].toLowerCase();
      if (currentHashtag === nextHashTag) {
        errorColor();
        return `Один и тот же хэш-тег не может быть использован дважды (хеш-теги не чувствительны в регистру): ${arrayHashtags[i]}`;
      }
    }
  }

  return ``;
};


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
/* harmony import */ var _comment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment */ "./src/view/comment.js");
/* harmony import */ var _social_load_more_btn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./social-load-more-btn */ "./src/view/social-load-more-btn.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");





const createBigPictureOverlayTemplate = ({comments, description, likes, url}) => {
  return (
    `<section class="big-picture overlay">
      <h2 class="big-picture__title visually-hidden">Просмотр фотографии</h2>
      <div class="big-picture__preview">

        <div class="big-picture__img">
          <img class="big-picture__img--img" src="${url}" alt="Выбранная фотография" width="600" height="600">
        </div>

        <div class="big-picture__social social">
          <div class="social__header">
            <img class="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии" width="35" height="35">
            <p class="social__caption">${description}</p>
            <p class="social__likes">Нравится <span class="likes-count">${likes}</span></p>
          </div>
          <div class="social__comment-count"><span class="current-comment-count">5</span> из <span class="comments-count">${comments.length}</span> комментариев</div>
          <ul class="social__comments">
          </ul>
          <div class="social__loadmore-container"></div>
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
  constructor(picture, comments) {
    super();

    this._socialLoadMoreBtnComponent = new _social_load_more_btn__WEBPACK_IMPORTED_MODULE_2__["default"]();

    this._picture = picture;
    this._comments = comments;

    this.callback = {};

    this._cancelButtonClickHandler = this._cancelButtonClickHandler.bind(this);
    this._socialLoadMoreBtnClickHandler = this._socialLoadMoreBtnClickHandler.bind(this);
  }

  getTemplate() {
    return createBigPictureOverlayTemplate(this._picture);
  }

  _cancelButtonClickHandler() {
    this.callback.closePopap();
  }

  setCancelButtonClickHandler(callback) {
    this.callback.closePopap = callback;

    this.getElement().querySelector(`.big-picture__cancel`)
      .addEventListener(`click`, this._cancelButtonClickHandler);
  }

  _renderComment(comment) {
    const commentComponent = new _comment__WEBPACK_IMPORTED_MODULE_1__["default"](comment);

    Object(_utils_render__WEBPACK_IMPORTED_MODULE_3__["render"])(this.getElement().querySelector(`.social__comments`),
        commentComponent,
        _utils_render__WEBPACK_IMPORTED_MODULE_3__["RenderPosition"].BEFOREEND);
  }

  renderComments(from, to) {
    this._comments
      .slice(from, to)
      .forEach((comment) => this._renderComment(comment));
  }

  renderSocialLoadMoreBtn() {
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_3__["render"])(this.getElement().querySelector(`.social__loadmore-container`),
        this._socialLoadMoreBtnComponent,
        _utils_render__WEBPACK_IMPORTED_MODULE_3__["RenderPosition"].BEFOREEND);
  }

  removeSocialLoadMoreBtn() {
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_3__["remove"])(this._socialLoadMoreBtnComponent);
  }

  _socialLoadMoreBtnClickHandler() {
    this.callback.loadMoreComments();
  }

  setSocialLoadMoreBtnClickHandler(callback) {
    this.callback.loadMoreComments = callback;

    this.getElement().querySelector(`.social__loadmore`)
      .addEventListener(`click`, this._socialLoadMoreBtnClickHandler);
  }
}


/***/ }),

/***/ "./src/view/comment.js":
/*!*****************************!*\
  !*** ./src/view/comment.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Comment; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createCommentTemplate = ({avatar, message}) => {
  return (
    `<li class="social__comment">
      <img class="social__picture"  alt="Аватар комментатора фотографии" width="35" height="35" src="${avatar}">
      <p class="social__text">${message}</p>
    </li>`
  );
};

class Comment extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
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
/* harmony import */ var _utils_drag_n_drop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/drag-n-drop */ "./src/utils/drag-n-drop.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _utils_hashtags_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/hashtags-validation */ "./src/utils/hashtags-validation.js");





const EffectsName = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const EffectsNameToRussiaName = {
  none: `Оригинал`,
  chrome: `Хром`,
  sepia: `Сепия`,
  marvin: `Марвин`,
  phobos: `Фобос`,
  heat: `Зной`
};

const SHAKE_ANIMATION_TIMEOUT = 600;

const createEffectsItemsTemplate = (name) => {
  return (
    `<li class="effects__item">
      <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-${name}"
       value="${name}" ${name === `none` ? `checked` : ``}>
      <label for="effect-${name}" class="effects__label">
      <span class="effects__preview effects__preview--${name}">
      Превью фото ${name === `none` ? `без эффекта` : EffectsNameToRussiaName[name]}
      </span>
      ${EffectsNameToRussiaName[name]}
      </label>
    </li>`
  );
};

const createImgUploadOverlayTemplate = (file) => {
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
              <img src="${file}" alt="Предварительный просмотр фотографии">
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
             ${EffectsName.map((name) => createEffectsItemsTemplate(name))}
            </ul>
          </fieldset>
  
          <fieldset class="img-upload__text text">
            <input class="text__hashtags" type="text" name="hashtags" placeholder="#хэш-тег">
            <p class="message-error"></p>
            <textarea class="text__description" name="description" placeholder="Ваш комментарий..." maxlength="140"></textarea>
          </fieldset>
  
          <button type="submit" class="img-upload__submit" id="upload-submit">Опубликовать</button>
        </div>
      </div>`
  );
};

class ImgUploadOverlay extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(file) {
    super();

    this.callback = {};

    this._file = file;

    this._scaleLine = this.getElement().querySelector(`.scale__line`);
    this._scalePin = this.getElement().querySelector(`.scale__pin`);
    this._scaleLevel = this.getElement().querySelector(`.scale__level`);
    this._scaleValue = this.getElement().querySelector(`.scale__value`);
    this._resizeInputValue = this.getElement().querySelector(`.resize__control--value`);
    this._resizeControlMinus = this.getElement().querySelector(`.resize__control--minus`);
    this._resizeControlPlus = this.getElement().querySelector(`.resize__control--plus`);
    this._uploadedImage = this.getElement().querySelector(`.img-upload__preview`);
    this._imageUploadScale = this.getElement().querySelector(`.img-upload__scale`);
    this._effectsList = this.getElement().querySelector(`.effects__list`);
    this._userHashtags = this.getElement().querySelector(`.text__hashtags`);

    this._cancelButtonClickHandler = this._cancelButtonClickHandler.bind(this);
    this._createScaleValueChangeEvent = this._createScaleValueChangeEvent.bind(this);
    this._hashtagsBorderColorError = this._hashtagsBorderColorError.bind(this);

    this._effectName = ``;
  }

  getTemplate() {
    return createImgUploadOverlayTemplate(this._file);
  }

  _cancelButtonClickHandler() {
    this.callback.closeOverlay();
  }

  setCancelButtonClickHandler(callback) {
    this.callback.closeOverlay = callback;

    this.getElement().querySelector(`.img-upload__cancel`)
      .addEventListener(`click`, this._cancelButtonClickHandler);
  }

  createMiniatures() {
    const miniatures = this.getElement().querySelectorAll(`.effects__preview`);

    miniatures.forEach((elem) => {
      elem.style.backgroundImage = `url(${this._file})`;
    });
  }

  _getDragNDropElements() {
    return [
      this._scaleLine,
      this._scalePin,
      this._scaleLevel
    ];
  }

  setDraggingHandler() {
    this._scalePin.addEventListener(`mousedown`, (evt) => {
      Object(_utils_drag_n_drop__WEBPACK_IMPORTED_MODULE_1__["startDragging"])(evt, this._createScaleValueChangeEvent, ...this._getDragNDropElements());
    });
  }

  _createScaleValueChangeEvent() {
    const event = new Event(`change`);
    this._scaleValue.dispatchEvent(event);

    this._changeInputValue();

    this._setEffectValue(this._scaleValue.value);
  }

  _changeInputValue() {
    this._scaleValue.value = parseInt(this._scaleLevel.style.width, 10);
  }

  setScaleLineClickHandler() {
    this._scaleLine.addEventListener(`click`, (evt) => {
      this._changeValueScaleLineOnClick(evt, ...this._getDragNDropElements());
    });
  }

  _changeValueScaleLineOnClick(evt, scaleLine, scalePin, scaleLevel) {
    if (evt.target !== this._scalePin) {
      evt.preventDefault();

      let coordX = evt.offsetX;
      let scaleLineWidth = scaleLine.offsetWidth;
      let positionValueClick = ``;
      if (coordX >= 0 && coordX <= scaleLineWidth) {
        positionValueClick = (coordX / scaleLineWidth) * 100 + `%`;
      }
      scalePin.style.left = positionValueClick;
      scaleLevel.style.width = positionValueClick;

      this._createScaleValueChangeEvent();
    }
  }

  _resizeImage(sign) {
    let controlValue = this._resizeInputValue.value;

    controlValue = parseInt(controlValue, 10) - _const__WEBPACK_IMPORTED_MODULE_2__["ScaleParameter"].STEP * sign;

    if (controlValue > _const__WEBPACK_IMPORTED_MODULE_2__["ScaleParameter"].MAX) {
      controlValue = _const__WEBPACK_IMPORTED_MODULE_2__["ScaleParameter"].MAX;
    } else if (controlValue < _const__WEBPACK_IMPORTED_MODULE_2__["ScaleParameter"].MIN) {
      controlValue = _const__WEBPACK_IMPORTED_MODULE_2__["ScaleParameter"].MIN;
    }

    this._uploadedImage.style.transform = `scale(${controlValue / 100})`;
    this._resizeInputValue.value = controlValue + `%`;
  }

  setResizeControlMinusClickHandler() {
    this._resizeControlMinus.addEventListener(`click`, () => {
      this._resizeImage(1);
    });
  }

  setResizeControlPlusClickHandler() {
    this._resizeControlPlus.addEventListener(`click`, () => {
      this._resizeImage(-1);
    });
  }

  setInitialImageSettings() {
    this._uploadedImage.style.transform = `scale(${_const__WEBPACK_IMPORTED_MODULE_2__["ScaleParameter"].DEFAULT / 100})`;
    this._resizeInputValue.value = _const__WEBPACK_IMPORTED_MODULE_2__["ScaleParameter"].DEFAULT + `%`;
    this._imageUploadScale.classList.add(`hidden`);

    this._sliderSetStartPosition();
  }

  _setEffectName(evt) {
    this._effectName = evt.target.value;
  }

  _visibilitySwitchScaleInput() {
    this._uploadedImage.style.filter = ``;

    // eslint-disable-next-line no-unused-expressions
    this._effectName === `none`
      ? this._imageUploadScale.classList.add(`hidden`)
      : this._imageUploadScale.classList.remove(`hidden`);
  }

  setEffectsListChangeHandler() {
    this._effectsList.addEventListener(`change`, (evt) => {
      this._setEffectName(evt);
      this._visibilitySwitchScaleInput();
      this._sliderSetStartPosition();
      this._setEffectValue(_const__WEBPACK_IMPORTED_MODULE_2__["LimitEffectValue"].DEFAULT);
    });
  }

  _setEffectValue(value) {
    const effectNameToEffectValue = {
      'chrome': `grayscale(${value / 100})`,
      'sepia': `sepia(${value / 100})`,
      'marvin': `invert(${value + `%`})`,
      'phobos': `blur(${((value / 100) * _const__WEBPACK_IMPORTED_MODULE_2__["LimitEffectValue"].PHOBOS_MAX).toFixed(2) + `px`})`,
      'heat': `brightness(${((value / 100 * (_const__WEBPACK_IMPORTED_MODULE_2__["LimitEffectValue"].HEAT_MAX - _const__WEBPACK_IMPORTED_MODULE_2__["LimitEffectValue"].HEAT_MIN)) + _const__WEBPACK_IMPORTED_MODULE_2__["LimitEffectValue"].HEAT_MIN).toFixed(2)})`
    };
    this._uploadedImage.style.filter = effectNameToEffectValue[this._effectName];
  }

  _sliderSetStartPosition() {
    this._scalePin.style.left = `100%`;
    this._scaleLevel.style.width = `100%`;
  }

  _hashtagsBorderColorError() {
    this._userHashtags.style.borderColor = `red`;
  }

  _hashtagsBorderColorDefault() {
    this._userHashtags.style.borderColor = `rgb(118, 118, 118)`;
  }

  _showErrorMessage(message) {
    const messageError = this.getElement().querySelector(`.message-error`);
    messageError.style.display = `flex`;
    messageError.textContent = message;

    setTimeout(() => {
      messageError.style.display = `none`;
    }, 6000);
  }

  _setShakeAnimation() {
    this._userHashtags.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._userHashtags.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  setUserHashtagsChangeHandler() {
    this._userHashtags.addEventListener(`change`, () => {
      this._hashtagsBorderColorDefault();
      this._userHashtags.setCustomValidity(Object(_utils_hashtags_validation__WEBPACK_IMPORTED_MODULE_3__["validityHashtags"])(this._userHashtags, this._hashtagsBorderColorError));
      if (this._userHashtags.validity.customError) {
        this._showErrorMessage(this._userHashtags.validationMessage);
        this._setShakeAnimation();
      }
    });
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


const createPictureTemplate = ({comments, likes, url}) => {
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
    this._callback = {};

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createPictureTemplate(this._picture);
  }

  _clickHandler() {
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.picture__img`)
      .addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.picture__stats`)
      .addEventListener(`click`, this._clickHandler);
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

/***/ "./src/view/social-load-more-btn.js":
/*!******************************************!*\
  !*** ./src/view/social-load-more-btn.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SocialLoadMoreBtn; });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createLoadMoreBtnTemplate = () => {
  return `<button class="social__loadmore" type="button">Загрузить еще</button>`;
};

class SocialLoadMoreBtn extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createLoadMoreBtnTemplate();
  }
}


/***/ }),

/***/ "./src/view/upload-new-img-form.js":
/*!*****************************************!*\
  !*** ./src/view/upload-new-img-form.js ***!
  \*****************************************/
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
  constructor() {
    super();

    this._callback = {};

    this._imgUploadInputHandler = this._imgUploadInputHandler.bind(this);
  }

  getTemplate() {
    return createNewImgFormTemplate();
  }

  _imgUploadInputHandler() {
    this._callback.fileAploaded();
  }

  setImgUploadInputHandler(callback) {
    this._callback.fileAploaded = callback;

    this.getElement().querySelector(`.img-upload__input`)
      .addEventListener(`change`, this._imgUploadInputHandler);
  }

  getFile() {
    return this.getElement().querySelector(`.img-upload__input`).files[0];
  }

  getFormContainer() {
    return this.getElement().querySelector(`.img-upload__form`);
  }

  resetInputValue() {
    this.getElement().querySelector(`.img-upload__input`).value = ``;
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map