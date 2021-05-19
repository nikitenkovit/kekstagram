import React from "react";
import {LoadStatus} from "../const";
import {sortingFunction} from "../utils/sorting-function";
import {SET_PICTURES_LIST,
  SORTING_PICTURES,
  CHANGE_LIKE_NUMBER,
  ADD_NEW_COMMENT,
  CREATE_NEW_PICTURE,
  ADD_URL,
  ADD_SIZE,
  ADD_FILTER,
  RESET_NEW_PICTURE_DATA} from "./action-types";
import {nanoid} from "nanoid";

export const ContextApp = React.createContext();

export const initialState = {
  pictureList: [],
  status: LoadStatus.INITIAL,
  newPicture: {
    url: ``,
    size: ``,
    filter: ``,
    userHashtags: ``,
    userDescription: ``
  }
};

let unsortedPictureList = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_PICTURES_LIST:
      unsortedPictureList = action.payload.pictureList;
      return {
        ...state,
        ...action.payload
      };
    case SORTING_PICTURES:
      return {
        ...state,
        pictureList: unsortedPictureList.slice().sort(sortingFunction(unsortedPictureList, action.payload))
      };
    case CHANGE_LIKE_NUMBER:
      return {
        ...state,
        pictureList: [
          ...state.pictureList.map((it) => {
            if (it.id === action.payload.id) {
              return {
                ...it,
                isLike: action.payload.isLike,
                likes: action.payload.likeNumber
              };
            }
            return it;
          })
        ]
      };
    case ADD_NEW_COMMENT:
      return {
        ...state,
        pictureList: [
          ...state.pictureList.map((it) => {
            if (it.id === action.payload.id) {
              return {
                ...it,
                comments: [action.payload.newComment, ...it.comments]
              };
            }
            return it;
          })
        ]
      };
    case CREATE_NEW_PICTURE:
      const {url, size, filter} = action.payload.imgData;
      const {userHashtags, userDescription} = action.payload.textData;
      return {
        ...state,
        pictureList: [
          ...state.pictureList,
          {
            id: nanoid(),
            comments: [],
            description: userHashtags + ` ` + userDescription,
            filter,
            size,
            likes: 0,
            url,
            isLike: false,
            date: new Date()
          }
        ]
      };
    case ADD_URL:
      return {
        ...state,
        newPicture: {
          ...state.newPicture,
          url: action.payload
        }
      };
    case ADD_SIZE:
      return {
        ...state,
        newPicture: {
          ...state.newPicture,
          size: action.payload
        }
      };
    case ADD_FILTER:
      return {
        ...state,
        newPicture: {
          ...state.newPicture,
          filter: action.payload
        }
      };
    case RESET_NEW_PICTURE_DATA:
      return {
        ...state,
        newPicture: initialState.newPicture
      };
    default:
      return state;
  }
};
