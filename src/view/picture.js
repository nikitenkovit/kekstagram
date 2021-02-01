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
  }

  getTemplate() {
    return createPictureTemplate(this._picture);
  }
}
