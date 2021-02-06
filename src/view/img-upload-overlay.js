import AbstractView from "./abstract";
import {startDragging} from "../utils/dragNDrop";

const createImgUploadOverlayTemplate = (file) => {
  return (
    `<div class="img-upload__overlay">
        <div class="img-upload__wrapper">
          <div class="img-upload__preview-container">
  
            <fieldset class="img-upload__resize resize">
              <button type="button" class="resize__control resize__control--minus">Уменьшить</button>
              <input type="text" class="resize__control resize__control--value" value="50%" title="Image Scale" name="scale" readonly>
              <button type="button" class="resize__control resize__control--plus">Увеличить</button>
            </fieldset>
  
            <div class="img-upload__preview">
              <img src="${file}" alt="Предварительный просмотр фотографии">
            </div>
  
            <fieldset class="img-upload__scale scale">
              <input type="number" class="scale__value" name="effect-level" min="0" max="100" value="100">
              <div class="scale__line">
                <div class="scale__pin" tabindex="0">Кнопка изменения глубины эффекта фотографии</div>
                <div class="scale__level">Глубина эффекта фотографии</div>
              </div>
            </fieldset>
  
            <button type="reset" class="img-upload__cancel cancel" id="upload-cancel">Закрыть</button>
          </div>
  
          <fieldset class="img-upload__effects effects">
            <ul class="effects__list">
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-none" value="none" checked>
                <label for="effect-none" class="effects__label">
                  <span class="effects__preview effects__preview--none">Превью фото без эффекта</span>
                  Оригинал
                </label>
              </li>
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-chrome" value="chrome">
                <label for="effect-chrome" class="effects__label">
                  <span class="effects__preview effects__preview--chrome">Превью эффекта Хром</span>
                  Хром
                </label>
              </li>
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-sepia" value="sepia">
                <label for="effect-sepia" class="effects__label">
                  <span class="effects__preview effects__preview--sepia">Превью эффекта Сепия</span>
                  Сепия
                </label>
              </li>
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-marvin" value="marvin">
                <label for="effect-marvin" class="effects__label">
                  <span class="effects__preview effects__preview--marvin">Превью эффекта Марвин</span>
                  Марвин
                </label>
              </li>
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-phobos" value="phobos">
                <label for="effect-phobos" class="effects__label">
                  <span class="effects__preview effects__preview--phobos">Превью эффекта Фобос</span>
                  Фобос
                </label>
              </li>
              <li class="effects__item">
                <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-heat" value="heat">
                <label for="effect-heat" class="effects__label">
                  <span class="effects__preview effects__preview--heat">Превью эффекта Зной</span>
                  Зной
                </label>
              </li>
            </ul>
          </fieldset>
  
          <fieldset class="img-upload__text text">
            <input class="text__hashtags" type="text" name="hashtags" placeholder="#хэш-тег">
            <textarea class="text__description" name="description" placeholder="Ваш комментарий..." maxlength="140"></textarea>
          </fieldset>
  
          <button type="submit" class="img-upload__submit" id="upload-submit">Опубликовать</button>
        </div>
      </div>`
  );
};

export default class ImgUploadOverlay extends AbstractView {
  constructor(file) {
    super();

    this.callback = {};

    this._file = file;

    this._cancelButtonClickHandler = this._cancelButtonClickHandler.bind(this);
    this._createScaleValueChangeEvent = this._createScaleValueChangeEvent.bind(this);
  }

  getTemplate() {
    return createImgUploadOverlayTemplate(this._file);
  }

  _cancelButtonClickHandler() {
    this.callback.closeOverlay();
  }

  setCancelButtonClickHandler(callback) {
    this.callback.closeOverlay = callback;

    this.getElement().querySelector(`.img-upload__cancel`)
      .addEventListener(`click`, this._cancelButtonClickHandler);
  }

  _getDragNDropElements() {
    return [
      this.getElement().querySelector(`.scale__line`),
      this.getElement().querySelector(`.scale__pin`),
      this.getElement().querySelector(`.scale__level`),
    ];
  }

  setDraggingHandler() {
    this.getElement().querySelector(`.scale__pin`)
      .addEventListener(`mousedown`, (evt) => {
        startDragging(evt, this._createScaleValueChangeEvent, ...this._getDragNDropElements());
      });
  }

  _createScaleValueChangeEvent() {
    const event = new Event(`change`);
    this.getElement().querySelector(`.scale__value`).dispatchEvent(event);

    this._changeInputValue();
  }

  _changeInputValue() {
    this.getElement().querySelector(`.scale__value`)
      .value = parseInt(this.getElement().querySelector(`.scale__level`).style.width, 10);
  }

  setScaleLineClickHandler() {
    this.getElement().querySelector(`.scale__line`)
      .addEventListener(`click`, (evt) => {
        this._changeValueScaleLineOnClick(evt, ...this._getDragNDropElements());
      });
  }

  _changeValueScaleLineOnClick(evt, scaleLine, scalePin, scaleLevel) {
    if (evt.target !== this.getElement().querySelector(`.scale__pin`)) {
      evt.preventDefault();

      let coordX = evt.offsetX;
      let scaleLineWidth = scaleLine.offsetWidth;
      let positionValueClick = ``;
      if (coordX >= 0 && coordX <= scaleLineWidth) {
        positionValueClick = (coordX / scaleLineWidth) * 100 + `%`;
      }
      scalePin.style.left = positionValueClick;
      scaleLevel.style.width = positionValueClick;

      this._createScaleValueChangeEvent();
    }
  }
}
