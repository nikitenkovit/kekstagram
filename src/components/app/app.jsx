import React, {useEffect, useReducer} from 'react';
import {fetchPictures} from "../../api/fetch-pictures";
import ActionCreator from '../../store/action-creator';
import {getIsNeedFetching, getIsNeedShowErrorMessage, getIsNeedShowLoadingMessage, getPictures} from "../../store/selectors";
import {ContextApp, reducer, initialState} from "../../store/reducer";
import Filter from "../filter/filter";
import PicturesContainer from "../pictures-container/pictures-container";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const needFetching = getIsNeedFetching(state);
  const needShowLoadingMessage = getIsNeedShowLoadingMessage(state);
  const needShowErrorMessage = getIsNeedShowErrorMessage(state);
  const pictureList = getPictures(state);

  useEffect(() => {
    if (needFetching) {
      fetchPictures().then((data) => {
        dispatch(ActionCreator.setPicturesList(data));
      });
    }
  });

  if (needShowLoadingMessage) {
    return (
      <div className="img-upload__message img-upload__message--loading">Загружаем...</div>
    );
  } else if (needShowErrorMessage) {
    return (
      <div className="img-upload__message img-upload__message--error error">
        Что-то пошло не так. Попробуйте обновить страницу позже
      </div>
    );
  }

  return (
    <ContextApp.Provider value={{state, dispatch}}>
      <Filter/>
      <PicturesContainer pictureList={pictureList}/>
    </ContextApp.Provider>
  );
};

export default App;
