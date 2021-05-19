import React, {useContext, useRef, useState} from 'react';
import {FILE_TYPES, TEXT_HASHTAGS, TEXT_DESCRIPTION} from "../../const";
import {ContextApp} from "../../store/reducer";
import {getNewPicture} from "../../store/selectors";
import ActionCreator from '../../store/action-creator';
import ImageUploadOverlay from "../image-upload-overlay/image-upload-overlay";

const ImageUploadForm = () => {
  const {state, dispatch} = useContext(ContextApp);
  const [needShowOverlay, setNeedShowOverlay] = useState(false);
  const formRef = useRef();
  const uploadInput = useRef();
  const newPicture = getNewPicture(state);

  const handleCloseOverlay = () => {
    uploadInput.current.value = ``;
    formRef.current.reset();
    setNeedShowOverlay(() => false);
  };

  const handleUploadInputChange = () => {
    const file = uploadInput.current.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        dispatch(ActionCreator.addUrl(reader.result));
        setNeedShowOverlay(() => true);
      });

      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const textFieldsValue = {
      userHashtags: [...evt.currentTarget.elements].find((it) => it.classList.value === TEXT_HASHTAGS).value,
      userDescription: [...evt.currentTarget.elements].find((it) => it.classList.value === TEXT_DESCRIPTION).value
    };

    dispatch(ActionCreator.createNewPicture(newPicture, textFieldsValue));
    handleCloseOverlay();
    dispatch(ActionCreator.resetNewPictureData());
  };

  return (
    <section className="img-upload">
      <div className="img-upload__wrapper">
        <h2 className="img-upload__title visually-hidden">Загрузка фотографии</h2>
        <form className="img-upload__form" id="upload-select-image" method="post" encType="multipart/form-data"
          action="https://js.dump.academy/kekstagram" autoComplete="off" ref={formRef} onSubmit={handleFormSubmit}>
          <fieldset className="img-upload__start">
            <input type="file" id="upload-file" className="img-upload__input visually-hidden"
              name="filename" required onChange={handleUploadInputChange} ref={uploadInput}/>
            <label htmlFor="upload-file" className="img-upload__label img-upload__control">Загрузить</label>
          </fieldset>
          {needShowOverlay && <ImageUploadOverlay onOverlayClose={handleCloseOverlay}/>}
        </form>
      </div>
    </section>
  );
};

export default React.memo(ImageUploadForm);
