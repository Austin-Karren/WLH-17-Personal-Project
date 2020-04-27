import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../Custom/AppBar';
import Toolbar, {styles as toolbarStyles} from '../Custom/Toolbar';

const styles = (theme) => ({
   title: {
     fontSize: 24,
   },
   placeholder: toolbarStyles(theme).root,
   toolbar: {
     justifyContent: 'space-between',
   },
   left: {
     flex: 1,
   },
   leftLinkActive: {
     color: theme.palette.common.white,
   },
   right: {
     flex: 1,
     display: 'flex',
     justifyContent: 'flex-end',
   },
   rightLink: {
     fontSize: 14,
     color: theme.palette.common.white,
     marginLeft: theme.spacing(3),
   },
   leftLink: {
     fontSize: 14,
     color: theme.palette.common.white,
     marginRight: theme.spacing(3),
   },
   linkSecondary: {
     color: theme.palette.secondary.main,
   },
});

const AppNavbar = props => {
   const {classes} = props;

   const goHome = () => {
      props.history.push('/');
   }

   const goToAbout = () => {
      props.history.push('/about');
   }

   const goToPortfolio = () => {
      props.history.push('/portfolio')
   }

   const goToContact = () => {
      props.history.push('/contact')
   }

   return (
      <div>
         <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
               <div className={classes.left}>
                  <Link
                     color="inherit"
                     variant="h6"
                     underline="none"
                     className={classes.leftLink}
                     onClick={goHome}
                     >
                     {'Home'}
                  </Link>
                  <Link
                     variant='h6'
                     underline='none'
                     className={classes.leftLink}
                     onClick={goToAbout}
                  >
                     {'About'}
                  </Link>
               </div>
                  {/* put logo here? */}
               <div className={classes.right}>
                  <Link
                     color="inherit"
                     variant="h6"
                     underline="none"
                     className={classes.rightLink}
                     onClick={goToPortfolio}
                     >
                     {'Photos'}
                  </Link>
                  <Link
                     variant='h6'
                     underline='none'
                     className={classes.rightLink}
                     onClick={goToContact}
                  >
                  {'Contact'}
               </Link>
               </div>
            </Toolbar>
         </AppBar>
      </div>
   )
}



export default withRouter(withStyles(styles)(AppNavbar));