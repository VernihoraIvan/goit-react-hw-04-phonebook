import PropTypes from 'prop-types';
import css from './Section.module.css';

const Section = ({ title, children }) => (
  <div className={css.section}>
    <h2 className={css.section_title}>{title}</h2>
    {children}
  </div>
);

export default Section;
Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
