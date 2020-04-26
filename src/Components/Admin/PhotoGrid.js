import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../App.css';
import withRoot from '../Custom/withRoot';
import Grid from '@material-ui/core/Grid';
import Photo from './Photo';
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
   const classes = useStyles();

   useEffect(() => {
      axios.get('/api/photos')
      .then(res => {
         setPhotos(res.data);
      })
      .catch(err => console.log(err));
   }, []);

   return(
      <div className={classes.root}>
         <Grid container spacing={8}>
            {photos.map((photo) => (
               <Grid item xs={12} sm={6} lg={4} xl={3} spacing={3}>
                  {/* {console.log(photo)} */}
                  <Photo 
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