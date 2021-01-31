import AbstractView from "./abstract.js";

export const createFilterTemplate = () => {
  return (
    `<section class="img-filters container">
      <h2 class="img-filters__title visually-hidden">Фильтр фотографий</h2>

      <form class="img-filters__form" action="index.html" method="get" autocomplete="off">
        <button type="button" class="img-filters__button img-filters__button--active" id="filter-popular">Популярные</button>
        <button type="button" class="img-filters__button" id="filter-new">Новые</button>
        <button type="button" class="img-filters__button" id="filter-discussed">Обсуждаемые</button>
      </form>
    </section>`
  );
};

export default class Filter extends AbstractView {
  constructor(filters = null, currentFilterType = null) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
