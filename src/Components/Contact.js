import withRoot from './Theme/withRoot';
import React, {useState, useEffect} from 'react';
import AppNavbar from './Views/AppNavbar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from './Custom/Typography';
import AppFooter from './Views/AppFooter';
import AppForm from './Form/AppForm';
import { email, required } from './Form/validation';
import RFTextField from './Form/RFTextField';
import FormButton from './Form/FormButton';
import FormFeedback from './Form/FormFeedback';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
   form: {
     marginTop: theme.spacing(6),
   },
   button: {
     marginTop: theme.spacing(3),
     marginBottom: theme.spacing(2),
   },
   feedback: {
     marginTop: theme.spacing(2),
   },
 }));

const Contact = props => {
   const classes = useStyles();
   const [sent, setSent] = useState(false);
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [interest, setInterest] = useState('');

   const validate = (values) => {
      // const errors = required(['firstName', 'lastName', 'email', 'password'], values);
      // if (!errors.email) {
      //   const emailError = email(values.email, values);
      //   if (emailError) {
      //     errors.email = email(values.email, values);
      //   }
      // }
      // return errors;
    };

   const handleSubmit = () => {
      axios.post('api/email', {firstName, lastName, email, interest})
      .then(() => {
         console.log('email sent');
      })
      .catch(err => console.log(err));
      setFirstName('');
      setLastName('');
      setEmail('');
      setInterest('');
    };

   //  useEffect(() => {
   //    console.log(firstName);
   //  }, [firstName])

   return(
      <div>
         <AppNavbar />
         <AppForm>
            <React.Fragment>
               <Typography variant="h3" gutterBottom marked="center" align="center">
                  Contact Me
               </Typography>
               {/* <Typography variant="body2" align="center">
                  <Link href="/premium-themes/onepirate/sign-in/" underline="always">
                  Already have an account?
                  </Link>
               </Typography> */}
            </React.Fragment>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <TextField 
                        variant='outlined'
                        label='First name'
                        required
                        fullWidth
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField 
                        variant='outlined'
                        fullWidth
                        label="Last name"
                        name="lastName"
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                     />
                  </Grid>
               </Grid>
               <TextField 
                  style={{marginTop: '1.5em'}}
                  variant='outlined'
                  fullWidth
                  label="Email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
               <TextField 
                  style={{marginTop: '1.5em'}}
                  fullWidth
                  required
                  name="password"
                  autoComplete="current-password"
                  label="What photo session are you interested in?"
                  variant='outlined'
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
               />
               <FormButton
                  onClick={handleSubmit}
                  className={classes.button}
                  color="secondary"
                  fullWidth
               >
                  {'Submit'}
               </FormButton>
            </AppForm>
         <AppFooter />
      </div>
   )
}

export default withRoot(Contact);