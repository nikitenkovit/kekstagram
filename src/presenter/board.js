import ImgUploadMessageLoadingView from "../view/img-upload-message-loading.js";
import ImgUploadMessageProcessingView from "../view/img-upload-message-processing.js";
import PicturesContainerView from "../view/pictures-container";
import UploadNewImgFormView from "../view/uploadNewImgForm.js";

import {RenderPosition, render, remove} from "../utils/render.js";
import {UpdateType} from "../const.js";

export default class Board {
  constructor(container, picturesModel) {
    this._picturesModel = picturesModel;
    this._boardContainer = container;
    this._isLoading = true;

    this._messageProcessingComponent = new ImgUploadMessageProcessingView();
    this._picturesContainerComponent = new PicturesContainerView();
    this._uploadNewImgFormComponent = new UploadNewImgFormView();

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    render(this._boardContainer, this._picturesContainerComponent, RenderPosition.BEFOREEND);
    render(this._picturesContainerComponent, this._uploadNewImgFormComponent, RenderPosition.BEFOREEND);

    this._picturesModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  _getPictures() {
    return this._picturesModel.getPictures();
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      // case UpdateType.PATCH:
      //   this._taskPresenter[data.id].init(data);
      //   break;
      // case UpdateType.MINOR:
      //   this._clearBoard();
      //   this._renderBoard();
      //   break;
      // case UpdateType.MAJOR:
      //   this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
      //   this._renderBoard();
      //   break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._messageProcessingComponent);
        this._renderBoard();
        break;
    }
  }

  _renderMessageProcessing() {
    render(this._boardContainer, this._messageProcessingComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderMessageProcessing();
      return;
    }

    console.log(this._getPictures())
  }
}
