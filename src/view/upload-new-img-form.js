import AbstractView from "./abstract";

const createNewImgFormTemplate = () => {
  return (
    `<section class="img-upload">
      <div class="img-upload__wrapper">
        <h2 class="img-upload__title visually-hidden">Загрузка фотографии</h2>

        <form class="img-upload__form" id="upload-select-image" method="post" enctype="multipart/form-data" action="https://js.dump.academy/kekstagram" autocomplete="off">

          <fieldset class="img-upload__start">
            <input type="file" id="upload-file" class="img-upload__input visually-hidden" name="filename" required>
            <label for="upload-file" class="img-upload__label img-upload__control">Загрузить</label>
          </fieldset>
 
        </form>
      </div>
    </section>`
  );
};

export default class UploadNewImgForm extends AbstractView {
  constructor() {
    super();

    this._callback = {};

    this._imgUploadInputHandler = this._imgUploadInputHandler.bind(this);
  }

  getTemplate() {
    return createNewImgFormTemplate();
  }

  _imgUploadInputHandler() {
    this._callback.fileAploaded();
  }

  setImgUploadInputHandler(callback) {
    this._callback.fileAploaded = callback;

    this.getElement().querySelector(`.img-upload__input`)
      .addEventListener(`change`, this._imgUploadInputHandler);
  }

  getFile() {
    return this.getElement().querySelector(`.img-upload__input`).files[0];
  }

  getFormContainer() {
    return this.getElement().querySelector(`.img-upload__form`);
  }

  resetInputValue() {
    this.getElement().querySelector(`.img-upload__input`).value = ``;
  }
}
