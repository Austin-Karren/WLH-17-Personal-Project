import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../../ducks/userReducer';
import axios from 'axios';
import '../../App.css';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import withRoot from '../Custom/withRoot';
import {makeStyles} from '@material-ui/core';
import PhotoGrid from './PhotoGrid';
import AlbumGrid from './AlbumGrid';
import CollectionGrid from './CollectionGrid';

const useStyles = makeStyles((theme) => ({
   root: {
     display: 'flex',
     justifyContent: 'center',
     flexGrow: 1,
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
 }));

const Edit = props => {
   const classes = useStyles();

   const logout = () => {
      axios.get('/auth/logout')
      .then(props.history.push('/login'))
   }

   const addPhoto = () => {
      props.history.push('/add/photo');
   }

   const addAlbum = () => {
      props.history.push('/add/album')
   }

   const addCollection = () => {
      props.history.push('/add/collection');
   }

   return (
      <div className='EditPage'>
         <header className='logout-header'>
            <Typography variant='h5'>
               Your Portfolio
            </Typography>
            <Button 
               onClick={logout}
               size='medium'
               variant='contained'
               style={{position: 'absolute', right: '1.5em'}}
            > logout
            </Button>
         </header>
         <Container maxWidth='md'>
            <Typography variant='h6' style={{margin: '3em 0em 1em'}}>
               Collections
            </Typography>
            <Button variant='contained' onClick={addCollection}>
               Create Collection
            </Button>
            <Container 
               maxWidth='md'
               style={{
                  padding: '3em 2em'
               }}
            >
            <CollectionGrid />
         </Container>
         </Container>
         <Container maxWidth='md'>
            <Typography variant='h6' style={{margin: '3em 0em 1em'}}>
               Albums
            </Typography>
            <Button variant='contained' onClick={addAlbum}>
               Create Album
            </Button>
            <Container 
               maxWidth='md'
               style={{
                  padding: '3em 2em'
               }}
            >
            <AlbumGrid />
         </Container>
         </Container>
         <Container maxWidth='md'>
            <Typography variant='h6' style={{margin: '3em 0em 1em'}}>
               Photos
            </Typography>
            <Button variant='contained' onClick={addPhoto}>
               Add Photo
            </Button>
         </Container>
         <Container 
            maxWidth='md'
            style={{
               padding: '3em 2em'
            }}
         >
            <PhotoGrid />
         </Container>
      </div>
   )
}
const mapStateToProps = reduxState => {
    const {user} = reduxState.admin;
    return {
       user
    }
}

export default withRoot(connect(mapStateToProps, {logoutUser})(Edit));