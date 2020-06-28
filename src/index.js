import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.scss';
import Layout from './components/Layout/Layout';
import PostList from './components/postList/PostList';
import PostDetail from './components/postDetail/PostDetail';

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
          component={Layout(PostsContent)}
        />
        <Redirect to="/posts" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
