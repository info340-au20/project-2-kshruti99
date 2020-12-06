import React from 'react';
import { Button } from 'reactstrap';
import _ from 'lodash';
import { useParams } from 'react-router-dom';


function AboutTrail(props) {

  return (
    <div>
      <h2>Wow it's the trail info page.</h2>
      <Button disabled size="large" color="primary">Look a Button</Button>
    </div>
  );
}

export default AboutTrail;