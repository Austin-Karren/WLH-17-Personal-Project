import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../ducks/userReducer';
import axios from 'axios';

const Auth = props => {
   console.log(props);
   const [emailInput, setEmailInput] = useState(''),
         [passInput, setPassInput] = useState('');

   const login = () => {
      axios.post('/auth/login', {email: emailInput, password: passInput})
      .then(res => {
         props.getUser(res.data);
         props.history.push('/');
      }).catch(err => {
         console.log(err);
         alert('Incorrect email or password.')
      })
   }


   // import {logoutUser} from '../ducks/userReducer';
   // const registerAdmin = () => {
   //    axios.post('/auth/register-admin', {email: emailInput, password: passInput})
   //    .then(res => {
   //       props.getUser(res.data);
   //       props.history.push('/');
   //    }).catch(err => {
   //       console.log(err);
   //       alert('Unable to register user.');
   //    });
   // }

   return (
      <div className='Auth'>

      </div>
   )
}

export default connect(null, {getUser})(Auth);