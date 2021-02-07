import AbstractView from "./abstract";
import {startDragging} from "../utils/drag-n-drop";
import {ScaleParameter, LimitEffectValue} from "../const";
import {validityHashtags} from "../utils/hashtags-validation";

const EffectsName = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const EffectsNameToRussiaName = {
  none: `Оригинал`,
  chrome: `Хром`,
  sepia: `Сепия`,
  marvin: `Марвин`,
  phobos: `Фобос`,
  heat: `Зной`
};

const SHAKE_ANIMATION_TIMEOUT = 600;

const createEffectsItemsTemplate = (name) => {
  return (
    `<li class="effects__item">
      <input type="radio" class="effects__radio visually-hidden" name="effect" id="effect-${name}"
       value="${name}" ${name === `none` ? `checked` : ``}>
      <label for="effect-${name}" class="effects__label">
      <span class="effects__preview effects__preview--${name}">
      Превью фото ${name === `none` ? `без эффекта` : EffectsNameToRussiaName[name]}
      </span>
      ${EffectsNameToRussiaName[name]}
      </label>
    </li>`
  );
};

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
             ${EffectsName.map((name) => createEffectsItemsTemplate(name))}
            </ul>
          </fieldset>
  
          <fieldset class="img-upload__text text">
            <input class="text__hashtags" type="text" name="hashtags" placeholder="#хэш-тег">
            <p class="message-error"></p>
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

    this._scaleLine = this.getElement().querySelector(`.scale__line`);
    this._scalePin = this.getElement().querySelector(`.scale__pin`);
    this._scaleLevel = this.getElement().querySelector(`.scale__level`);
    this._scaleValue = this.getElement().querySelector(`.scale__value`);
    this._resizeInputValue = this.getElement().querySelector(`.resize__control--value`);
    this._resizeControlMinus = this.getElement().querySelector(`.resize__control--minus`);
    this._resizeControlPlus = this.getElement().querySelector(`.resize__control--plus`);
    this._uploadedImage = this.getElement().querySelector(`.img-upload__preview`);
    this._imageUploadScale = this.getElement().querySelector(`.img-upload__scale`);
    this._effectsList = this.getElement().querySelector(`.effects__list`);
    this._userHashtags = this.getElement().querySelector(`.text__hashtags`);

    this._cancelButtonClickHandler = this._cancelButtonClickHandler.bind(this);
    this._createScaleValueChangeEvent = this._createScaleValueChangeEvent.bind(this);
    this._hashtagsBorderColorError = this._hashtagsBorderColorError.bind(this);

    this._effectName = ``;
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

  createMiniatures() {
    const miniatures = this.getElement().querySelectorAll(`.effects__preview`);

    miniatures.forEach((elem) => {
      elem.style.backgroundImage = `url(${this._file})`;
    });
  }

  _getDragNDropElements() {
    return [
      this._scaleLine,
      this._scalePin,
      this._scaleLevel
    ];
  }

  setDraggingHandler() {
    this._scalePin.addEventListener(`mousedown`, (evt) => {
      startDragging(evt, this._createScaleValueChangeEvent, ...this._getDragNDropElements());
    });
  }

  _createScaleValueChangeEvent() {
    const event = new Event(`change`);
    this._scaleValue.dispatchEvent(event);

    this._changeInputValue();

    this._setEffectValue(this._scaleValue.value);
  }

  _changeInputValue() {
    this._scaleValue.value = parseInt(this._scaleLevel.style.width, 10);
  }

  setScaleLineClickHandler() {
    this._scaleLine.addEventListener(`click`, (evt) => {
      this._changeValueScaleLineOnClick(evt, ...this._getDragNDropElements());
    });
  }

  _changeValueScaleLineOnClick(evt, scaleLine, scalePin, scaleLevel) {
    if (evt.target !== this._scalePin) {
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

  _resizeImage(sign) {
    let controlValue = this._resizeInputValue.value;

    controlValue = parseInt(controlValue, 10) - ScaleParameter.STEP * sign;

    if (controlValue > ScaleParameter.MAX) {
      controlValue = ScaleParameter.MAX;
    } else if (controlValue < ScaleParameter.MIN) {
      controlValue = ScaleParameter.MIN;
    }

    this._uploadedImage.style.transform = `scale(${controlValue / 100})`;
    this._resizeInputValue.value = controlValue + `%`;
  }

  setResizeControlMinusClickHandler() {
    this._resizeControlMinus.addEventListener(`click`, () => {
      this._resizeImage(1);
    });
  }

  setResizeControlPlusClickHandler() {
    this._resizeControlPlus.addEventListener(`click`, () => {
      this._resizeImage(-1);
    });
  }

  setInitialImageSettings() {
    this._uploadedImage.style.transform = `scale(${ScaleParameter.DEFAULT / 100})`;
    this._resizeInputValue.value = ScaleParameter.DEFAULT + `%`;
    this._imageUploadScale.classList.add(`hidden`);

    this._sliderSetStartPosition();
  }

  _setEffectName(evt) {
    this._effectName = evt.target.value;
  }

  _visibilitySwitchScaleInput() {
    this._uploadedImage.style.filter = ``;

    // eslint-disable-next-line no-unused-expressions
    this._effectName === `none`
      ? this._imageUploadScale.classList.add(`hidden`)
      : this._imageUploadScale.classList.remove(`hidden`);
  }

  setEffectsListChangeHandler() {
    this._effectsList.addEventListener(`change`, (evt) => {
      this._setEffectName(evt);
      this._visibilitySwitchScaleInput();
      this._sliderSetStartPosition();
      this._setEffectValue(LimitEffectValue.DEFAULT);
    });
  }

  _setEffectValue(value) {
    const effectNameToEffectValue = {
      'chrome': `grayscale(${value / 100})`,
      'sepia': `sepia(${value / 100})`,
      'marvin': `invert(${value + `%`})`,
      'phobos': `blur(${((value / 100) * LimitEffectValue.PHOBOS_MAX).toFixed(2) + `px`})`,
      'heat': `brightness(${((value / 100 * (LimitEffectValue.HEAT_MAX - LimitEffectValue.HEAT_MIN)) + LimitEffectValue.HEAT_MIN).toFixed(2)})`
    };
    this._uploadedImage.style.filter = effectNameToEffectValue[this._effectName];
  }

  _sliderSetStartPosition() {
    this._scalePin.style.left = `100%`;
    this._scaleLevel.style.width = `100%`;
  }

  _hashtagsBorderColorError() {
    this._userHashtags.style.borderColor = `red`;
  }

  _hashtagsBorderColorDefault() {
    this._userHashtags.style.borderColor = `rgb(118, 118, 118)`;
  }

  _showErrorMessage(message) {
    const messageError = this.getElement().querySelector(`.message-error`);
    messageError.style.display = `flex`;
    messageError.textContent = message;

    setTimeout(() => {
      messageError.style.display = `none`;
    }, 6000);
  }

  _setShakeAnimation() {
    this._userHashtags.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._userHashtags.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  setUserHashtagsChangeHandler() {
    this._userHashtags.addEventListener(`change`, () => {
      this._hashtagsBorderColorDefault();
      this._userHashtags.setCustomValidity(validityHashtags(this._userHashtags, this._hashtagsBorderColorError));
      if (this._userHashtags.validity.customError) {
        this._showErrorMessage(this._userHashtags.validationMessage);
        this._setShakeAnimation();
      }
    });
  }
}
