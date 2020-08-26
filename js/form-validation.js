'use strict';
(function () {
  const userHashtags = document.querySelector('.text__hashtags');
  const MAXIMUM_HASHTAGS = 5;
  const HASHTAG_MAX_LENGTH = 20;
  const BORDER_COLOR = {
    COLOR_ERROR: () => userHashtags.style.borderColor = 'red',
    COLOR_DEFAULT: () => userHashtags.style.borderColor = 'rgb(118, 118, 118)'
  };

  const validityHashtags = () => {
    let arrayHashtags = userHashtags.value.split(' ');

    if (!userHashtags.value) {
      return '';
    }

    if (arrayHashtags.length > MAXIMUM_HASHTAGS) {
      BORDER_COLOR.COLOR_ERROR();
      return 'Хэш-тегов должно быть не больше пяти';
    }

    for (let hashtag of arrayHashtags) {
      if (!hashtag.startsWith('#')) {
        BORDER_COLOR.COLOR_ERROR();
        return 'Хэш-тег должен начинаться со знака "#"'
      } else if (hashtag.startsWith('#') && hashtag.length < 2) {
        BORDER_COLOR.COLOR_ERROR();
        return 'Хэш-тег не должен состоять только из одного знака "#"'
      } else if (hashtag.lastIndexOf('#') !== 0 || hashtag.indexOf(',') > -1) {
        BORDER_COLOR.COLOR_ERROR();
        return 'Хэш-теги должны разделяться пробелами'
      } else if (hashtag.length > HASHTAG_MAX_LENGTH) {
        BORDER_COLOR.COLOR_ERROR();
        return 'Максимальная длина одного хэш-тега 20 символов, включая решётку'
      }
    }

    let lowerCaseArray = window.utils.arrayToLowerCase(arrayHashtags);
    if (!window.utils.checkDuplicatesInArray(lowerCaseArray)) {
      BORDER_COLOR.COLOR_ERROR();
      return 'Один и тот же хэш-тег не может быть использован дважды (хеш-теги не чувствительны в регистру)'
    }

    return ''
  };

  userHashtags.addEventListener('change', () => {
    BORDER_COLOR.COLOR_DEFAULT();
    userHashtags.setCustomValidity(validityHashtags());
  });
})()