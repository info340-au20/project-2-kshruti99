import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';


function AboutTrail(props) {

  let ourTrailName = ''; //REPLACE THIS WITH CORRECT VALUE
  const urlParams = useParams();
  ourTrailName = urlParams.trailname;

  let ourTrail =  _.find(props.info, {trailName: ourTrailName});
  
  console.log("ourTrail is: " + urlParams.trailname);
  console.log("information is: " + ourTrail.zipcode);
  


  


  return (
    <div>

      <h2>Wow it's the trail info page for {urlParams.trailname}.</h2>

    </div>
  );
}

export default AboutTrail;