import AbstractView from "./abstract";

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

export default class Picture extends AbstractView {
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
