import React from 'react';
import{NavLink} from 'react-router-dom';
import { Button } from 'reactstrap';

function AboutNav(props) {
/* 
  const handleLogOutClick = () => {
    console.log("logout");
  }
 */

  return (
    <nav id="aboutLinks">      
      <ul className="list-unstyled">
        <li><NavLink exact to="/" activeClassName="activeLink">Go to Search</NavLink></li>
        <li><NavLink to="/SavedTrails" activeClassName="activeLink">Saved Trails</NavLink></li>
        <li><Button onClick = {props.signOutCallback} size="medium" color="primary">Log Out</Button></li>
      </ul>
    </nav>
  );
}

export default AboutNav;