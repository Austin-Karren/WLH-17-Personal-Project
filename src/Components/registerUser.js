import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../ducks/userReducer';
import axios from 'axios';

const NewUser = props => {
   console.log(props);
   const [emailInput, setEmailInput] = useState(''),
         [passInput, setPassInput] = useState(''),
         [toggleAdmin, setToggleAdmin] = useState(false);

   const registerAdmin = () => {
      axios.post('/auth/register-admin', {email: emailInput, password: passInput})
      .then(res => {
         props.getUser(res.data);
         props.history.push('/');
      }).catch(err => {
         console.log(err);
         alert('Unable to register user.');
      });
   }

   return (
      <div className='NewUser'>

      </div>
   )
}

export default connect(null, {getUser})(NewUser);