import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';


function AboutTrail(props) {

  let ourTrailName = ''; //REPLACE THIS WITH CORRECT VALUE
  const urlParams = useParams();
  ourTrailName = urlParams.trailname;
  // ourTrailName works and is correct


  //this lodash doens't work
  //let ourTrail =  _.find(props.info, {trailName: ourTrailName});


  let ourTrail = undefined;

  /*
  for(var eachTrail in props.info) {
    console.log("each trail" + eachTrail);
    console.log("each trail name" + props.info[eachTrail].trailName);
    if(props.info[eachTrail].trailName == ourTrailName) {
      console.log("does it even");
      ourTrail = props.info[trailName];
    }

  }*/
  for(var i = 0; i < Object.keys(props.info).length; i++) {
    if(props.info[i].trailName==ourTrailName)
      ourTrail = props.info[i];
  }

  console.log("ourTrailName is: " +  ourTrailName);
  console.log("information is: " + ourTrail.zipcode);
  


  


  return (
    <div>

      <h2>Wow it's the trail info page for {urlParams.trailname}.</h2>
      {/*<h2>Wow it's information:  {ourTrail.zipcode}.</h2>*/}

    </div>
  );
}

export default AboutTrail;