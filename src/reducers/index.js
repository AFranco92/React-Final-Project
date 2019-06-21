import {SEARCH_ARTIST, VIEW_ARTIST, VIEW_ALBUM} from "../constants/action-types";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();
const params = getHashParams();

const initialState = {
  loggedIn: params.access_token ? true : false,
  searchresults: [],
  searchartistalbums: [],
  showresults: false,
  showartistalbums: false,
  albumdata: []
};

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

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH_ARTIST:
        return {
          loggedIn : state.loggedIn,
          searchresults : state.searchresults.concat(action.payload),
          searchartistalbums : [],
          showresults: !state.showresults,
          showartistalbums: state.showartistalbums,
          albumdata: []
        }
    case VIEW_ARTIST:
      return {
        loggedIn : state.loggedIn,
        searchresults : [],
        searchartistalbums : state.searchartistalbums.concat(action.payload),
        showresults: false,
        showartistalbums: true,
        albumdata: []
      }
    case VIEW_ALBUM:
      return {
        loggedIn: state.loggedIn,
        searchresults: state.searchresults,
        searchartistalbums: state.searchartistalbums,
        showresults: state.showresults,
        showartistalbums: state.showartistalbums,
        albumdata: state.albumdata.concat(action.payload)
      }
  }
  return state;
}

export default rootReducer;
