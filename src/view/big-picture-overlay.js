import AbstractView from "./abstract";

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

export default class BigPictureOverlay extends AbstractView {
  getTemplate() {
    return createBigPictureOverlayTemplate();
  }
}
