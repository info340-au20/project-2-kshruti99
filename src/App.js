
import React, { useState } from 'react'; //import React Component
import{ BrowserRouter, Route , Switch, Link, Redirect, NavLink} from 'react-router-dom';
//import './App.css'; //import css file!
import AboutTrail from './AboutTrail';
import './index.css';


import TRAIL_INFO from './data/trail_info.csv'; //a sample list of dogs (model)

function App(props) {
  //const trail_info = TRAIL_INFO;
  //const renderTrailList = (renderProps) => <RenderTrailList {...renderProps} trail_info={trail_info} />
  /*
  let allTrails = [];
  for (var trail in props.info) {
    allTrails.push(props.info[trail].trailName);
  }*/

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
            <Switch>
              <Route exact path="/" />
              <Route path="/AboutTrail"component={AboutTrail}/>
              <Redirect to="/"/>
            </Switch>
          </div>
          <TrailList trails={props.info}/>
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

/*
    <div className="d-flex p-2 col-lg-4">
      <div className="card mx-2 my-4">
        <img className="card-img-top" src={imgSrc} alt={imgAlt}/>
        <div className="card-body">
          <h4 className="card-title">{props.trail.trailName}</h4>
          <p className="card-text">{props.trail.address}</p>
          <button className="button float-right" class="btn btn-outline-secondary"><a href="expandedview.html">See more</a></button>
        </div>
      </div>
    </div>
*/
export function TrailCard(props) {
  let imgSrc = 'img/'+props.trail.image;
  let imgAlt = props.trail.trailName + " image";
  return (    
    <div key={props.trail.trailName} className="card">
      <img className="card-img-top" src={imgSrc} alt={imgAlt} />
      <div className="card-body">
        <h3 className="card-title">{props.trail.trailName}</h3>
        <p className="card-text">{props.trail.address}</p>
      </div>
    </div>
  );
}

export function TrailList(props) {
  let deck = props.trails.map((trail) => {
    let trailCard = <TrailCard trail={trail} />;
    return trailCard;
  });

  return (
    <div id="trailList" className="col-9">
      <h2>Trails to Visit in Greater Seattle</h2>
      <div class="card-deck">
        {deck}
      </div>
    </div>
  );
}



export default App;
