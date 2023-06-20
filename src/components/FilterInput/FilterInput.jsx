import PropTypes from 'prop-types';
import css from './FilterInput.module.css';

const FilterInput = ({ value, handleFilter }) => (
  <label className={css.label}>
    Find contacts by name:
    <br />
    <input
      className={css.input}
      type="text"
      value={value}
      onChange={handleFilter}
      placeholder="search..."
    />
  </label>
);

export default FilterInput;

FilterInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
