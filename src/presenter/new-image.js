import ImgUploadOverlay from "../view/img-upload-overlay";
import {remove, render, RenderPosition} from "../utils/render.js";

export default class NewImage {
  constructor(container) {
    this._newImageContainer = container;

    this._closeOverlay = this._closeOverlay.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(file) {
    this._file = file;

    this._imgUploadOverlayComponent = new ImgUploadOverlay(this._file);

    render(this._newImageContainer, this._imgUploadOverlayComponent, RenderPosition.BEFOREEND);

    this._imgUploadOverlayComponent.createMiniatures();

    this._imgUploadOverlayComponent.setInitialImageSettings();

    this._resetHandlers();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closeOverlay() {
    document.removeEventListener(`keydown`, this._escKeyDownHandler);

    remove(this._imgUploadOverlayComponent);
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
