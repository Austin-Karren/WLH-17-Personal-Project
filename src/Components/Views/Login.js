import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/userReducer';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import MuiBar from '@material-ui/core/AppBar';

const useStyles = makeStyles({
   root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '1em 0em'
   }
})

const Auth = props => {
   const [emailInput, setEmailInput] = useState(''),
         [passInput, setPassInput] = useState('');
         // [classes] = useState(useStyles); // breaks the code don't do this
         const classes = useStyles();

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

   const resetInputs = () => {
      setEmailInput('');
      setPassInput('');
      // console.log(emailInput, passInput)
   }

   return (
      <Container maxWidth='xs'>
         <Box style={{margin: '3.5em 0em', padding: '4.5em 0em', borderRadius: '20px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.25)'}}>
            <Typography variant='h4' style={{margin: '0em 0em .5em', textTransform: "uppercase"}}>Login</Typography>
            {/* <Typography variant='caption'>Login to edit portfolio</Typography> */}
            <Box classes={{
               root: classes.root
            }}>
               <Input 
                  value={emailInput}
                  placeholder='Email'
                  onChange={e => setEmailInput(e.target.value)}
                  type='email'
                  variant='contained'
               />
               <Input 
                  value={passInput}
                  placeholder='Password'
                  onChange={e => setPassInput(e.target.value)}
                  type='password'
               />
            </Box>
            <Box style={{margin: '1em 0em'}}>
               <Button 
                  onClick={resetInputs} 
                  size='large' 
                  style={{margin: '0em .25em'}}
               > 
                  Cancel 
               </Button>
               <Button 
                  onClick={login} 
                  size='large' 
                  style={{margin: '0em .25em'}}
                  variant='contained'
                  color='primary'
               > 
                  Login 
               </Button>
            </Box>
         </Box>
      </Container>
   )
}

export default connect(null, {getUser})(Auth);