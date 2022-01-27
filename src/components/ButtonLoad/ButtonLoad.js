import { BtnLoadMore } from './ButtonLoad.styled';
import PropTypes from 'prop-types';

const ButtonLoad = ({ onClick }) => (
  <BtnLoadMore
    className="btnLoadMore"
    type="button"
    onClick={onClick}
    disabled={false}
  >
    Load more
  </BtnLoadMore>
);
export default ButtonLoad;

ButtonLoad.propTypes = {
  onClick: PropTypes.func.isRequired,
};
