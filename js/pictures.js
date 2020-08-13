/*creating elements from a template*/

import {objectArray} from './package.js';
import {commentsArray} from './package.js';

const getRandomNumber = (min, max) => (Math.ceil(Math.random() * (max - min) + min));
const getRandomRoundNumber = (min, max) => (Math.round(Math.random() * (max - min) + min));

const templateContent = document.getElementById('picture').content;
const templateElement = templateContent.querySelector('.picture__link');

const createNewElement = element => {

  const clonedElement = templateElement.cloneNode(true);
  const newImg = clonedElement.querySelector('.picture__img');
  const newLikesNumber = clonedElement.querySelector('.picture__stat--likes');
  const newCommentsNumber = clonedElement.querySelector('.picture__stat--comments')

  newImg.src = element.url;
  newLikesNumber.textContent = getRandomNumber(15, 200);
  newCommentsNumber.textContent = getRandomNumber(0, 2);
  clonedElement.setAttribute("data-description", element.description);

  return clonedElement;
};

/*add elements on page*/

const picturesContainer = document.querySelector('.pictures');

const addElementsOnPage = () => {
  let fragment = document.createDocumentFragment();

  objectArray.forEach(element => {
    fragment.appendChild(createNewElement(element));
  });
  picturesContainer.appendChild(fragment);
};

addElementsOnPage();

/*show big picture*/

const bigPicture = document.querySelector('.big-picture');
const allPictureLink = document.querySelectorAll('.picture__link');

const pictureLinkClickHandler = element => {
  element.onclick = evt => {
    evt.preventDefault();
    createBigPicture(element);
  };
};

allPictureLink.forEach(element => pictureLinkClickHandler(element));

const createBigPicture = element => {
  bigPicture.classList.remove('hidden');

  const elementImg = element.querySelector('.picture__img');
  const bigPictureImg = document.querySelector('.big-picture__img--img');
  const elementStatLikes = element.querySelector('.picture__stat--likes')
  const likesCount = document.querySelector('.likes-count');
  const elementStatComments = element.querySelector('.picture__stat--comments');
  const commentsCount = document.querySelector('.comments-count');
  const description = document.querySelector('.social__caption');

  bigPictureImg.src = elementImg.src;
  likesCount.textContent = elementStatLikes.textContent;
  commentsCount.textContent = elementStatComments.textContent;
  createComments(parseInt(elementStatComments.textContent, 10));
  description.textContent = element.dataset.description;
};

const createComments = numberOfComments => {
  let commentsList = document.querySelector('.social__comments');

  commentsList.innerHTML = "";

  for (let i = 0; i < numberOfComments; i++) {
    let li = document.createElement('li');
    li.classList.add('social__comment');
    li.innerHTML = '<img class="social__picture"  alt="Аватар комментатора фотографии" width="35" height="35" src="">' +
      '<p class="social__text"></p>';

    commentsList.appendChild(li);

    const allAvatars = commentsList.querySelectorAll('.social__picture');
    allAvatars[i].src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg'
    const allTextComments = commentsList.querySelectorAll('.social__text');
    allTextComments[i].textContent = commentsArray[getRandomRoundNumber(0, 6)];
  }
};

/*hidden big picture*/

const closeButton = bigPicture.querySelector('.big-picture__cancel');
closeButton.onclick = () => bigPicture.classList.add('hidden');

window.onkeydown = evt => {
  if (evt.code === "Escape") bigPicture.classList.add('hidden');
};

/*likes counter*/

const likesCount = document.querySelector('.likes-count');

likesCount.onclick = () => {
  if (likesCount.classList.contains('likes-count--active')) {
    likesCount.textContent--;
  } else {
    likesCount.textContent++;
  }
  likesCount.classList.toggle('likes-count--active');
};




















