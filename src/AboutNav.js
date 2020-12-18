import React from 'react';
import{NavLink} from 'react-router-dom';

function AboutNav() {
  return (
    <nav id="aboutLinks">      
      <ul className="list-unstyled">
        <li><NavLink exact to="/" activeClassName="activeLink">Go to Search</NavLink></li>
        <li><NavLink to="/SavedTrails" activeClassName="activeLink">Saved Trails</NavLink></li>
      </ul>
    </nav>
  );
}

export default AboutNav;