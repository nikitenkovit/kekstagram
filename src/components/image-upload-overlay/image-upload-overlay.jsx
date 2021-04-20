import React, {useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import {effectsNames, ScaleParameter, LimitEffectValue} from "../../const";
import {startDragging} from "../../utils/drag-n-drop";
import EffectItemTemplate from "../effect-item-template/effect-item-template";
import ImageUploadTextFields from "../image-upload-text-fields/image-upload-text-fields";

const ImageUploadOverlay = ({newImageData, onOverlayClose}) => {
  const effectNameRef = useRef();
  const resizeInputRef = useRef();
  const imagePreviewRef = useRef();
  const scaleValueRef = useRef();
  const scaleLineRef = useRef();
  const scalePinRef = useRef();
  const scaleLevelRef = useRef();
  const uploadScaleRef = useRef();

  const handleEscKeyDown = (evt) => {
    if (evt.code === `Escape`) {
      evt.preventDefault();

      onOverlayClose();
    }
  };

  const sliderSetStartPosition = () => {
    scalePinRef.current.style.left = `100%`;
    scaleLevelRef.current.style.width = `100%`;
  };

  const setEffectName = (evt) => {
    effectNameRef.current = evt.target.value;
  };

  const hideUploadScale = () => {
    uploadScaleRef.current.classList.add(`hidden`);
  };

  const showUploadScale = () => {
    uploadScaleRef.current.classList.remove(`hidden`);
  };

  const setInitialImageSettings = () => {
    imagePreviewRef.current.style.transform = `scale(${ScaleParameter.DEFAULT / 100})`;
    resizeInputRef.current.value = ScaleParameter.DEFAULT + `%`;

    hideUploadScale();

    sliderSetStartPosition();
  };

  const handleResizeImage = (sign) => {
    let controlValue = parseInt(resizeInputRef.current.value, 10) - ScaleParameter.STEP * sign;

    if (controlValue > ScaleParameter.MAX) {
      controlValue = ScaleParameter.MAX;
    } else if (controlValue < ScaleParameter.MIN) {
      controlValue = ScaleParameter.MIN;
    }

    imagePreviewRef.current.style.transform = `scale(${controlValue / 100})`;
    resizeInputRef.current.value = controlValue + `%`;

    newImageData.current = {
      ...newImageData.current,
      size: `scale(${controlValue / 100})`
    };
  };

  const resetFilter = () => {
    imagePreviewRef.current.style.filter = ``;
  };

  const visibilitySwitchScaleInput = () => {
    if (effectNameRef.current === `none`) {
      hideUploadScale();

      return;
    }

    showUploadScale();
  };

  const setEffectValue = (value) => {
    const effectNameToEffectValue = {
      'chrome': `grayscale(${value / 100})`,
      'sepia': `sepia(${value / 100})`,
      'marvin': `invert(${value + `%`})`,
      'phobos': `blur(${((value / 100) * LimitEffectValue.PHOBOS_MAX).toFixed(2) + `px`})`,
      'heat': `brightness(${((value / 100 * (LimitEffectValue.HEAT_MAX - LimitEffectValue.HEAT_MIN))
        + LimitEffectValue.HEAT_MIN).toFixed(2)})`
    };

    imagePreviewRef.current.style.filter = effectNameToEffectValue[effectNameRef.current];

    newImageData.current = {
      ...newImageData.current,
      filter: effectNameToEffectValue[effectNameRef.current]
    };
  };

  const handleEffectItemChange = (evt) => {
    resetFilter();
    setEffectName(evt);
    visibilitySwitchScaleInput();
    sliderSetStartPosition();
    setEffectValue(LimitEffectValue.DEFAULT);
  };

  const changeInputValue = () => {
    scaleValueRef.current.value = parseInt(scaleLevelRef.current.style.width, 10);
  };

  const handleScaleValueChange = () => {
    changeInputValue();

    setEffectValue(parseInt(scaleValueRef.current.value, 10));
  };

  const handleScaleLineClick = (evt) => {
    if (evt.target !== scalePinRef.current) {
      evt.preventDefault();

      let coordX = evt.nativeEvent.offsetX;
      let scaleLineWidth = evt.target.offsetWidth;
      let positionValueClick = ``;

      if (coordX >= 0 && coordX <= scaleLineWidth) {
        positionValueClick = (coordX / scaleLineWidth) * 100 + `%`;
      }

      scalePinRef.current.style.left = positionValueClick;
      scaleLevelRef.current.style.width = positionValueClick;

      handleScaleValueChange();
    }
  };

  useEffect(() => {
    setInitialImageSettings();

    document.addEventListener(`keydown`, handleEscKeyDown);

    return () => {
      document.removeEventListener(`keydown`, handleEscKeyDown);
    };
  }, []);

  return (
    <section className="img-upload">
      <div className="img-upload__overlay">
        <div className="img-upload__wrapper">
          <div className="img-upload__preview-container">

            <fieldset className="img-upload__resize resize">
              <button type="button" className="resize__control resize__control--minus"
                onClick={() => handleResizeImage(1)}>
                Уменьшить
              </button>
              <input type="text" className="resize__control resize__control--value"
                defaultValue="50%" title="Image Scale" name="scale" readOnly ref={resizeInputRef}/>
              <button type="button" className="resize__control resize__control--plus"
                onClick={() => handleResizeImage(-1)}>
                Увеличить
              </button>
            </fieldset>

            <div className="img-upload__preview" ref={imagePreviewRef}>
              <img src={newImageData.current.url} alt="Предварительный просмотр фотографии"/>
            </div>

            <fieldset className="img-upload__scale scale" ref={uploadScaleRef}>
              <input type="number" className="scale__value" name="effect-level" min="0" max="100"
                defaultValue="100" ref={scaleValueRef}/>
              <div className="scale__line" onClick={handleScaleLineClick} ref={scaleLineRef}>
                <div className="scale__pin" tabIndex="0" onMouseDown={(evt) => {
                  startDragging(evt, handleScaleValueChange, scaleLineRef.current,
                      scalePinRef.current, scaleLevelRef.current);
                }} ref={scalePinRef}>
                  Кнопка изменения глубины эффекта фотографии
                </div>
                <div className="scale__level" ref={scaleLevelRef}>Глубина эффекта фотографии</div>
              </div>
            </fieldset>

            <button type="reset" className="img-upload__cancel cancel" id="upload-cancel"
              onClick={onOverlayClose}>
              Закрыть
            </button>
          </div>

          <fieldset className="img-upload__effects effects">
            <ul className="effects__list" onChange={handleEffectItemChange}>
              {effectsNames.map((name) =>
                <EffectItemTemplate key={name} name={name} pictureUrl={newImageData.current.url}/>)}
            </ul>
          </fieldset>

          <ImageUploadTextFields newImageData={newImageData}/>

          <button type="submit" className="img-upload__submit" id="upload-submit">Опубликовать</button>
        </div>
      </div>
    </section>
  );
};

ImageUploadOverlay.propTypes = {
  newImageData: PropTypes.object,
  onOverlayClose: PropTypes.func.isRequired,
};

export default React.memo(ImageUploadOverlay);
