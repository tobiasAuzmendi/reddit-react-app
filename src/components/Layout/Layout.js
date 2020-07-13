import React from 'react';
import GoToRepoLink from '../goToRepoLink/GoToRepoLink';
import NavHeader from '../navHeader/NavHeader';
import './layout.scss';

const Layout = (InnerComponent) => () => (
  <div className="app">
    <NavHeader />
    <main>
      <InnerComponent />
      <GoToRepoLink />
    </main>
  </div>
);

export default Layout;