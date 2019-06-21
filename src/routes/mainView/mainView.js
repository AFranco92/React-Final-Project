import './mainView.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/spologo.png';
import SearchForm from '../../components/SearchForm';

class MainView extends Component {
    render() {
        return (
          <div>
            <article className="main-view">
                <header className="main-view__header">
                  <Link to="/"><img src={logo} className="main-view__logo" alt="logo" /></Link>
                  <nav className="main-view__nav">
                    <ul className="login">
                      <li><a href="http://localhost:8888"><button className="loginbtn">Log in</button></a></li>
                    </ul>
                    <SearchForm />
                  </nav>
                </header>
            </article>
          </div>
        );
    }
}

export default MainView;
