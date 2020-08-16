"use strict";

(function () {

  const ScaleParameter = {
    DEFAULT: 50,
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  /*resize image*/

  const resizeInputValue = document.querySelector('.resize__control--value');
  const resizeControlMinus = document.querySelector('.resize__control--minus');
  const resizeControlPlus = document.querySelector('.resize__control--plus');
  const uploadedImage = document.querySelector('.img-upload__preview');

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

})();