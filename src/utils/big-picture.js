import {commentsArray} from "./package.js";

/*generate big picture*/

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img--img');
const likesCount = document.querySelector('.likes-count');
const allPictureLink = document.querySelectorAll('.picture__link');
const currentCommentCount = document.querySelector('.current-comment-count');
const commentsCount = document.querySelector('.comments-count');
const description = document.querySelector('.social__caption');
let commentsList = document.querySelector('.social__comments');
let socialCommentsArray = commentsList.children;
const DEFAULT_NUMBER_OF_COMMENTS = 5;

const generateBigPicture = element => {
  bigPicture.classList.remove('hidden');

  const elementImg = element.querySelector('.picture__img');
  const elementStatLikes = element.querySelector('.picture__stat--likes');
  const elementStatComments = element.querySelector('.picture__stat--comments');

  bigPictureImg.src = elementImg.src;
  likesCount.textContent = elementStatLikes.textContent;
  commentsCount.textContent = elementStatComments.textContent;
  generateComments(DEFAULT_NUMBER_OF_COMMENTS);
  description.textContent = element.dataset.description;
  window.utils.likesCountClickHandler(element, elementStatLikes, likesCount);
};

const generateComments = numberOfComments => {
  for (let i = 0; i < numberOfComments; i++) {
    if (parseInt(currentCommentCount.textContent) < parseInt(commentsCount.textContent)) {
      let newLi = document.createElement('li');
      newLi.classList.add('social__comment');
      newLi.innerHTML = '<img class="social__picture"  alt="Аватар комментатора фотографии" width="35" height="35" src="">' +
        '<p class="social__text"></p>';

      const newAvatar = newLi.querySelector('.social__picture');
      const newTextComment = newLi.querySelector('.social__text')
      newAvatar.src = 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg';
      newTextComment.textContent = commentsArray[window.utils.getRandomRoundNumber(0, commentsArray.length - 1)];

      commentsList.appendChild(newLi);
      changeNumberOfComments();
    }
  }
};

const changeNumberOfComments = () => currentCommentCount.textContent = socialCommentsArray.length;

/*load more comments*/

const loadMoreCommentsButton = document.querySelector('.social__loadmore');

loadMoreCommentsButton.addEventListener('click', () => {
  generateComments(DEFAULT_NUMBER_OF_COMMENTS);
});

/*show big picture*/

const pictureLinkClickHandler = element => {
  element.onclick = evt => {
    evt.preventDefault();
    generateBigPicture(element);
  };
};

allPictureLink.forEach(element => pictureLinkClickHandler(element));

/*hidden big picture*/

const closeButton = bigPicture.querySelector('.big-picture__cancel');

const clearAllComments = () => {
  commentsList.innerHTML = "";
  changeNumberOfComments();
};

window.utils.closeButtonClickHandler(closeButton, bigPicture, clearAllComments);
window.utils.escKeydownHandler(bigPicture, clearAllComments);