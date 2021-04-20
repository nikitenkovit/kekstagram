import {nanoid} from "nanoid";

const getRandomDate = () => {
  const fromDate = new Date(`July 18, 69 00:00:00 GMT+00:00`).getTime();
  const toDate = new Date(`July 20, 69 00:00:00 GMT+00:00`).getTime();
  return new Date(fromDate + Math.random() * (toDate - fromDate));
};

export const adaptToClient = (picture) => {
  return Object.assign(
      {},
      picture,
      {
        id: nanoid(),
        filter: ``,
        size: ``,
        isLike: false,
        date: getRandomDate()
      }
  );
};
