import { Component } from 'react';
import {
  SearchbarStyle,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    queryUser: '',
  };

  handlerChangeUserQuery = e => {
    this.setState({
      queryUser: e.target.value,
    });
  };

  handelSubmitUserQuery = e => {
    e.preventDefault();
    if (this.state.queryUser === '') {
      return alert('Empty field');
    }
    this.props.onSubmit(this.state.queryUser);
    this.setState({ queryUser: '' });
  };

  render() {
    return (
      <SearchbarStyle>
        <SearchForm onSubmit={this.handelSubmitUserQuery}>
          <IconContext.Provider value={{ color: 'blue', size: '2em' }}>
            <SearchFormButton type="submit">
              <FaSearch />
              <SearchFormLabel>Search</SearchFormLabel>
            </SearchFormButton>
          </IconContext.Provider>

          <SearchFormInput
            type="text"
            value={this.state.queryUser}
            onChange={this.handlerChangeUserQuery}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarStyle>
    );
  }
}
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
