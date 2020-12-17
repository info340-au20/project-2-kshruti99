
import React, { useEffect, useState } from 'react'; //import React Component
import{ Route , Switch, Link, Redirect, NavLink} from 'react-router-dom';
import AboutTrail from './AboutTrail';
import SavedTrails from './SavedTrails';
import { Button } from 'reactstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


//FirebaseUI config
const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  credentialHelper: 'none',
  signInFlow: 'popup',
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};


function App(props) {

  const renderTrailList = (renderProps) => <TrailList {...renderProps} trails={trailResults} saveCallback={handleSavedTrails} statusCallback={checkStatus} user={user} />
  
  const [trailZip, setZipInp] = React.useState("");
  const [trailResults, getTrailResults] = React.useState([]);

  const [myTrails, setSave] = React.useState([]);
  const [newTrail, addTrail] = React.useState(0);
  const [isSaved, changeStatus] = React.useState(false);
  const [saveCount, updateCount] = React.useState(0);
  const [allTrails, trackStatus] = React.useState(props.info);

  const [user, setUser] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) {
        setUser(firebaseUser)
        //setIsLoading(false)
      }
      else {
        setUser(null)
      }
      //console.log("auth state has changed");
    })
  })

  const handleSignOut = () => {
    setErrorMessage(null); //clear any old errors
    firebase.auth().signOut()
  }

  /*
  if(isLoading) {
    return (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
      </div>
    )
  }*/

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

  if (!user) {
    return (
      <div className="container">
        <h1>Sign Up!</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  else {
    return (
      <div>
        <header className="jumbotron jumbotron-fluid bg-dark text-white">
          <div className="container">
            <h1>Trail Finder and Traffic in Seattle</h1>
            <p className="lead">Use our website
                  to get some suggestions for trails near you!
            </p>
          </div>
        </header>
      
        <main className="container">   
          <div className="row">
            <div className="col-3">
              <input
                type="text"
                placeholder="Search"
                value={trailZip}
                onChange={searchTyped}
              />
              <AboutNav />
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
          <small> Data from <a href="https://www.seattle.gov/transportation/projects-and-programs/programs/bike-program/bike-counters?fbclid=IwAR3copSZvbf_CzzlbkfLm_q49LUp1y9djxjn6MyGpeKiZZlq5AAS2ZRdUhc"> Seattle Department of Transportation  </a></small>
          <small>Images from <a href ="https://unsplash.com/photos/Fv9fk47HBr4/"> Hannah Reding</a></small>
        </footer>
      </div>
    );
  }
}


/*
        <nav class="trail">
          <ol>
              <li class="trail"><a href="landing.html"aria-label="Home Page"><span class="logo"></span>Home</a></li>             
              <li class="trail">Search</li>


*/

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


export function TrailCard(props) {
  let imgSrc = 'img/'+props.trail.image;
  let imgAlt = props.trail.trailName + " image";
  //console.log(props);
  // states const for setting the save
  /*
  const saveTrail = (event) => {
    //event.preventDefault();

    const newUserObj = {
      userId: props.currentUser.uid,
      userName: props.currentUser.displayName,
      time: firebase.database.ServerValue.TIMESTAMP,
      savedTrail: props.trail
    }

    const trailsRef = firebase.database().ref('trails')
    trailsRef.push(newUserObj)
  }*/
  
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
        let bookedTrails=[];
        const savedTrailsRef = firebase.database().ref('trails')
        let isTrailSaved = false;
        let theKey = null;
        if (savedTrailsRef!=null) {
          savedTrailsRef.on('value', (snapshot) => {
            const theTrailsObj = snapshot.val()
            let trailsKeyArr = Object.keys(theTrailsObj);
            let theTrailsArr = trailsKeyArr.map((key) => {
              let trailKeyObj = theTrailsObj[key]
              trailKeyObj.key = key
              return trailKeyObj;
            })
            bookedTrails.concat(theTrailsArr);
          })
          
          for(let i=0; i<bookedTrails.length; i++) {
            if(bookedTrails[i].userId===props.currentUser.uid && bookedTrails[i].savedTrail.id==props.trail.id) {
              isTrailSaved=true;
              theKey = bookedTrails[i].key;
            }
          }
        }


      if (isTrailSaved) {//when you unsave a trail
        const trailDelete = firebase.database().ref('trails/'+theKey);
        setButtonText("Save");
        trailDelete.remove()
        //let userRef = this.database.ref('users/' + userId);
      }
      else {//when you save a trail into saved trails
        const trailsRef = firebase.database().ref('trails');
        setButtonText("Unsave");
        const newUserObj = {
          userId: props.currentUser.uid,
          userName: props.currentUser.displayName,
          time: firebase.database.ServerValue.TIMESTAMP,
          savedTrail: props.trail,
        }
        trailsRef.push(newUserObj)
      }
    }

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
    let trailCard = <TrailCard key={trail.trailName} currentUser={props.user} trail={trail} saveCallback={props.saveCallback} statusCallback={props.statusCallback} />;
    return trailCard;
  });

  return (
    <div id="trailList" className="col-12">  
      <h2>Trails to Visit in the Greater Seattle Area</h2>
      <div className="card-deck">
        {deck}
      </div>
    </div>
  );
}



export default App;
