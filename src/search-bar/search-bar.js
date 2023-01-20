import EmptySearchWarning from '../empty-search-warning';
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
    const emptySearchWarning = this.props.results ? <EmptySearchWarning className="emptySearchWarning" /> : null;

    return (
      <div className="searchBar">
        <input
          className="searchBar__input"
          placeholder=" Type to search..."
          value={this.state.value}
          onChange={this.searchFilm}
        />
        {emptySearchWarning}
      </div>
    );
  }
}
