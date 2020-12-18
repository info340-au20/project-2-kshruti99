import React, { useEffect, useState } from 'react'; //import React Component
import{ Route , Switch, Redirect} from 'react-router-dom';
import AboutTrail from './AboutTrail';
import SavedTrails from './SavedTrails';
import TrailList from './TrailList';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import AboutNav from './AboutNav';
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
  const [trailZip, setZipInp] = useState("");
  const [trailResults, getTrailResults] = useState([]);
  const [user, setUser] = useState(undefined);

  //error handling and making a spinner for loading
  //const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) {
        setUser(firebaseUser)
        setIsLoading(false)
      }
      else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return function cleanup() {
      authUnregisterFunction();
    }
  }, []);

  useEffect(() => {
    const trailResults = props.info.filter(trail =>
      (trail.zipcode+'').indexOf(''+trailZip) > -1
    );
    getTrailResults(trailResults);
  }, [trailZip, props.info]);

  //spinner and handling sign out with errors
  const handleSignOut = () => {
    //setErrorMessage(null); //clear any old errors
    firebase.auth().signOut()
  }
  

  if(isLoading) {
    return (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
      </div>
    )
  }

  //function which renders list of trails that fit search criteria or all trails when nothing is typed
  const renderTrailList = (renderProps) => <TrailList {...renderProps} trails={trailResults} user={user} />

  const searchTyped = e => {
    setZipInp(e.target.value);
  };

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
              <AboutNav signOutCallback={handleSignOut} />
            </div>
            <div className="col-9">
              <Switch>
                <Route exact path="/" render={renderTrailList}/>
                <Route path="/AboutTrail/:trailname"  render={() => <AboutTrail info={props.info}/>} />
                <Route path="/SavedTrails" render={() => <SavedTrails info={props.info} currentUser={user}  />}/>
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

export default App;
