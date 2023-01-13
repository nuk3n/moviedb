/* eslint-disable */
import React from 'react';
import './search-bar.css';

export default class SearchBar extends React.Component {
  state = {
    value: '',
  };

  searchFilm = (e) => {
    this.setState({
      value: e.target.value,
    });
    this.props.onSearchChange(e.target.value);
  };

  render() {
    return (
      <input
        className="searchBar"
        placeholder=" Type to search..."
        value={this.state.value}
        onChange={this.searchFilm}
      />
    );
  }
}
