
import React, { useState } from 'react'; //import React Component
import{ BrowserRouter, Route , Switch, Link, Redirect, NavLink} from 'react-router-dom';
//import './App.css'; //import css file!
import AboutTrail from './AboutTrail';
import './index.css';
import { Button } from 'reactstrap';




function App(props) {

  const renderTrailList = (renderProps) => <TrailList {...renderProps} trails={trailResults} />
  
  const [trailZip, setZipInp] = React.useState("");
  const [trailResults, getTrailResults] = React.useState([]);
  const searchTyped = e => {
    setZipInp(e.target.value);
  };
  React.useEffect(() => {
    const trailResults = props.info.filter(trail =>
      (trail.zipcode+'').indexOf(''+trailZip) > -1
    );
    getTrailResults(trailResults);
  }, [trailZip]);

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
            {/*<Search />*/}
            <input
              type="text"
              placeholder="Search"
              value={trailZip}
              onChange={searchTyped}
            />
          </div>
          <div className="col-9">
            <Switch>
              <Route exact path="/" render={renderTrailList}/>
              {/*<Route exact path="/"/>*/}
              <Route path="/AboutTrail/:trailname" 
                render={() => <AboutTrail info={props.info}/>} 
              />
              <Redirect to="/"/>
            </Switch>
          </div>
          {/*<TrailList trails={props.info}/>*/}
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
        {/*<li><NavLink to="/AboutTrail" activeClassName="activeLink">Specific Trail</NavLink></li>*/}
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


  const [redirectTo, setRedirectTo] = useState(undefined);

  const handleClick = () => {
    setRedirectTo(props.trail.trailName);
    console.log("you clicked", props.trail.trailName); // for testing purposes
  }

  if(redirectTo !== undefined) {
    return <Redirect push to={"/AboutTrail/" + redirectTo }/>
  }

  return (    
    <div key={props.trail.trailName} className="card">
      <img className="card-img-top" src={imgSrc} alt={imgAlt} />
      <div className="card-body">
        <h3 className="card-title">{props.trail.trailName}</h3>
        <p className="card-text">{props.trail.address}</p>
        <Button onClick = {handleClick} size="large" color="primary">More Information</Button>
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
      <div className="card-deck">
        {deck}
      </div>
    </div>
  );
}



export default App;
