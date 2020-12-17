
import React, { useEffect, useState } from 'react'; //import React Component
import{ Route , Switch, Redirect, NavLink} from 'react-router-dom';
import AboutTrail from './AboutTrail';
import SavedTrails from './SavedTrails';
import TrailList from './TrailList';
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
  const [trailZip, setZipInp] = useState("");
  const [trailResults, getTrailResults] = useState([]);
  const [user, setUser] = useState(undefined);

  //error handling and making a spinner for loading
  //const [errorMessage, setErrorMessage] = useState(undefined);
  //const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) {
        setUser(firebaseUser)
        //setIsLoading(false)
      }
      else {
        setUser(null)
      }
    })
  })

  /*spinner and handling sign out with errors
  const handleSignOut = () => {
    setErrorMessage(null); //clear any old errors
    firebase.auth().signOut()
  }
  
  if(isLoading) {
    return (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
      </div>
    )
  }*/

  //function which renders list of trails that fit search criteria or all trails when nothing is typed
  const renderTrailList = (renderProps) => <TrailList {...renderProps} trails={trailResults} user={user} />

  const searchTyped = e => {
    setZipInp(e.target.value);
  };
  useEffect(() => {
    const trailResults = props.info.filter(trail =>
      (trail.zipcode+'').indexOf(''+trailZip) > -1
    );
    getTrailResults(trailResults);
  }, [trailZip, props.info]);

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
                <Route path="/SavedTrails" render={() => <SavedTrails info={props.info}  />}/>
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


/*
export function TrailCard(props) {
  let imgSrc = 'img/'+props.trail.image;
  let imgAlt = props.trail.trailName + " image";
  
  const [buttonText, setButtonText] = useState("Save"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
  const [redirectTo, setRedirectTo] = useState(undefined);
  //const [bookedTrails, setBookedTrails] = useState([]);

  const handleClick = () => {
    setRedirectTo(props.trail.trailName);
  }

  if(redirectTo !== undefined) {
    return <Redirect push to={"/AboutTrail/" + redirectTo }/>
  }

  // When save button is clicked, toggles it visually
  // also changes the actual "saved" or not information  
    const handleSaveClick = () => {
      let bookedTrails=[];
      const savedTrailsRef = firebase.database().ref('trails');
      let isTrailSaved = false;
      let theKey = null;
        
        //console.log('before ref');

      savedTrailsRef.on('value', (snapshot) => {
        const theTrailsObj = snapshot.val()
            
        if(savedTrailsRef!=null) {
          console.log('trails ref has stuff');
          let trailsKeyArr = Object.keys(theTrailsObj);
          let theTrailsArr = trailsKeyArr.map((key) => {
            let trailKeyObj = theTrailsObj[key];
            trailKeyObj.key = key;
            //console.log(trailKeyObj.userName);
            return trailKeyObj;
          });
              
          bookedTrails=[];
          for(let i=0; i<theTrailsArr.length; i++) {
            //console.log(theTrailsArr[i].savedTrail.trailName);
            bookedTrails.push(theTrailsArr[i]);
            //console.log("hello");
          }
        }            
        //console.log('done putting stuff into list');
      });
          

      //console.log('curr user: ');//+props.currentUser.uid);
      //console.log('bookedTrails:'+bookedTrails.length);

      //loop through database to check if the current trail has already been added
      //if it has, delete it
      //if it hasn't add it to the database
      for(let i=0; i<bookedTrails.length; i++) {
        console.log('looping through array');
        console.log(bookedTrails[i].savedTrail.trailName);
        if(bookedTrails[i].userId===props.currentUser.uid && bookedTrails[i].savedTrail.id===props.trail.id) {
          isTrailSaved=true;
          theKey = bookedTrails[i].key;
        }
      }     

      if (isTrailSaved) {//when you unsave a trail
        const trailDelete = firebase.database().ref('trails/'+theKey);
        setButtonText("Save");
        trailDelete.remove()
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

  //render individual card for one trail
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
}*/

/*
export function TrailList(props) {
  //map all trails into array of trail cards
  let deck = props.trails.map((trail) => {
    let trailCard = <TrailCard key={trail.trailName} currentUser={props.user} trail={trail} />;
    return trailCard;
  });

  //insert list of cards into a div return
  return (
    <div id="trailList" className="col-12">  
      <h2>Trails to Visit in the Greater Seattle Area</h2>
      <div className="card-deck">
        {deck}
      </div>
    </div>
  );
}
*/



export default App;
