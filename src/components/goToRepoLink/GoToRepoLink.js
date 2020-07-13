import React from 'react';
import './goToRepoLink.scss';

const GoToRepoLink = () => (
  <a className="go-to-repo-link reddit-app-secondary-button" href="https://github.com/tobiasAuzmendi/reddit-react-app">
    <i className="fab fa-github" />
  </a>
);

export default React.memo(GoToRepoLink);
