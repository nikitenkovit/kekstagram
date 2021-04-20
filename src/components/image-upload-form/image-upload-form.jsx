import React, {useState, useRef, useContext, useEffect} from 'react';
import ImageUploadOverlay from "../image-upload-overlay/image-upload-overlay";
import {FILE_TYPES} from "../../const";
import {createNewPicture} from "../../utils/create-new-picture";
import {Context} from "../../context";

const initialState = {
  url: ``,
  size: ``,
  filter: ``,
  userHashtags: ``,
  userDescription: ``
};

const ImageUploadForm = () => {
  const [, setStore] = useContext(Context);
  const [needShowOverlay, setNeedShowOverlay] = useState(false);

  const formRef = useRef();
  const uploadInput = useRef();
  const newImageDataRef = useRef(initialState);

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
        newImageDataRef.current = {
          ...newImageDataRef.current,
          url: reader.result
        };

        setNeedShowOverlay(() => true);
      });

      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    createNewPicture(setStore, newImageDataRef.current);

    handleCloseOverlay();

    newImageDataRef.current = initialState;
  };

  useEffect(() => {
    formRef.current.addEventListener(`submit`, handleFormSubmit);
  }, []);

  return (
    <section className="img-upload">
      <div className="img-upload__wrapper">
        <h2 className="img-upload__title visually-hidden">Загрузка фотографии</h2>

        <form className="img-upload__form" id="upload-select-image" method="post" encType="multipart/form-data"
          action="https://js.dump.academy/kekstagram" autoComplete="off" ref={formRef}>

          <fieldset className="img-upload__start">
            <input type="file" id="upload-file" className="img-upload__input visually-hidden"
              name="filename" required onChange={handleUploadInputChange} ref={uploadInput}/>
            <label htmlFor="upload-file" className="img-upload__label img-upload__control">Загрузить</label>
          </fieldset>

          {needShowOverlay && <ImageUploadOverlay newImageData={newImageDataRef} onOverlayClose={handleCloseOverlay}/>}
        </form>
      </div>
    </section>
  );
};

export default React.memo(ImageUploadForm);
