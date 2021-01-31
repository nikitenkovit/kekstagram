import AbstractView from "./abstract";

const createMessageErrorTemplate = () => {
  return (
    ` <div class="img-upload__message img-upload__message--error error">Ошибка загрузки файла
      <div class="error__links">
        <a class="error__link" href="#">Попробовать снова</a>
        <a class="error__link" href="#">Загрузить другой файл</a>
      </div>
    </div>`
  );
};

export default class ImgUploadMessageError extends AbstractView {
  getTemplate() {
    return createMessageErrorTemplate();
  }
}
