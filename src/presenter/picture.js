import PictureView from "../view/picture.js";
import BigPictureOverlayView from "../view/big-picture-overlay.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  MODAL_OPEN: `MODAL_OPEN`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class Picture {
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

    this._pictureComponent = new PictureView(picture);
    this._bigPictureOverlayComponent = new BigPictureOverlayView(picture);

    render(this._pictureListContainer, this._pictureComponent, RenderPosition.BEFOREEND);
  }
}
