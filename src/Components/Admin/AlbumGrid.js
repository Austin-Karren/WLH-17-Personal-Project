import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../App.css';
import withRoot from '../Theme/withRoot';
import Grid from '@material-ui/core/Grid';
import AlbumCard from './AlbumCard';
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

const AlbumGrid = props => {
   const [albums, setAlbums] = useState([]);
   const classes = useStyles();

   useEffect(() => {
      axios.get('/api/albums')
      .then(res => {
         setAlbums(res.data);
      })
      .catch(err => console.log(err));
   }, []);

   return(
      <div className={classes.root}>
         <Grid container spacing={8}>
            {albums.map((album) => (
               <Grid item xs={12} sm={6} lg={4} xl={3} spacing={3}>
                  <AlbumCard 
                     key={album.album_id}
                     id={album.album_id}
                     url={album.cover_photo}
                     title={album.title}
                     description={album.description}
                  />
               </Grid>
            ))}
         </Grid>
      </div>
   )

}

export default withRouter(withRoot(AlbumGrid));