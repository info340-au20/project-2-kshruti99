import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';


function AboutTrail(props) {

  //let ourTrailName = ''; //REPLACE THIS WITH CORRECT VALUE
  const urlParams = useParams();

  /*
  let ourTrailName = ''; //REPLACE THIS WITH CORRECT VALUE
  const urlParams = useParams();
  console.log("hi1");
  ourTrailName = urlParams.trailname;
  console.log(ourTrailName);
  console.log("hi2");
  //artificially do this

  */


  //let  ourTrail =  _.find(props.info, {trailName: ourTrailName});

  

  //let ourTrail =  _.find(props.info, {trailName: ourTrailName});
  console.log("ourTrail is: " + urlParams.trailname);


  

  //find the trail from the json file for trail information

  //find trailInfo from thei

  return (
    <div>

      <h2>Wow it's the trail info page for {urlParams.trailname}.</h2>

    </div>
  );
}

export default AboutTrail;