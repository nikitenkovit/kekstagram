import AbstractView from "./abstract";

const createPicturesContainerTemplate = () => {
  return (
    `<section class="pictures container">
      <h2 class="pictures__title visually-hidden">Фотографии других пользователей</h2>
    </section>`
  );
};

export default class PicturesContainer extends AbstractView {
  getTemplate() {
    return createPicturesContainerTemplate();
  }
}
