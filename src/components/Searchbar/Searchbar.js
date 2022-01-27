import { useState } from 'react';
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

export default function Searchbar ({onSubmit}) {
  const [queryUser, setQueryUser] = useState("")

  const handlerChangeUserQuery = e => {setQueryUser (e.target.value)};

  const handelSubmitUserQuery = e => {
    e.preventDefault();
    if (queryUser === '') {return alert('Empty field')}
    onSubmit(queryUser);
    setQueryUser('');
  };
  
    return (
      <SearchbarStyle>
        <SearchForm onSubmit={handelSubmitUserQuery}>
          <IconContext.Provider value={{ color: 'blue', size: '2em' }}>
            <SearchFormButton type="submit">
              <FaSearch />
              <SearchFormLabel>Search</SearchFormLabel>
            </SearchFormButton>
          </IconContext.Provider>

          <SearchFormInput
            type="text"
            value={queryUser}
            onChange={handlerChangeUserQuery}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarStyle>
    )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
