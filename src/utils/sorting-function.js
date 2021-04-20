import {SortingType} from "../const";

export const sortingFunction = (pictures, type) => (a, b) => {
  switch (type) {
    case SortingType.NEW: {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return dateB - dateA;
    }
    case SortingType.DISCUSSED:
      return b.comments.length - a.comments.length;
  }

  return pictures;
};
