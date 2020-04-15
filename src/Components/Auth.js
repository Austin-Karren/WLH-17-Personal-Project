import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../ducks/userReducer';
import {logoutUser} from '../ducks/userReducer';
import axios from 'axios';

const Auth = props => {
   const [emailInput, setEmailInput] = useState(''),
         [passInput, setPassInput] = useState('');
}

export default connect(null, {getUser})(Auth);