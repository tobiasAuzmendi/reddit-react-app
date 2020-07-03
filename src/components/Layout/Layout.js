import React from 'react';
import NavHeader from '../navHeader/NavHeader';
import './layout.scss';

const Layout = (InnerComponent) => () => (
  <div className="app">
    <NavHeader />
    <main>
      <InnerComponent />
    </main>
  </div>
);

export default Layout;