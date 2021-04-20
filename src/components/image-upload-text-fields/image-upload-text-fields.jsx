import React, {useRef} from 'react';
import {SHAKE_ANIMATION_TIMEOUT} from "../../const";
import {validityHashtags} from "../../utils/hashtags-validation";
import PropTypes from "prop-types";

const ImageUploadTextFields = ({newImageData}) => {
  const messageError = useRef();
  const userHashtagsRef = useRef();
  const userDescriptionRef = useRef();

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
    }, 6000);
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

  const handleHashtagsFieldChange = () => {
    newImageData.current = {
      ...newImageData.current,
      userHashtags: userHashtagsRef.current.value
    };
  };

  const handleDescriptionFieldChange = () => {
    newImageData.current = {
      ...newImageData.current,
      userDescription: userDescriptionRef.current.value
    };
  };

  return (
    <fieldset className="img-upload__text text">
      <input className="text__hashtags" type="text" name="hashtags" placeholder="#хэш-тег"
        onBlur={checkUserHashtagsValidity} onChange={handleHashtagsFieldChange} ref={userHashtagsRef}/>
      <p className="message-error" ref={messageError}/>
      <textarea className="text__description" name="description" placeholder="Ваш комментарий..."
        maxLength="140" onChange={handleDescriptionFieldChange} ref={userDescriptionRef}/>
    </fieldset>
  );
};

ImageUploadTextFields.propTypes = {
  newImageData: PropTypes.object
};

export default React.memo(ImageUploadTextFields);
