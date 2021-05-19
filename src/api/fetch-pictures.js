import {axiosInstance} from "./api";
import {LoadStatus} from "../const";
import {adaptToClient} from "./adapt-to-client";

export const fetchPictures = async () => {
  let pictures;

  try {
    pictures = await axiosInstance.get(`/data`);
  } catch (e) {
    return {
      pictureList: [],
      status: LoadStatus.FAILURE
    };
  }

  const adaptedPictures = pictures.data.map(adaptToClient);

  return {
    pictureList: adaptedPictures,
    status: LoadStatus.SUCCESS
  };
};
