
import React, { useState } from 'react'; //import React Component
import{ BrowserRouter, Route , Switch, Link, Redirect, NavLink} from 'react-router-dom';
//import './App.css'; //import css file!
import AboutTrail from './AboutTrail';

import './index.css';


import TRAIL_INFO from './data/trail_info.csv'; //a sample list of dogs (model)

function App(props) {

  const trail_info = TRAIL_INFO;

  //const renderTrailList = (renderProps) => <RenderTrailList {...renderProps} trail_info={trail_info} />


  return (
    <div>
      <header class="jumbotron jumbotron-fluid bg-dark text-white">
            <div class="container">
              <h1>Trail Finder and Traffic in Seattle</h1>
              <p class="lead">If you are looking for a trail with low traffic, use our website
                  to get some suggestions for trails near you!
              </p>
            </div>
      </header>
    
      <main className="container">

      <div className="row">
          <div className="col-3">
            <AboutNav />
          </div>
          <div className="col-9">
            {/*<PetList pets={pets} />*/}
            <Switch>
              <Route exact path="/" />
              <Route path="/AboutTrail"component={AboutTrail}/>
              <Redirect to="/"/>
            </Switch>

          </div>
        </div>
      </main>


      <footer className="container">
        <small>Data from <a href="https://www.seattle.gov/transportation/projects-and-programs/programs/bike-program/bike-counters?fbclid=IwAR3copSZvbf_CzzlbkfLm_q49LUp1y9djxjn6MyGpeKiZZlq5AAS2ZRdUhc"> Seattle Department of Transportation</a></small>
        <small>Images from <a href ="https://unsplash.com/photos/Fv9fk47HBr4/"> Hannah Reding</a></small>
      </footer>
    </div>
  );
}

function AboutNav() {
  return (
    <nav id="aboutLinks">
      <h2>About</h2>
      <ul className="list-unstyled">
        <li><NavLink exact to="/" activeClassName="activeLink">Home</NavLink></li>
        <li><NavLink to="/AboutTrail" activeClassName="activeLink">Specific Trail</NavLink></li>
      </ul>
    </nav>
  );
}




export default App;
