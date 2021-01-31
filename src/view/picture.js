import AbstractView from "./abstract";

const createPictureTemplate = () => {
  return (
    `<a href="#" class="picture__link">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__stats">
        <span class="picture__stat picture__stat--comments"></span>
        <span class="picture__stat picture__stat--likes"></span>
      </p>
    </a>`
  );
};

export default class Picture extends AbstractView {
  getTemplate() {
    return createPictureTemplate();
  }
}