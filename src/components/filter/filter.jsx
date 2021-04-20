import React from 'react';
import PropTypes from "prop-types";

const Filter = ({onSortedChange}) => {
  const handleSortedTypeChange = (evt) => {
    evt.persist();

    onSortedChange(() => evt.target.value);
  };

  return (
    <section className="img-filters container">
      <h2 className="img-filters__title visually-hidden">Фильтр фотографий</h2>

      <form action="#" className="img-filters__form" onChange={handleSortedTypeChange}>
        <input type="radio" className="img-filters__radio visually-hidden"
          name="img-filters" id="popular" defaultValue="popular" defaultChecked={true}/>
        <label className="img-filters__label" htmlFor="popular">
          Популярные
        </label>

        <input type="radio" className="img-filters__radio visually-hidden"
          name="img-filters" id="new" defaultValue="new"/>
        <label className="img-filters__label" htmlFor="new">
          Новые
        </label>

        <input type="radio" className="img-filters__radio visually-hidden"
          name="img-filters" id="discussed" defaultValue="discussed"/>
        <label className="img-filters__label" htmlFor="discussed">
          Обсуждаемые
        </label>
      </form>
    </section>
  );
};

Filter.propTypes = {
  onSortedChange: PropTypes.func.isRequired
};

export default React.memo(Filter);
