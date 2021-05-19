import {createSelector} from "reselect";
import {LoadStatus} from "../const";

const getStatus = ({status}) => status;
export const getPictures = ({pictureList}) => pictureList;
export const getNewPicture = ({newPicture}) => newPicture;
export const getIsNeedFetching = createSelector(
    getStatus,
    (status) => status === LoadStatus.INITIAL);
export const getIsNeedShowLoadingMessage = createSelector(
    getStatus,
    (status) => status === LoadStatus.INITIAL);
export const getIsNeedShowErrorMessage = createSelector(
    getStatus,
    (status) => status === LoadStatus.FAILURE);
