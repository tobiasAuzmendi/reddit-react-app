import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import store from './redux/store';
import './index.scss';
import Layout from './components/layout/Layout';
import PostList from './components/postList/PostList';
import PostDetail from './components/postDetail/PostDetail';
import PictureGallery from './components/pictureGallery/PictureGallery';

const PostsContent = () => (
  <>
    <PostList />
    <PostDetail />
  </>
);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          path="/posts"
          exact
        >
          { Layout(PostsContent) }
        </Route>
        <Route
          path="/pictures"
          exact
        >
          { Layout(PictureGallery) }
        </Route>
        <Redirect to="/posts" />
      </Switch>
      <NotificationContainer enterTimeout={800} leaveTimeout={800}/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
