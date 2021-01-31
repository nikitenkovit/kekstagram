import {objectArray} from './package.js';
import {commentsArray} from './package.js';

/*creating elements from a template*/

const templateContent = document.getElementById('picture').content;
const templateElement = templateContent.querySelector('.picture__link');

const createNewElement = element => {

  const clonedElement = templateElement.cloneNode(true);
  const newImg = clonedElement.querySelector('.picture__img');
  const newLikesNumber = clonedElement.querySelector('.picture__stat--likes');
  const newCommentsNumber = clonedElement.querySelector('.picture__stat--comments')

  newImg.src = element.url;
  newLikesNumber.textContent = window.utils.getRandomNumber(15, 200);
  newCommentsNumber.textContent = window.utils.getRandomNumber(6, commentsArray.length - 1);
  clonedElement.setAttribute("data-description", element.description);
  clonedElement.setAttribute("data-isLike", false);

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





















