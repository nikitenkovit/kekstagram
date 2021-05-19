import React, {useState, useEffect, useRef, useContext} from 'react';
import PropTypes from "prop-types";
import {COMMENT_COUNT_PER_STEP} from "../../const";
import {nanoid} from "nanoid";
import {ContextApp} from "../../store/reducer";
import {getPictures} from "../../store/selectors";
import ActionCreator from '../../store/action-creator';
import Comment from "../comment/comment";
import SubmitComment from "../submit-comment/submit-comment";

const BigPicture = ({pictureId, onBigPictureClose}) => {
  const {state, dispatch} = useContext(ContextApp);
  const pictureList = getPictures(state);
  const imageRef = useRef();
  const LikeNumberRef = useRef();
  const renderedCommentsCount = useRef(COMMENT_COUNT_PER_STEP);
  const {comments,
    description,
    likes,
    url,
    filter,
    size,
    isLike,
    id} = pictureList.find((it) => it.id === pictureId);
  const [currentCommentList, setCurrentCommentList] = useState(comments.slice(0, COMMENT_COUNT_PER_STEP));
  const needShowLoadMoreButton = currentCommentList.length < comments.length;
  let currentLikeNumber = likes;
  let currentIsLike = isLike;

  const handleShowLoadMoreButtonClick = () => {
    setCurrentCommentList(() => {
      renderedCommentsCount.current += COMMENT_COUNT_PER_STEP;
      return comments.slice(0, renderedCommentsCount.current);
    });
  };

  const handleEscKeyDown = (evt) => {
    if (evt.code === `Escape`) {
      evt.preventDefault();
      onBigPictureClose(() => false);
    }
  };

  const setEffectsOnPicture = () => {
    imageRef.current.style.filter = filter;
    imageRef.current.style.transform = size;
  };

  const changeLikeNumber = () => {
    currentIsLike = !isLike;
    if (LikeNumberRef.current.classList.contains(`likes-count--active`)) {
      currentLikeNumber--;
      return;
    }
    currentLikeNumber++;
  };

  const handleLikeClick = () => {
    changeLikeNumber();
    dispatch(ActionCreator.changeLikeNumber(id, currentLikeNumber, currentIsLike));
  };

  useEffect(() => {
    setEffectsOnPicture();
    document.addEventListener(`keydown`, handleEscKeyDown);

    return () => {
      document.removeEventListener(`keydown`, handleEscKeyDown);
    };
  }, []);

  return (
    <section className="big-picture overlay">
      <h2 className="big-picture__title visually-hidden">Просмотр фотографии</h2>
      <div className="big-picture__preview">

        <div className="big-picture__img">
          <img className="big-picture__img--img" src={url} alt="Выбранная фотография"
            width="600" height="600" ref={imageRef}/>
        </div>

        <div className="big-picture__social social">
          <div className="social__header">
            <img className="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии" width="35"
              height="35"/>
            <p className="social__caption">{description}</p>
            <p className="social__likes">
              Нравится
              <span className={`likes-count ${isLike ? `likes-count--active` : ``}`}
                onClick={handleLikeClick} ref={LikeNumberRef}>
                {likes}
              </span>
            </p>
          </div>
          <div className="social__comment-count">
            <span className="current-comment-count">{currentCommentList.length}</span> из <span
              className="comments-count">{comments.length}</span> комментариев
          </div>
          <ul className="social__comments">
            {currentCommentList.map((comment) => <Comment key={nanoid()} comment={comment}/>)}
          </ul>
          <div className="social__loadmore-container">
            {needShowLoadMoreButton && <button className="social__loadmore" type="button"
              onClick={handleShowLoadMoreButtonClick}>
              Загрузить еще
            </button>}
          </div>

          <SubmitComment pictureId={pictureId} onCommentSubmit={setCurrentCommentList}/>

        </div>
        <button type="reset" className="big-picture__cancel cancel" id="picture-cancel"
          onClick={() => onBigPictureClose(() => false)}>
          Закрыть
        </button>
      </div>
    </section>
  );
};

BigPicture.propTypes = {
  pictureId: PropTypes.string.isRequired,
  onBigPictureClose: PropTypes.func.isRequired
};

export default React.memo(BigPicture);
