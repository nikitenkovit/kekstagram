'use strict';

(function () {

  /*Drag and drop (mouse only)*/

  const scaleLine = document.querySelector('.scale__line');
  const scalePin = document.querySelector('.scale__pin');
  const scaleLevel = document.querySelector('.scale__level');

  const onMouseDown = evt => {
    evt.preventDefault();

    const scalePinPositionLimits = {
      min: 0,
      max: scaleLine.offsetWidth
    };

    let startX = evt.clientX;

    let onMouseMove = moveEvt => {
      moveEvt.preventDefault();

      let shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      scalePin.style.left = (scalePin.offsetLeft - shiftX) + 'px';

      if (parseInt(scalePin.style.left, 10) < scalePinPositionLimits.min) {
        scalePin.style.left = scalePinPositionLimits.min + 'px';
      }
      if (parseInt(scalePin.style.left, 10) > scalePinPositionLimits.max) {
        scalePin.style.left = scalePinPositionLimits.max + 'px';
      }

      scaleLevel.style.width = (parseInt(scalePin.style.left, 10) / scalePinPositionLimits.max) * 100 + "%";
      changeInputValue();
    };

    let onMouseUp = upEvt => {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  scalePin.addEventListener('mousedown', onMouseDown);

  /*scaleLine click handler for change position scalePin*/

  scaleLine.addEventListener('click', lineEvt => {
    if (lineEvt.target !== scalePin) {
      lineEvt.preventDefault();

      let coordX = lineEvt.offsetX;
      let scaleLineWidth = scaleLine.offsetWidth;
      let positionValueClick = "";
      if (coordX >= 0 && coordX <= scaleLineWidth) {
        positionValueClick = (coordX / scaleLineWidth) * 100 + '%';
      }
      scalePin.style.left = positionValueClick;
      scaleLevel.style.width = positionValueClick;
      changeInputValue();
    }
  });

  /*change input value*/

  const scaleInput = document.querySelector('.scale__value');

  const changeInputValue = () => {
    scaleInput.value = parseInt(scaleLevel.style.width, 10);
  }

})();