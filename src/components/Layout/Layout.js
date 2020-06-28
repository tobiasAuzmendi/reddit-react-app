import React from 'react';
import './layout.scss';
import SearchBox from '../searchBox/SearchBox';

const Layout = (InnerComponent) => () => (
  <div className="app">
    <header>
      <img className="logo" src={require("../../assets/images/header/header-image.png")} alt="Header" />
      <SearchBox />
    </header>
    <main>
      <InnerComponent />
    </main>
  </div>
);

export default Layout;