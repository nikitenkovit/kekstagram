"use strict";
(function () {

  const inputFile = document.getElementById('upload-file');
  const imgOverlay = document.querySelector('.img-upload__overlay');
  const preview = document.querySelector('.img-upload__preview img');
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
  })

  /*hidden overlay and reset input value*/

  const cancelButton = document.getElementById('upload-cancel');

  const cancelOverlay = () => {
    imgOverlay.classList.add('hidden');
    inputFile.value = "";
  };

  cancelButton.addEventListener('click', cancelOverlay);

  window.addEventListener('keydown', evt => {
    if (evt.code === "Escape") cancelOverlay();
  });
})()