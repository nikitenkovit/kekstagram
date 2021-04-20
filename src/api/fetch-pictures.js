import {axiosInstance} from "./api";
import {LoadStatus} from "../const";
import {adaptToClient} from "./adapt-to-client";

export const fetchPictureList = async (store, setStore) => {
  setStore(() => {
    return {
      ...store,
      status: LoadStatus.FETCHING
    };
  });

  let pictures;

  try {
    pictures = await axiosInstance.get(`/data`);
  } catch (e) {
    setStore(() => {
      return {
        ...store,
        status: LoadStatus.FAILURE
      };
    });

    return;
  }

  setStore(() => {
    return {
      ...store,
      pictureList: pictures.data.map(adaptToClient),
      status: LoadStatus.SUCCESS
    };
  });
};
