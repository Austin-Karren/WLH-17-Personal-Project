import React from 'react';
import Typography from '@material-ui/core/Typography';
import Login from './Views/Login';
import '../App.css'

const AppLogin = props => {
   return (
      <React.Fragment>
         <header className='information-header'>
            <Typography variant='h5'>
               Login to edit portfolio
            </Typography>
         </header>
         <Login />
      </React.Fragment>
   )
}

export default AppLogin;