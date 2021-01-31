import AbstractView from "./abstract";

const createMessageProcessingTemplate = () => {
  return `<div class="img-upload__message img-upload__message--processing">Кексограмим...</div>`;
};

export default class ImgUploadMessageProcessing extends AbstractView {
  getTemplate() {
    return createMessageProcessingTemplate();
  }
}
