import React from 'react';
import './navHeader.scss';
import SearchBox from '../searchBox/SearchBox';
import { DropdownMenu } from 'react-bootstrap-dropdown-menu';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

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
            <ul>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/pictures">Pictures gallery</Link>
              </li>
            </ul>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}

export default NavHeader;