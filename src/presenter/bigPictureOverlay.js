import BigPictureOverlayView from "../view/big-picture-overlay.js";
import SocialLoadMoreBtnView from "../view/socialLoadMoreBtn";
import {COMMENT_COUNT_PER_STEP, UserAction, UpdateType} from "../const.js";
import {render, RenderPosition, remove} from "../utils/render";

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class BigPictureOverlay { // added changeData and changeMode
  constructor(pictureListContainer) {
    this._pictureListContainer = pictureListContainer;
    this._renderedCommentsCount = COMMENT_COUNT_PER_STEP;
    this._socialLoadMoreBtnComponent = new SocialLoadMoreBtnView();
    // this._changeData = changeData;
    // this._changeMode = changeMode;

    this._closePopap = this._closePopap.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleSocialLoadMoreBtnClick = this._handleSocialLoadMoreBtnClick.bind(this);
  }

  init(picture) {
    this._picture = picture;
    this._comments = this._picture.comments;

    this._bigPictureOverlayComponent = new BigPictureOverlayView(this._picture, this._comments);

    render(this._pictureListContainer, this._bigPictureOverlayComponent, RenderPosition.BEFOREEND);
    this._renderComments(0, COMMENT_COUNT_PER_STEP);
    this._renderSocialLoadMoreBtn();
  }

  resetPopapHandlers() {
    this._bigPictureOverlayComponent.setCancelButtonClickHandler(this._closePopap);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closePopap() {
    remove(this._bigPictureOverlayComponent);

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
    if (this._comments.length > COMMENT_COUNT_PER_STEP) {
      this._bigPictureOverlayComponent.renderSocialLoadMoreBtn();
      this._bigPictureOverlayComponent.setSocialLoadMoreBtnClickHandler(this._handleSocialLoadMoreBtnClick);
    }
  }

  _removeSocialLoadMoreBtn() {
    this._bigPictureOverlayComponent.removeSocialLoadMoreBtn(this._handleSocialLoadMoreBtnClick);
  }

  _handleSocialLoadMoreBtnClick() {
    this._renderComments(this._renderedCommentsCount, this._renderedCommentsCount + COMMENT_COUNT_PER_STEP);
    this._renderedCommentsCount += COMMENT_COUNT_PER_STEP;

    if (this._renderedCommentsCount >= this._comments.length) {
      this._removeSocialLoadMoreBtn();
    }
  }
}
