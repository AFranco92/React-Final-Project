import React from 'react';
import { Route, Switch } from 'react-router-dom';
import store from "../store/index";
import {Provider} from 'react-redux';
import MainView from './mainView/mainView';
import HomeView from './homeView/homeView';
import SearchView from '../components/SearchView';
import ArtistAlbumsView from './artistAlbumsView/artistAlbumsView';
import AlbumView from './albumView/albumView';

const getRoutes = function() {
  return (
    <div>
      <Provider store={store}>
        <Route name="Main" component={MainView} />
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/searchview" component={SearchView} />
            <Route path="/artistalbums" component={ArtistAlbumsView} />
            <Route path="/albumview" component={AlbumView} />
        </Switch>
      </Provider>
    </div>
    )
};

export default getRoutes;
