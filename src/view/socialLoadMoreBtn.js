import AbstractView from "./abstract";

const createLoadMoreBtnTemplate = () => {
  return `<button class="social__loadmore" type="button">Загрузить еще</button>`;
};

export default class SocialLoadMoreBtn extends AbstractView {
  getTemplate() {
    return createLoadMoreBtnTemplate();
  }
}
