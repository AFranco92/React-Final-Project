import {viewArtist} from "../../actions/index";
import React, { Component } from 'react';
import { connect } from "react-redux";
import './searchView.css';


class searchView extends Component {
  render() {
    return (
      <div className="searchcontainer">
        <article className="result">

        </article>
      </div>
    );
  }
}

export default searchView;