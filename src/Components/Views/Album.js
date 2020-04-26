//displays all photos that belong in an album
import React from 'react';

const Album = props => {
   return (
      <div className='Album'>
         Album Component {props.match.params.id}
      </div>
   );
}

export default Album;