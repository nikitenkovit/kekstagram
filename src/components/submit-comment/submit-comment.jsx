import React, {useContext, useRef} from 'react';
import PropTypes from "prop-types";
import {ContextApp} from "../../store/reducer";
import {USER_AVATAR} from "../../const";
import ActionCreator from '../../store/action-creator';

const SubmitComment = ({pictureId, onCommentSubmit}) => {
  const {dispatch} = useContext(ContextApp);
  const inputRef = useRef();

  const handleFieldChange = (evt) => {
    const {value} = evt.target;
    inputRef.current.value = value;
  };

  const createNewComment = (message) => {
    return {
      name: `Ваш комментарий`,
      avatar: USER_AVATAR,
      message
    };
  };

  const handleButtonClick = () => {
    onCommentSubmit((state) => {
      return [
        createNewComment(inputRef.current.value),
        ...state
      ];
    });

    dispatch(ActionCreator.addNewComment(pictureId, createNewComment(inputRef.current.value)));
    inputRef.current.value = ``;
  };

  return (
    <div className="social__footer">
      <img className="social__picture" src={USER_AVATAR}
        alt="Аватар комментатора фотографии" width="35" height="35"/>
      <input type="text" className="social__footer-text"
        placeholder="Ваш комментарий..." onChange={handleFieldChange} ref={inputRef}/>
      <button type="button" className="social__footer-btn" name="button" onClick={handleButtonClick}>
        Отправить
      </button>
    </div>
  );
};

SubmitComment.propTypes = {
  pictureId: PropTypes.string.isRequired,
  onCommentSubmit: PropTypes.func.isRequired
};

export default SubmitComment;
