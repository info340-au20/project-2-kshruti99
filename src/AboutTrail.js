import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';


function AboutTrail(props) {

  let ourTrail = ''; //REPLACE THIS WITH CORRECT VALUE
  const urlParams = useParams();
  ourTrail = urlParams.trailName;
  console.log(ourTrail);


  //find the trail from the json file for trail information

  //find trailInfo from thei

  return (
    <div>

      <h2>Wow it's the trail info page for {ourTrail}.</h2>

    </div>
  );
}

export default AboutTrail;