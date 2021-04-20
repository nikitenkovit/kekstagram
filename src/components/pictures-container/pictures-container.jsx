import React, {useState} from 'react';
import ImageUploadForm from "../image-upload-form/image-upload-form";
import SmallPicture from "../small-picture/small-picture";
import BigPicture from "../big-picture/big-picture";
import smallPictureProp from "../small-picture/small-picture.prop";
import PropTypes from "prop-types";

const PicturesContainer = ({pictureList}) => {
  const [isBigPictureActive, setIsBigPictureActive] = useState(false);
  const [bigPictureDataId, setBigPictureDataId] = useState(``);

  const handlePictureLinkClick = (id) => {
    setIsBigPictureActive(() => !isBigPictureActive);

    setBigPictureDataId(() => id);
  };

  return (
    <section className="pictures container">
      <h2 className="pictures__title visually-hidden">Фотографии других пользователей</h2>

      <ImageUploadForm/>

      {pictureList.map((picture) => <SmallPicture key={picture.id} picture={picture}
        onPictureLinkClick={handlePictureLinkClick}/>)}

      {isBigPictureActive && <BigPicture onBigPictureClose={setIsBigPictureActive} pictureId={bigPictureDataId}/>}
    </section>
  );
};

PicturesContainer.propTypes = {
  pictureList: PropTypes.arrayOf(smallPictureProp)
};

export default React.memo(PicturesContainer);
