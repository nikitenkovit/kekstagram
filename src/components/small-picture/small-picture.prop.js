import PropTypes from "prop-types";

export default PropTypes.shape({
  comments: PropTypes.arrayOf(
      PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }
      )),
  description: PropTypes.string,
  likes: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  isLike: PropTypes.bool.isRequired
});
