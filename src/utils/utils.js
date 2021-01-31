'use strict';
(function () {
  window.utils = {
    getRandomNumber: (min, max) => (Math.ceil(Math.random() * (max - min) + min)),
    getRandomRoundNumber: (min, max) => (Math.round(Math.random() * (max - min) + min)),
    closeButtonClickHandler: (button, element, callback) => {
      button.onclick = () => {
        element.classList.add('hidden');
        if (callback) callback();
      };
    },
    escKeydownHandler: (element, callback) => {
      window.addEventListener('keydown', evt => {
        if (evt.code === "Escape" && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
          element.classList.add('hidden');
          if (callback) callback();
        }
      });
    },
    sliderSetStartPosition: () => {
      const scalePin = document.querySelector('.scale__pin');
      const scaleLevel = document.querySelector('.scale__level');
      scalePin.style.left = '100%';
      scaleLevel.style.width = '100%'
    },
    likesCountClickHandler: (element, elementStatLikes, likesCount) => {
      element.dataset.isLike ? likesCount.classList.add('likes-count--active') : likesCount.classList.remove('likes-count--active');

      likesCount.onclick = () => {
        if (likesCount.classList.contains('likes-count--active')) {
          elementStatLikes.textContent--;
          likesCount.textContent--;
          element.dataset.isLike = false;
        } else {
          elementStatLikes.textContent++;
          likesCount.textContent++;
          element.dataset.isLike = true;
        }
        likesCount.classList.toggle('likes-count--active');
      };
    }
  };
})();