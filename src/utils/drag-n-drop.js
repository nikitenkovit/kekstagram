export const startDragging = (evt, callback, scaleLine, scalePin, scaleLevel) => {
  evt.preventDefault();

  const scalePinPositionLimits = {
    min: 0,
    max: scaleLine.offsetWidth
  };
  let startX = evt.clientX;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shiftX = startX - moveEvt.clientX;
    startX = moveEvt.clientX;
    scalePin.style.left = (scalePin.offsetLeft - shiftX) + `px`;

    if (parseInt(scalePin.style.left, 10) < scalePinPositionLimits.min) {
      scalePin.style.left = scalePinPositionLimits.min + `px`;
    }
    if (parseInt(scalePin.style.left, 10) > scalePinPositionLimits.max) {
      scalePin.style.left = scalePinPositionLimits.max + `px`;
    }

    scaleLevel.style.width = (parseInt(scalePin.style.left, 10) / scalePinPositionLimits.max) * 100 + `%`;
    callback();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};
