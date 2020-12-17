
import React, { useState } from 'react'; //import React Component
import{ Route , Switch, Link, Redirect, NavLink} from 'react-router-dom';
import AboutTrail from './AboutTrail';
import SavedTrails from './SavedTrails';
import { Button } from 'reactstrap';




function App(props) {

  const renderTrailList = (renderProps) => <TrailList {...renderProps} trails={trailResults} saveCallback={handleSavedTrails} statusCallback={checkStatus} />
  
  const [trailZip, setZipInp] = React.useState("");
  const [trailResults, getTrailResults] = React.useState([]);

  const [myTrails, setSave] = React.useState([]);
  const [newTrail, addTrail] = React.useState(0);
  const [isSaved, changeStatus] = React.useState(false);
  const [saveCount, updateCount] = React.useState(0);
  const [allTrails, trackStatus] = React.useState(props.info);

  const checkStatus = (id) => {
    for (let i=0; i< allTrails.length; i++) {
      if(allTrails[i].id==id) {
        if (allTrails[i].hasOwnProperty('saved'))
          return(allTrails[i].saved);
        else
          return(false);
      }
    }
    return false;
  }

  /*
  const handleSave = (trailId) => {
    let trailsCopy = [];
    for (let i=0; i< myTrails.length; i++) {
      trailsCopy.push(myTrails[i]);
    }
    trailsCopy.push(trailId);
    //setSave(trailsCopy);
    if (myTrails.length===0) {
      console.log('first save:'+trailId);
      setSave([trailId]);
    }
    else {
      setSave(myTrails => myTrails.concat(trailId));
    }
    console.log('save:'+trailId);
    console.log(trailsCopy);
    console.log(myTrails);
  }

  const handleUnsave = (trailId) => {
    let trailsCopy = myTrails.filter((trail) =>
      trail.id !== trailId
    );
    setSave([].concat(trailsCopy));
    console.log('unsave:'+trailId);
    console.log(trailsCopy);
    console.log(myTrails);
  }*/

  const handleSavedTrails = (trailId, toSave) => {
    //trail id number state variable
    addTrail(trailId);
    //save status of current trail
    changeStatus(toSave);
    updateCount(saveCount + 1);
    /*
    let trailCopy = allTrails.map((trail) => {
      if(trail.id==trailId) {
        trail.saved=toSave;
      }
      return trail;
    })
    trackStatus(trailCopy);
    console.log(trailCopy);*/
  };

  React.useEffect(() => {
    let setSaveCopy = allTrails.map((trail) => {
      if(trail.id==newTrail) {
        trail.saved=isSaved;
      }
      return trail;
    });
    trackStatus(setSaveCopy);

    let filteredTrails = allTrails.filter((trail) =>
      trail.hasOwnProperty('saved') && trail.saved
    );

    let trailIds = filteredTrails.map((trail) => {
      return trail.id;
    });
    //console.log(trailIds);
    setSave(trailIds);
  }, [saveCount]);

  /*
  React.useEffect(() => {
    if (isSaved) {
      let trailsCopy = [];
      for (let i=0; i< myTrails.length; i++) {
        trailsCopy.push(myTrails[i]);
      }
      trailsCopy.push(newTrail);
      setSave(trailsCopy);
    }
    else {
      let trailsCopy = myTrails.filter((trail) =>
        trail.id !== newTrail
      );
      setSave([].concat(trailsCopy));
    }
  }, [saveCount]);
  */

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
      <header className="jumbotron jumbotron-fluid bg-dark text-white">
            <div className="container">
              <h1>Trail Finder and Traffic in Seattle</h1>
              <p className="lead">If you are looking for a trail with low traffic, use our website
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
              <Route path="/AboutTrail/:trailname"  render={() => <AboutTrail info={props.info}/>} />
              <Route path="/SavedTrails" render={() => <SavedTrails info={props.info} saved={myTrails}  />}/>
              <Redirect to="/"/>
            </Switch>
          </div>
        </div>
      </main>


      <footer className="container">
        <small>&#169; Website created by Midori Komi and Shruti Kompella </small>
        <small>Data from <a href="https://www.seattle.gov/transportation/projects-and-programs/programs/bike-program/bike-counters?fbclid=IwAR3copSZvbf_CzzlbkfLm_q49LUp1y9djxjn6MyGpeKiZZlq5AAS2ZRdUhc"> Seattle Department of Transportation</a></small>
        <small>Images from <a href ="https://unsplash.com/photos/Fv9fk47HBr4/"> Hannah Reding</a></small>
      </footer>
    </div>
  );
}


function AboutNav() {
  return (
    <nav id="aboutLinks">      
      <ul className="list-unstyled">
        <li><NavLink exact to="/" activeClassName="activeLink">Back to Search</NavLink></li>
        <li><NavLink to="/SavedTrails" activeClassName="activeLink">Saved Trails</NavLink></li>
      </ul>
    </nav>
  );
}


export function TrailCard(props) {
  let imgSrc = 'img/'+props.trail.image;
  let imgAlt = props.trail.trailName + " image";
  //console.log(props);
  // states const for setting the save
  
  const [buttonText, setButtonText] = useState("Save"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
  const [redirectTo, setRedirectTo] = useState(undefined);

  const handleClick = () => {
    setRedirectTo(props.trail.trailName);
    //console.log("you clicked", props.trail.trailName); // for testing purposes
  }

  if(redirectTo !== undefined) {
    return <Redirect push to={"/AboutTrail/" + redirectTo }/>
  }

  // When save button is clicked, toggles it visually
  // also changes the actual "saved" or not information
  
    const handleSaveClick = () => {
      if(buttonText === "Unsave" ) {
        console.log('unsave has been clicked');
        props.saveCallback(props.trail.id, false);
        setButtonText("Save");
      } else {
        console.log('save has been clicked');
        props.saveCallback(props.trail.id, true);
        setButtonText("Unsave");
      }
      
      console.log("you handled the save click")
      console.log(props.trail.favorite);
    }

    /*
    const handleSaveClick = () => {
      //console.log(props.statusCallback(props.trail.id));
      //if(props.statusCallback(props.trail.id)) {
      if(props.trail.hasOwnProperty('saved') && props.trail.saved) {
        console.log('save has been clicked');
        props.saveCallback(props.trail.id, true);
        console.log(props.trail.saved);
        setButtonText("Unsave");        
      } else {
        console.log('unsave has been clicked');
        props.saveCallback(props.trail.id, false);
        console.log(props.trail.saved);
        setButtonText("Save");
      }
    }*/


  return (    
    <div key={props.trail.trailName} className="card">
      <img className="card-img-top" src={imgSrc} alt={imgAlt} />
      <div className="card-body">
        <h3 className="card-title">{props.trail.trailName}</h3>
        <p className="card-text">{props.trail.address}</p>
        <Button onClick = {handleClick} size="medium" color="primary">More Information</Button>
        <Button onClick = {handleSaveClick} size="medium" color="primary">{buttonText}</Button>
      </div>
    </div>
  );
}

export function TrailList(props) {
  let deck = props.trails.map((trail) => {
    let trailCard = <TrailCard key={trail.trailName} trail={trail} saveCallback={props.saveCallback} statusCallback={props.statusCallback} />;
    return trailCard;
  });

  return (
    <div id="trailList" className="col-9">  
      <h2>Trails to Visit in the Greater Seattle Area</h2>
      <div className="card-deck">
        {deck}
      </div>
    </div>
  );
}



export default App;
