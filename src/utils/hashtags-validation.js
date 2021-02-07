const MAXIMUM_HASHTAGS = 5;
const HASHTAG_MAX_LENGTH = 20;

export const validityHashtags = (userHashtags, errorColor) => {
  let arrayHashtags = userHashtags.value.split(` `);

  if (!userHashtags.value) {
    return ``;
  }

  if (arrayHashtags.length > MAXIMUM_HASHTAGS) {
    errorColor();
    return `Хэш-тегов должно быть не больше пяти`;
  }

  for (let i = 0; i < arrayHashtags.length; i++) {
    if (!arrayHashtags[i].startsWith(`#`)) {
      errorColor();
      return `Хэш-тег должен начинаться со знака "#": ${arrayHashtags[i]}`;
    } else if (arrayHashtags[i].startsWith(`#`) && arrayHashtags[i].length < 2) {
      errorColor();
      return `Хэш-тег не должен состоять только из одного знака "#": ${arrayHashtags[i]}`;
    } else if (arrayHashtags[i].lastIndexOf(`#`) !== 0 || arrayHashtags[i].indexOf(`,`) > -1) {
      errorColor();
      return `Хэш-теги должны разделяться пробелами: ${arrayHashtags[i]}`;
    } else if (arrayHashtags[i].length > HASHTAG_MAX_LENGTH) {
      errorColor();
      return `Максимальная длина одного хэш-тега 20 символов, включая решётку: ${arrayHashtags[i]}`;
    }

    let currentHashtag = arrayHashtags[i].toLowerCase();
    for (let j = i + 1; j < arrayHashtags.length; j++) {
      let nextHashTag = arrayHashtags[j].toLowerCase();
      if (currentHashtag === nextHashTag) {
        errorColor();
        return `Один и тот же хэш-тег не может быть использован дважды (хеш-теги не чувствительны в регистру): ${arrayHashtags[i]}`;
      }
    }
  }

  return ``;
};
