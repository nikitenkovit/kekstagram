'use strict';
(function () {
  const textHashtags = document.querySelector('.text__hashtags');
  const MAXIMUM_HASHTAGS = 5;
  const COLOR_ERROR = 'red';
  const COLOR_DEFAULT = 'rgb(118, 118, 118)';
  let isNumberOfHashtagsOk = true;
  let isHashtagPresent = true;

  const borderColorError = () => textHashtags.style.borderColor = COLOR_ERROR;
  const borderColorDefault = () => textHashtags.style.borderColor = COLOR_DEFAULT;

  /*check the number of hashtags*/

  const checkNumberOfHashtags = () => {
    let arrayHashtags = textHashtags.value.split(' ');
    if (arrayHashtags.length > MAXIMUM_HASHTAGS) {
      textHashtags.setCustomValidity('Хэш-тегов должно быть не больше пяти');
      borderColorError();
      isNumberOfHashtagsOk = false;
    } else {
      isNumberOfHashtagsOk = true;
    }
  }

  /*check "#" at the beginning of the hashtag*/

  const checkHashtagPresence = () => {
    let arrayHashtags = textHashtags.value.split(' ');

    arrayHashtags = arrayHashtags.every(elem => elem.startsWith('#'));

    if (!arrayHashtags) {
      textHashtags.setCustomValidity('Хэш-тег должен начинаться со знака "#"');
      borderColorError();
      isHashtagPresent = false;
    } else {
      isHashtagPresent = true;
    }
  }

  const checkAllConditions = () => {
    if (isNumberOfHashtagsOk && isHashtagPresent) {
      textHashtags.setCustomValidity('');
      borderColorDefault();
    }
  }

  textHashtags.addEventListener('change', () => {
    checkHashtagPresence();
    checkNumberOfHashtags();
    checkAllConditions();
  });


  //console.log(textHashtagsValue)


})()