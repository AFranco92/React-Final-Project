import React, { Component } from "react";
import { connect } from "react-redux";
import { searchArtist } from "../actions/index";
import { Link } from 'react-router-dom';

function mapDispatchToProps(dispatch) {
  return {
    searchArtist: artist => dispatch(searchArtist(artist))
  };
}

class ConnectedSearchForm extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    let artist = document.getElementById("searchfield").value;
    this.props.searchArtist(artist);
  }

  render() {
    return (
      <form onSubmit={() => this.handleSearch}>
        <input id="searchfield" className="searchbar" type="text" placeholder="Search"/>
        <input type="submit" className="searchbtn" value="Search"/>
      </form>
    );
  }
}

const SearchForm = connect(null, mapDispatchToProps)(ConnectedSearchForm);
export default SearchForm;