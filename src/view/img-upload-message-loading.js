import AbstractView from "./abstract";

const createMessageLoadingTemplate = () => {
  return `<div class="img-upload__message img-upload__message--loading">Загружаем...</div>`;
};

export default class ImgUploadMessageLoading extends AbstractView {
  getTemplate() {
    return createMessageLoadingTemplate();
  }
}
