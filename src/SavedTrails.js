import _ from 'lodash';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


function SavedTrails(props) {


  // should i define the trails here or in apps
  // or maybe just do the information processing overthere and set the display of the button here as none
  //console.log(props);

  /*
  let savedTrails = props.info.filter((trail) =>
    props.saved.includes(trail.id)
  );
  */
  /*
  let cardDeck = savedTrails.map((trail) => {
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
  });*/

  const [savedTrails, setSavedTrails] = useState([]);

  useEffect(() => {
    const savedTrailsRef = firebase.database().ref('trails')
    savedTrailsRef.on('value', (snapshot) => {
      const theTrailsObj = snapshot.val()
      let trailsKeyArr = Object.keys(theTrailsObj);
      let theTrailsArr = trailsKeyArr.map((key) => {
        let trailKeyObj = theTrailsObj[key]
        trailKeyObj.key = key
        return trailKeyObj;
      })
      setSavedTrails(theTrailsArr);
    })
  }, [])

  let cardDeck = savedTrails.map((trail) => {
    let imgSrc = 'img/'+trail.image;
    let imgAlt = trail.trailName + " image";
    return (    
      <div key={trail.key} className="card">
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