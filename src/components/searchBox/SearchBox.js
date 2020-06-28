import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { setSearchText } from '../../redux/actions/searchBox';
import './searchBox.scss';

class SearchBox extends React.PureComponent {

  onTextChange = (searchText) => {
    this.props.setSearchText(searchText);
  }

  onTextChange = (event) => {
    event.persist();

    if (!this.debouncedFn) {
      this.debouncedFn =  debounce(() => {
        let searchText = event.target.value;
        this.props.setSearchText(searchText);
      }, 400);
    }
    this.debouncedFn();
  }

  render() {
    return (
      <div className="search-box-container">
        <input type="text" name="searchText" placeholder="Search" onChange={(event) => this.onTextChange(event)} />
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  setSearchText: drinks => dispatch(setSearchText(drinks))
});

export default connect(null, mapDispatchToProps)(SearchBox);