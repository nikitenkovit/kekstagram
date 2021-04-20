import React, {useEffect, useState} from 'react';
import Filter from "../filter/filter";
import PicturesContainer from "../pictures-container/pictures-container";
import {Context} from "../../context";
import {fetchPictureList} from "../../api/fetch-pictures";
import {LoadStatus, DEFAULT_SORTING_TYPE} from "../../const";
import {sortingFunction} from "../../utils/sorting-function";

const initialState = {
  pictureList: [],
  status: LoadStatus.INITIAL
};

const MainScreen = () => {
  const [store, setStore] = useState(initialState);
  const [activeType, setActiveType] = useState(DEFAULT_SORTING_TYPE);
  const [sortedPictures, setSortedPictures] = useState(store.pictureList);

  useEffect(() => {
    fetchPictureList(store, setStore);
  }, []);

  useEffect(() => {
    setSortedPictures(store.pictureList.slice().sort(sortingFunction(store.pictureList, activeType)));
  }, [store.pictureList, activeType]);

  const needShowLoadingMessage = store.status === LoadStatus.INITIAL || store.status === LoadStatus.FETCHING;

  if (needShowLoadingMessage) {
    return (
      <div className="img-upload__message img-upload__message--loading">Загружаем...</div>
    );
  }

  return (
    <Context.Provider value={[store, setStore]}>
      <Filter onSortedChange={setActiveType}/>

      <PicturesContainer pictureList={sortedPictures}/>
    </Context.Provider>
  );
};

export default React.memo(MainScreen);
