import React, { Component } from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

const withRoot = (Component) => {
   const WithRoot = props => {
      return (
         <ThemeProvider theme={theme} >
            <CssBaseline />
            <Component {...props} />
         </ThemeProvider>
      );
   }
   return WithRoot;
}

export default withRoot;