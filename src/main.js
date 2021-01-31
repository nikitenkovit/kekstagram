import FilterView from "./view/filter.js";
import ImgUploadOverlayView from "./view/img-upload-overlay.js";
import BigPictureOverlayView from "./view/big-picture-overlay.js";
import ImgUploadMessageDragndropView from "./view/img-upload-message-dragndrop.js";
import ImgUploadMessageErrorView from "./view/img-upload-message-error.js";
import PictureView from "./view/picture.js";
import PicturesModel from "./model/pictures.js";
import BoardPresenter from "./presenter/board.js";
import {RenderPosition, render} from "./utils/render.js";
import {UpdateType} from "./const.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j1`;
const END_POINT = `https://javascript.pages.academy/kekstagram`;

const siteMainElement = document.querySelector(`main`);

const api = new Api(END_POINT, AUTHORIZATION);

const picturesModel = new PicturesModel();

const boardPresenter = new BoardPresenter(siteMainElement, picturesModel);

const renderPicture = (picture, container) => {
  const pictureComponent = new PictureView(picture);

  render(container, pictureComponent, RenderPosition.BEFOREEND);
};

const filterComponent = new FilterView();
render(siteMainElement, filterComponent, RenderPosition.AFTERBEGIN);






boardPresenter.init();

api.getPictures()
  .then((tasks) => {
    picturesModel.setPictures(UpdateType.INIT, tasks);
    // console.log(picturesModel.getPictures())
  })
  .catch(() => {
    picturesModel.setPictures(UpdateType.INIT, []);
  });
