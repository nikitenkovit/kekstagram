import FilterView from "../view/filter.js";
import ImgUploadMessageLoadingView from "../view/img-upload-message-loading.js";
import PicturesContainerView from "../view/pictures-container";
import UploadNewImgFormView from "../view/upload-new-img-form.js";
import PicturePresenter from "./picture.js";
import NewImagePresenter from "./new-image";
import {RenderPosition, render, remove} from "../utils/render.js";
import {UpdateType, FILE_TYPES} from "../const.js";

export default class Board {
  constructor(container, picturesModel) {
    this._picturesModel = picturesModel;
    this._boardContainer = container;
    this._isLoading = true;

    this._filterComponent = null;
    this._messageLoadingComponent = new ImgUploadMessageLoadingView();
    this._picturesContainerComponent = new PicturesContainerView();
    this._uploadNewImgFormComponent = new UploadNewImgFormView();

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._showImgUploadOverlay = this._showImgUploadOverlay.bind(this);
  }

  init() {
    render(this._boardContainer, this._picturesContainerComponent, RenderPosition.BEFOREEND);
    render(this._picturesContainerComponent, this._uploadNewImgFormComponent, RenderPosition.BEFOREEND);

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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._messageLoadingComponent);
        this._renderBoard();
        break;
    }
  }

  _renderFilters() {
    if (this._filterComponent !== null) {
      this._filterComponent = null;
    }

    this._filterComponent = new FilterView(); // needed add (this._currentSortType);
    // this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMessageProcessing() {
    render(this._boardContainer, this._messageLoadingComponent, RenderPosition.BEFOREEND);
  }

  _renderPicture(picture) {
    const picturePresenter = new PicturePresenter(this._picturesContainerComponent); // added this._handleViewAction, this._handleModeChange
    picturePresenter.init(picture);
    // this._picturePresenter[picture.id] = picturePresenter;
  }

  _renderPictures(pictures) {
    pictures.forEach((picture) => this._renderPicture(picture));
  }

  _showImgUploadOverlay() { // переписать ивент Лоад на проммис
    const file = this._uploadNewImgFormComponent.getFile();
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        const formContainer = this._uploadNewImgFormComponent.getFormContainer();
        const newImagePresenter = new NewImagePresenter(formContainer);

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
