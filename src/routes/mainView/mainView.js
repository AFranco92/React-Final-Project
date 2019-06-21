import './mainView.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/spologo.png';
import SearchForm from '../../components/SearchForm';

class MainView extends Component {
    constructor() {
      super();
    }

    getArtists() {
      let search = document.getElementById("searchfield");
      spotifyWebApi.searchTracks(search.value)
      .then(function(data) {
        let div = document.getElementById("results");
        let id = data.tracks.items[0].artists[0].id;
        let song = document.createElement('article');
        spotifyWebApi.getArtist(id)
          .then(function (data) {
            song.classList.add("result");
            song.innerHTML = "<h5>"+data.name+"</h5>"+"<img class='songimg' src="+data.images[0].url+">";
            div.appendChild(song);
          }, function (err) {
            console.error(err);
          });
      }, function(err) {
        console.error(err);
      });
    }

    render() {
        return (
          <div>
            <article className="main-view">
                <header className="main-view__header">
                  <img src={logo} className="main-view__logo" alt="logo" />
                  <nav className="main-view__nav">
                    <ul>
                      <li className="headerlink"><Link to="/">Home</Link></li>
                      <li className="headerlink"><Link to="/about">About</Link></li>
                      <li><a href="http://localhost:8888"><button>Log in</button></a></li>
                    </ul>
                    <SearchForm />
                  </nav>
                </header>
            </article>
            <div id="results"></div>
          </div>
        );
    }
}

export default MainView;
