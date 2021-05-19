import React, {useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import smallPictureProp from './small-picture.prop';

const SmallPicture = ({picture, onPictureLinkClick}) => {
  const {comments, likes, url, filter} = picture;
  const imageRef = useRef();

  const handlePictureLinkClick = (evt) => {
    evt.preventDefault();
    onPictureLinkClick(picture.id);
  };

  useEffect(() => {
    imageRef.current.style.filter = filter;
  });

  return (
    <a href="#" className="picture__link" onClick={handlePictureLinkClick}>
      <img className="picture__img" src={url} width="182" height="182" alt="Случайная фотография" ref={imageRef}/>
      <p className="picture__stats">
        <span className="picture__stat picture__stat--comments">{comments.length}</span>
        <span className="picture__stat picture__stat--likes">{likes}</span>
      </p>
    </a>
  );
};

SmallPicture.propTypes = {
  picture: smallPictureProp,
  onPictureLinkClick: PropTypes.func.isRequired
};

export default React.memo(SmallPicture);
