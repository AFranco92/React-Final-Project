import {SEARCH_ARTIST, VIEW_ARTIST, VIEW_ALBUM} from "../constants/action-types";

export function searchArtist(payload) {
  return {
    type: SEARCH_ARTIST,
    payload
  };
}