import {nanoid} from "nanoid";

export const createNewPicture = (store, {url, size, filter, userHashtags, userDescription}) => {
  store((state) => {
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
  });
};
