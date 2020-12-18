import React, {useEffect, useState } from 'react'; //import React Component
import{Redirect} from 'react-router-dom';
import { Button } from 'reactstrap';
import firebase from 'firebase/app';

function TrailCard(props) {
    let imgSrc = 'img/'+props.trail.image;
    let imgAlt = props.trail.trailName + " image";
    
    const [buttonText, setButtonText] = useState("Save"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
    const [redirectTo, setRedirectTo] = useState(undefined);
    const [bookedTrails, setBookedTrails] = useState([]);


//----------------------setting the initial button text correctly------------------------
    let isTrailSaved = false;

    console.log('curr user: ');//+props.currentUser.uid);
    console.log('bookedTrails:'+bookedTrails.length);

    for(let i=0; i<bookedTrails.length; i++) {
      if(bookedTrails[i].userId===props.currentUser.uid && bookedTrails[i].savedTrail.id===props.trail.id) {
        isTrailSaved=true;
      }
    }     

    if (isTrailSaved) {
      setButtonText("Unsave");
    }
    else {
      setButtonText("Save");
    }
//------------------------------------






    useEffect(() => {    
        const savedTrailsRef = firebase.database().ref('trails')
        savedTrailsRef.on('value', (snapshot) => {
          const theTrailsObj = snapshot.val()
          if(theTrailsObj!=null) {
            let trailsKeyArr = Object.keys(theTrailsObj);
            let theTrailsArr = trailsKeyArr.map((key) => {
              let trailKeyObj = theTrailsObj[key]
              trailKeyObj.key = key
              return trailKeyObj;
            })
            setBookedTrails(theTrailsArr);
          }
          else setBookedTrails([]);
        })
      }, [])
  
    const handleClick = () => {
      setRedirectTo(props.trail.trailName);
    }
  
    if(redirectTo !== undefined) {
      return <Redirect push to={"/AboutTrail/" + redirectTo }/>
    }
  
    // When save button is clicked, toggles it visually
    // also changes the actual "saved" or not information  
    const handleSaveClick = () => {
        let isTrailSaved = false;
        let theKey = null;
          
        console.log('before ref when clicked');
  
        /* savedTrailsRef.on('value', (snapshot) => {
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
        }); */
            
  
        console.log('curr user: ');//+props.currentUser.uid);
        console.log('bookedTrails:'+bookedTrails.length);
  
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
          console.log('unsave the trail: '+trailDelete);
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
}

export default TrailCard;