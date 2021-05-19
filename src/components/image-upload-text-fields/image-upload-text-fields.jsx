import React, {useRef} from 'react';
import {ERROR_MESSAGE_TIMEOUT, SHAKE_ANIMATION_TIMEOUT} from "../../const";
import {validityHashtags} from "../../utils/hashtags-validation";

const ImageUploadTextFields = () => {
  const messageError = useRef();
  const userHashtagsRef = useRef();

  const setHashtagsBorderColorError = () => {
    userHashtagsRef.current.style.borderColor = `red`;
  };

  const setHashtagsBorderColorDefault = () => {
    userHashtagsRef.current.style.borderColor = `rgb(118, 118, 118)`;
  };

  const showErrorMessage = (message) => {
    messageError.current.style.display = `flex`;
    messageError.current.textContent = message;
    setTimeout(() => {
      messageError.current.style.display = `none`;
    }, ERROR_MESSAGE_TIMEOUT);
  };

  const setShakeAnimation = () => {
    userHashtagsRef.current.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      userHashtagsRef.current.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  };

  const checkUserHashtagsValidity = () => {
    setHashtagsBorderColorDefault();
    userHashtagsRef.current.setCustomValidity(validityHashtags(userHashtagsRef.current, setHashtagsBorderColorError));
    if (userHashtagsRef.current.validity.customError) {
      showErrorMessage(userHashtagsRef.current.validationMessage);
      setShakeAnimation();
    }
  };

  return (
    <fieldset className="img-upload__text text">
      <input className="text__hashtags" type="text" name="hashtags" placeholder="#хэш-тег"
        onBlur={checkUserHashtagsValidity} ref={userHashtagsRef}/>
      <p className="message-error" ref={messageError}/>
      <textarea className="text__description" name="description" placeholder="Ваш комментарий..."
        maxLength="140"/>
    </fieldset>
  );
};

export default React.memo(ImageUploadTextFields);
