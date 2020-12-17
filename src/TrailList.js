import React from 'react';
import TrailCard from './TrailCard';

function TrailList(props) {
    //map all trails into array of trail cards
    let deck = props.trails.map((trail) => {
      let trailCard = <TrailCard key={trail.trailName} currentUser={props.user} trail={trail} />;
      return trailCard;
    });
  
    //insert list of cards into a div return
    return (
      <div id="trailList" className="col-12">  
        <h2>Trails to Visit in the Greater Seattle Area</h2>
        <div className="card-deck">
          {deck}
        </div>
      </div>
    );
}

export default TrailList;