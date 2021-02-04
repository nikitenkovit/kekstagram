import AbstractView from "./abstract";

const createCommentTemplate = ({avatar, message}) => {
  return (
    `<li class="social__comment">
      <img class="social__picture"  alt="Аватар комментатора фотографии" width="35" height="35" src="${avatar}">
      <p class="social__text">${message}</p>
    </li>`
  );
};

export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
