import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


function SavedTrails(props) {
  const [savedTrails, setSavedTrails] = useState([]);

  
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
        let myTrails = theTrailsArr.filter((oneSavedTrail) => 
          oneSavedTrail.userId===props.currentUser.uid
        );
        setSavedTrails(myTrails);
      }
      else setSavedTrails([]);
    })
  }, [props.currentUser.uid])

  if(savedTrails.length===0) {
    return (
      <div>
        <h2>Here are your saved trails!</h2>
      </div>
    );
  }

  let cardDeck = savedTrails.map((trailObj) => {
    //console.log(trail);
    let trail = trailObj.savedTrail;
    let imgSrc = 'img/'+trail.image;
    let imgAlt = trail.trailName + " image";
    return (    
      <div key={trail.trailName} className="card">
        <img className="card-img-top" src={imgSrc} alt={imgAlt} />
        <div className="card-body">
          <h3 className="card-title">{trail.trailName}</h3>
          <p className="card-text">{trail.address}</p>
        </div>
      </div>
    );
  });

  return (
    <div>

      <h2>Here are your saved trails!</h2>
      <div className="card-deck">
        {cardDeck}
      </div>
    </div>
  );
}



export default SavedTrails;