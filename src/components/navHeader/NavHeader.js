import React from 'react';
import './navHeader.scss';
import SearchBox from '../searchBox/SearchBox';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { useLocation } from 'react-router-dom';

const NavHeader = () => {
  const location = useLocation();

  return (
    <div className="nav-header">
      <header>
        <div>
          <img className="logo" src={require("../../assets/images/header/header-image.png")} alt="Header" />
        </div>
        {
          location.pathname === '/posts' && <SearchBox />
        }
        <div className="dropdown-menu-container">
          <DropdownMenu userName="John Doe" position="left" triggerType="icon" trigger="glyphicon glyphicon-menu-hamburger" fadeIn="true">
            <MenuItem text="Posts" location="/posts" />
            <MenuItem text="Pictures gallery" location="/pictures" />
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}

export default NavHeader;