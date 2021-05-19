import {SET_PICTURES_LIST,
  SORTING_PICTURES,
  CHANGE_LIKE_NUMBER,
  ADD_NEW_COMMENT,
  CREATE_NEW_PICTURE,
  ADD_URL,
  ADD_SIZE,
  ADD_FILTER,
  RESET_NEW_PICTURE_DATA} from "./action-types";

export default {
  setPicturesList: (payload) => ({
    type: SET_PICTURES_LIST,
    payload
  }),
  sortingPictures: (type) => ({
    type: SORTING_PICTURES,
    payload: type
  }),
  changeLikeNumber: (id, likeNumber, isLike) => ({
    type: CHANGE_LIKE_NUMBER,
    payload: {
      id,
      likeNumber,
      isLike
    }
  }),
  addNewComment: (id, newComment) => ({
    type: ADD_NEW_COMMENT,
    payload: {
      id,
      newComment
    }
  }),
  createNewPicture: (imgData, textData) => ({
    type: CREATE_NEW_PICTURE,
    payload: {
      imgData,
      textData
    }
  }),
  addUrl: (url) => ({
    type: ADD_URL,
    payload: url
  }),
  addSize: (size) => ({
    type: ADD_SIZE,
    payload: size
  }),
  addFilter: (filter) => ({
    type: ADD_FILTER,
    payload: filter
  }),
  resetNewPictureData: () => ({
    type: RESET_NEW_PICTURE_DATA
  }),
};
