import AbstractView from "./abstract";

const createMessageDragndropTemplate = () => {
  return `<div class="img-upload__message img-upload__message--dragndrop">Сюда!</div>`;
};

export default class ImgUploadMessageDragndrop extends AbstractView {
  getTemplate() {
    return createMessageDragndropTemplate();
  }
}
