import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import { setSearchText } from '../../redux/actions/searchBox';
import './searchBox.scss';

const SearchBox = () => {
  let debouncedFn = null;
  const dispatch = useDispatch();

  useEffect(() => {
    // componentDidUnmount equivalent
    return () => {
      dispatch(setSearchText(''))
    }
  }, [dispatch]);

  const onTextChange = (event) => {
    event.persist();

    if (!debouncedFn) {
      debouncedFn =  debounce(() => {
        let searchText = event.target.value;
        dispatch(setSearchText(searchText))
      }, 400);
    }
    debouncedFn();
  }

  return (
    <div className="search-box-container">
      <input type="text" name="searchText" placeholder="Search" onChange={(event) => onTextChange(event)} />
    </div>
  );

}

export default React.memo(SearchBox);