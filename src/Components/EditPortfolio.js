import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../ducks/userReducer';
import { applyMiddleware } from 'redux';
import axios from 'axios';

const Edit = props => {
   console.log(props);
   const logout = () => {
      axios.get('/auth/logout')
      .then(props.history.push('/'))
   }

   return (
      <div className='EditPage'>
         Edit Page
      </div>
   )
}
// const mapStateToProps 
export default connect(null, {logoutUser})(Edit);