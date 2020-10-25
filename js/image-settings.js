"use strict";

(function () {

  /*resize image*/

  const resizeInputValue = document.querySelector('.resize__control--value');
  const resizeControlMinus = document.querySelector('.resize__control--minus');
  const resizeControlPlus = document.querySelector('.resize__control--plus');
  const uploadedImage = document.querySelector('.img-upload__preview');
  const ScaleParameter = {
    DEFAULT: 100,
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  const resizeImage = sign => {
    let controlValue = resizeInputValue.value;

    controlValue = parseInt(controlValue, 10) - ScaleParameter.STEP * sign;

    if (controlValue > ScaleParameter.MAX) {
      controlValue = ScaleParameter.MAX;
    } else if (controlValue < ScaleParameter.MIN) {
      controlValue = ScaleParameter.MIN;
    }

    uploadedImage.style.transform = 'scale(' + controlValue / 100 + ')';
    controlValue += "%";
    resizeInputValue.value = controlValue;
  }


  resizeControlMinus.addEventListener('click', () => {
    resizeImage(1);
  });
  resizeControlPlus.addEventListener('click', () => {
    resizeImage(-1);
  });

  /*add effect on photo*/

  const scaleInput = document.querySelector('.scale__value');
  const imageUploadScale = document.querySelector('.img-upload__scale')
  const effectsList = document.querySelector('.effects__list');
  let effectName = "";
  const LimitEffectValue = {
    PHOBOS_MAX: 3,
    HEAT_MAX: 3,
    HEAT_MIN: 1,
    DEFAULT: 100
  };

  const setEffectName = evt => {
    effectName = evt.target.value;
  };

  const toggleScaleInput = () => {
    uploadedImage.style.filter = '';
    if (effectName === 'none') {
      imageUploadScale.classList.add('hidden');
    } else {
      imageUploadScale.classList.remove('hidden');
    }
  };

  effectsList.addEventListener('change', evt => {
    setEffectName(evt);
    toggleScaleInput();
    window.utils.sliderSetStartPosition();
    setEffectValue(LimitEffectValue.DEFAULT);
  });

  const setEffectValue = value => {
    const effectNameToEffectValue = {
      'chrome': 'grayscale(' + value / 100 + ')',
      'sepia': 'sepia(' + value / 100 + ')',
      'marvin': 'invert(' + value + '%' + ')',
      'phobos': 'blur(' + ((value / 100) * LimitEffectValue.PHOBOS_MAX).toFixed(2) + 'px)',
      'heat': 'brightness(' + ((value / 100 * (LimitEffectValue.HEAT_MAX - LimitEffectValue.HEAT_MIN)) + LimitEffectValue.HEAT_MIN).toFixed(2) + ')'
    };
    uploadedImage.style.filter = effectNameToEffectValue[effectName];
  }

  scaleInput.addEventListener('change', () => {
    setEffectValue(scaleInput.value);
  });

  /*hidden overlay and reset image settings*/

  const cancelButton = document.getElementById('upload-cancel');
  const inputFile = document.getElementById('upload-file');
  const imgOverlay = document.querySelector('.img-upload__overlay');
  const newUploadedImage = document.querySelector('.img-upload__preview img');
  const textHashtags = document.querySelector('.text__hashtags');
  const textDescription = document.querySelector('.text__description');

  newUploadedImage.addEventListener('load', () => {
    uploadedImage.style.transform = 'scale(' + ScaleParameter.DEFAULT / 100 + ')';
    resizeInputValue.value = ScaleParameter.DEFAULT + '%';
    window.utils.sliderSetStartPosition();
    imageUploadScale.classList.add('hidden');
  });

  const resetImageSettings = () => {
    inputFile.value = '';
    scaleInput.value = LimitEffectValue.DEFAULT;
    uploadedImage.style = '';
    textHashtags.value = '';
    textDescription.value = '';
  };

  window.utils.closeButtonClickHandler(cancelButton, imgOverlay, resetImageSettings);
  window.utils.escKeydownHandler(imgOverlay, resetImageSettings);
})();