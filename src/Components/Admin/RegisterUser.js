import React, {useState} from './node_modules/react';
import {connect} from './node_modules/react-redux';
import {getUser} from '../../ducks/userReducer';
import axios from './node_modules/axios';

const NewUser = props => {
   console.log(props);
   const [emailInput, setEmailInput] = useState(''),
         [passInput, setPassInput] = useState('');

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