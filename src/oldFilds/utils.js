'use strict';
(function () {
  window.utils = {

    escKeydownHandler: (element, callback) => {
      window.addEventListener('keydown', evt => {
        if (evt.code === "Escape" && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
          element.classList.add('hidden');
          if (callback) callback();
        }
      });
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
