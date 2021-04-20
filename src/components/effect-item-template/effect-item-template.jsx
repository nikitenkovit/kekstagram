import React, {useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import {EffectsNameToRussiaName} from "../../const";

const EffectItemTemplate = ({name, pictureUrl}) => {
  const previewRef = useRef();

  const needChecked = name === `none`;

  useEffect(() => {
    previewRef.current.style.backgroundImage = `url(${pictureUrl})`;
  }, []);

  return (
    <li className="effects__item">
      <input type="radio" className="effects__radio visually-hidden" name="effect"
        id={`effect-${name}`} defaultValue={name} defaultChecked={needChecked} readOnly/>
      <label htmlFor={`effect-${name}`} className="effects__label">
        <span className={`effects__preview effects__preview--${name}`} ref={previewRef}>
          Превью фото ${name === `none` ? `без эффекта` : EffectsNameToRussiaName[name]}
        </span>
        {EffectsNameToRussiaName[name]}
      </label>
    </li>
  );
};

EffectItemTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
};

export default React.memo(EffectItemTemplate);
