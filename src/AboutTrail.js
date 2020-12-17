import React from 'react';
import { useParams } from 'react-router-dom';


function AboutTrail(props) {

  let ourTrailName = ''; //REPLACE THIS WITH CORRECT VALUE
  const urlParams = useParams();
  ourTrailName = urlParams.trailname;
  // ourTrailName works and is correct

  let ourTrail = undefined;

  for(var i = 0; i < Object.keys(props.info).length; i++) {
    if(props.info[i].trailName===ourTrailName)
      ourTrail = props.info[i];
  }

  return (
    <div>
      <h2>{urlParams.trailname}</h2>
      {/*<h2>Wow it's information:  {ourTrail.zipcode}.</h2>*/}
      <p>{ourTrail.description}</p>
    </div>
  );
}

export default AboutTrail;