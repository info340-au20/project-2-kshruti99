import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';


function AboutTrail(props) {

  //let ourTrailName = ''; //REPLACE THIS WITH CORRECT VALUE
  
  const urlParams = useParams();

  
  console.log("ourTrail is: " + urlParams.trailname);
  


  


  return (
    <div>

      <h2>Wow it's the trail info page for {urlParams.trailname}.</h2>

    </div>
  );
}

export default AboutTrail;