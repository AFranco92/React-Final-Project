import {viewArtist} from "../actions/index";
import React, { Component } from 'react';
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import { Link } from 'react-router-dom';
import '../routes/searchView/searchView.css';
const spotifyWebApi = new Spotify();

const mapStateToProps = state => {
  return {
    searchresults: state.searchresults,
    showresults: state.showresults
  };
}

function mapDispatchToProps(dispatch) {
  return {
    viewArtist: albums => dispatch(viewArtist(albums))
  };
}

class ConnectedSearchView extends Component {
  constructor(props) {
    super(props);
    this.handleViewArtist = this.handleViewArtist.bind(this);
  }
  
  handleViewArtist(artist) {
    let results = document.getElementById("results");
    results.style.display = "none";
    let albums = [];
    const {viewArtist} = this.props;
    spotifyWebApi.searchTracks(artist)
    .then(function (data) {
      data.tracks.items.forEach(item => albums.push(item.album.id));
      spotifyWebApi.getAlbums(albums)
      .then(function(data) {
        viewArtist(data);
      }, function(err) {
        console.error(err);
      });
    }, function (err) {
      console.error(err);
    });
  }

  render() {
    if(this.props.searchresults && this.props.showresults) {
      return (
        <div className="results" id="results">
          {this.props.searchresults.map(result => (
            <Link to="/artistalbums" key={result.artistname}>
            <article key={result.artistname} className="result" onClick={() => this.handleViewArtist(result.artistname)}>
              <h5>{result.artistname}</h5>
              <img className="artistimg" src={result.artistimgsrc} alt={result.artistname}></img>
            </article>
            </Link>))}
        </div>
      );
    }
    else {
      return null;
    }
  }
}

const SearchView = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearchView);
export default SearchView;