import React, {useContext, useState, useRef} from 'react';
import {Context} from "../../context";
import PropTypes from "prop-types";

const SubmitComment = ({pictureId, onCommentSubmit}) => {
  const [, setStore] = useContext(Context);

  const [inputValue, setInputValue] = useState();

  const avatar = `img/avatar-6.svg`;
  const inputRef = useRef();

  const handleFieldChange = (evt) => {
    const {value} = evt.target;

    setInputValue(() => value);
  };

  const createNewComment = (message) => {
    return {
      name: `Ваш комментарий`,
      avatar,
      message
    };
  };

  const handleButtonClick = () => {
    onCommentSubmit((state) => {
      return [
        createNewComment(inputValue),
        ...state
      ];
    });

    setStore((state) => {
      return {
        ...state,
        pictureList: [
          ...state.pictureList.map((it) => {
            if (it.id === pictureId) {
              return {
                ...it,
                comments: [createNewComment(inputValue), ...it.comments]
              };
            }
            return it;
          })
        ]
      };
    });

    inputRef.current.value = ``;
  };

  return (
    <div className="social__footer">
      <img className="social__picture" src={avatar}
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
