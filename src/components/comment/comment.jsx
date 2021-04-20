import React from "react";
import PropTypes from "prop-types";

const Comment = ({comment}) => {
  const {name, avatar, message} = comment;

  return (
    <li className="social__comment">
      <img className="social__picture" alt="Аватар комментатора фотографии" width="35" height="35" src={avatar}/>
      <p className="social__text">{name + `: ` + message}</p>
    </li>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  })
};

export default Comment;
