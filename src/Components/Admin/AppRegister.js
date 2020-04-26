import React from 'react';
import Typography from '@material-ui/core/Typography';
import Auth from '../Views/Auth';
import Button from '@material-ui/core/Button';
import '../../App.css';

const AppRegister = props => {
   return (
      <React.Fragment>
         <header>
            <Button
               onClick={props.history.goBack}
               size='medium'
               variant='contained'
               style={{position: 'absolute', left: '1.5em'}}
            >
               {'< Back'}
            </Button>
            <Typography variant='h5'>
               Register Another Account
            </Typography>
         </header>
         <Auth />
      </React.Fragment>
   )
}

export default AppRegister;