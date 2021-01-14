import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../App.css';
import withRoot from '../Theme/withRoot';
import Grid from '@material-ui/core/Grid';
import AlbumPhoto from './AlbumPhoto';
import {makeStyles} from '@material-ui/core';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
}));

const PhotoGrid = props => {
   const [photos, setPhotos] = useState([]);
   const [IdArray, setIdArray] = useState([])
   const classes = useStyles();

   useEffect(() => {
      axios.get(`/api/album/photos/${props.match.params.id}`)
      .then(res => {
         setIdArray(res.data);
      })
      .catch(err => console.log(err));
   }, []);

   useEffect(() => {  
      IdArray.map((element, index) => {
         axios.get(`/api/photo/${element.photo_id}`)
         .then(res => {
            // photos.push(res.data[0]);
            setPhotos(photos => [...photos, res.data[0]]);
         })
      })
   }, [IdArray]);
   
   return(
      <div className={classes.root}>
         <Grid container spacing={8}>
            {photos.map((photo) => (
               <Grid item xs={12} sm={6} lg={4} xl={3} spacing={3}>
                  <AlbumPhoto 
                     key={photo.photo_id}
                     id={photo.photo_id}
                     url={photo.image}
                     title={photo.title}
                     description={photo.description}
                  />
               </Grid>
            ))}
         </Grid>
      </div>
   )

}

export default withRouter(withRoot(PhotoGrid));