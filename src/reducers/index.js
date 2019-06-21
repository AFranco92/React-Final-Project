import {SEARCH_ARTIST, VIEW_ARTIST, VIEW_ALBUM} from "../constants/action-types";

import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

if(params.access_token) {
  spotifyWebApi.setAccessToken(params.access_token);
}

const params = getHashParams();

const initialState = {
  loggedIn: params.access_token ? true : false,
  searchresults = [{
    artistimgsrc: "",
    artistname: ""
  }]
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH_ARTIST:
      spotifyWebApi.searchTracks(action.payload)
        .then(function (data) {
          let div = document.getElementById("results");
          let id = data.tracks.items[0].artists[0].id;
          let song = document.createElement('article');
          spotifyWebApi.getArtist(id)
            .then(function (data) {
              song.classList.add("result");
              song.innerHTML = "<h5>" + data.name + "</h5>" + "<img class='songimg' src=" + data.images[0].url + ">";
              div.appendChild(song);
            }, function (err) {
              console.error(err);
            });
        }, function (err) {
          console.error(err);
        });
  }
}

export default rootReducer;
