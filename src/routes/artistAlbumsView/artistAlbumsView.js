import React, { Component } from 'react';
import { connect } from "react-redux";
import { viewAlbum } from "../../actions/index";
import { Link } from 'react-router-dom';
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

const mapStateToProps = state => {
  return {
    searchartistalbums: state.searchartistalbums,
    showartistalbums: state.showartistalbums,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    viewAlbum: album => dispatch(viewAlbum(album))
  };
}

class ConnectedArtistAlbumsView extends Component {
  constructor(props) {
    super(props);
    this.handleViewAlbum = this.handleViewAlbum.bind(this);
  }

  handleViewAlbum(albumid) {
    const {viewAlbum} = this.props;
    spotifyWebApi.getAlbum(albumid)
    .then(function(data) {
      viewAlbum(data);
    })
    .catch(function(error) {
      console.error(error);
    });
  
  }

  render() {
    if(this.props.searchartistalbums.length > 0 && this.props.showartistalbums) {
      let albums = Array.of(this.props.searchartistalbums[0]);
      albums = albums[0].albums;
      const distinctalbums = albums.filter((album,index) => {
        return index === albums.findIndex(obj => {
          return JSON.stringify(obj) === JSON.stringify(album);
        });
      });
      return (
        <div className="albumscontainer" id="albumscontainer">
          {distinctalbums.map(album => (
          <Link to="/albumview">
              <article className="artistalbum" key={Date.now()} onClick={() => this.handleViewAlbum(album.id)}>
              {<img className="albumimg" src={album.images[0].url}></img>}
              <p className="albumname">{album.name}</p>
            </article>
          </Link>))}
        </div>
      )
    }
    else {
      return null;
    }
  }
}

const ArtistAlbumsView = connect(mapStateToProps, mapDispatchToProps)(ConnectedArtistAlbumsView);
export default ArtistAlbumsView;