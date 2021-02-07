import AbstractView from "./abstract";
import CommentView from "./comment";
import SocialLoadMoreBtnView from "./social-load-more-btn";
import {render, RenderPosition, remove} from "../utils/render";

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

export default class BigPictureOverlay extends AbstractView {
  constructor(picture, comments) {
    super();

    this._socialLoadMoreBtnComponent = new SocialLoadMoreBtnView();

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
    const commentComponent = new CommentView(comment);

    render(this.getElement().querySelector(`.social__comments`),
        commentComponent,
        RenderPosition.BEFOREEND);
  }

  renderComments(from, to) {
    this._comments
      .slice(from, to)
      .forEach((comment) => this._renderComment(comment));
  }

  renderSocialLoadMoreBtn() {
    render(this.getElement().querySelector(`.social__loadmore-container`),
        this._socialLoadMoreBtnComponent,
        RenderPosition.BEFOREEND);
  }

  removeSocialLoadMoreBtn() {
    remove(this._socialLoadMoreBtnComponent);
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
