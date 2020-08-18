"use strict";
(function () {

  const inputFile = document.getElementById('upload-file');
  const imgOverlay = document.querySelector('.img-upload__overlay');
  const preview = document.querySelector('.img-upload__preview img');
  const miniatures = document.querySelectorAll('.effects__preview');
  const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

  /*upload image*/

  const imageSelection = () => {
    const file = inputFile.files[0];
    const fileName = file.name.toLowerCase();

    const matches = fileTypes.some(function (name) {
      return fileName.endsWith(name);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
        miniatures.forEach(elem =>{
          elem.style.backgroundImage = 'url(' + reader.result + ')';
        });
      });

      reader.readAsDataURL(file);
    }
  }

  /*show photo editing form*/

  const showOverlay = () => imgOverlay.classList.remove('hidden');

  /*change handler */

  inputFile.addEventListener('change', () => {
    imageSelection();
    showOverlay();
  });
})()