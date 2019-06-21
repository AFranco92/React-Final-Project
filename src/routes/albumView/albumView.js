import React, { Component } from 'react';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    albumdata: state.albumdata
  };
}

class ConnectedAlbumView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.albumdata.length > 0) {
      let tracks = this.props.albumdata[0].tracks.items;
      return (
        <div className="albumcontainer">
          <h2>{this.props.albumdata[0].name}</h2>
          <article>
            <img className="bigalbumimg" src={this.props.albumdata[0].images[0].url}></img>
            <h3>Songs</h3>
            <ul>
              {tracks.map(track => (
                <li>
                  <p>{track.name}</p>
                  <audio controls="controls" src={track.preview_url} type="audio/mpeg"></audio>
                </li>
              ))}
            </ul>
          </article>
        </div>    
      );
    }
    else {
      return null;
    }
  }
}

const AlbumView = connect(mapStateToProps, null)(ConnectedAlbumView);
export default AlbumView;