import React, { Component } from "react";
import { connect } from "react-redux";
import { searchArtist } from "../actions/index";
import { Link } from 'react-router-dom';
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

const mapStateToProps = state => {
  return {
    searchresults: state.searchresults
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchArtist: result => dispatch(searchArtist(result))
  };
}

class ConnectedSearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    let result = [];
    let artist = document.getElementById("searchfield").value;
    const {searchArtist} = this.props;
    spotifyWebApi.searchTracks(artist)
    .then(function (data) {
      let id = data.tracks.items[0].artists[0].id;
      spotifyWebApi.getArtist(id)
        .then(function (data) {
          let resultdata = {
            artistimgsrc: data.images[0].url,
            artistname: data.name
          };
          result.push(resultdata);
          searchArtist(result);
        }, function (err) {
          console.error(err);
        });
    }, function (err) {
      console.error(err);
    });
  }

  render() {
    return (
      <form>
        <input id="searchfield" className="searchbar" type="text" placeholder="Search"/>
        <Link to="/searchview"><input type="button" className="searchbtn" value="Search" onClick={() => this.handleSearch()}/></Link>
      </form>
    );
  }
}

const SearchForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearchForm);
export default SearchForm;