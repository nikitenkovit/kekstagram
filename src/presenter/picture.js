import PictureView from "../view/picture.js";
import BigPictureOverlayPresenter from "./big-picture-overlay";
import {render, RenderPosition} from "../utils/render.js";

export default class Picture {
  constructor(pictureListContainer) {
    this._pictureListContainer = pictureListContainer;

    this._pictureComponent = null;

    this._showPopap = this._showPopap.bind(this);
  }

  init(picture) {
    this._picture = picture;

    this._pictureComponent = new PictureView(this._picture);

    this._pictureComponent.setClickHandler(this._showPopap);

    render(this._pictureListContainer, this._pictureComponent, RenderPosition.BEFOREEND);
  }

  _showPopap() {
    const bigPictureOverlayPresenter = new BigPictureOverlayPresenter(this._pictureListContainer);
    bigPictureOverlayPresenter.init(this._picture);

    bigPictureOverlayPresenter.resetPopapHandlers();
  }
}
