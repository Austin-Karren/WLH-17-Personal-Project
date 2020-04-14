// Displays all albums that belong in collection
import React, {useState, useEffect} from 'react';

const Collection = props => {
   return (
      <div className='Collection'>
         Collection Component {props.match.params.id}
      </div>
   )
}

export default Collection;