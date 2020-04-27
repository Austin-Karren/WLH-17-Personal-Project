import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../App.css';
import withRoot from '../Theme/withRoot';
import Grid from '@material-ui/core/Grid';
import CollectionCard from './CollectionCard';
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

const CollectionGrid = props => {
   const [collections, setCollections] = useState([]);
   const classes = useStyles();

   useEffect(() => {
      axios.get('/api/collections')
      .then(res => {
         setCollections(res.data);
      })
      .catch(err => console.log(err));
   }, []);

   return(
      <div className={classes.root}>
         <Grid container spacing={8}>
            {collections.map((collection) => (
               <Grid item xs={12} sm={6} lg={4} xl={3} spacing={3}>
                  <CollectionCard 
                     key={collection.collection_id}
                     id={collection.collection_id}
                     url={collection.featured_photo}
                     title={collection.title}
                     description={collection.description}
                  />
               </Grid>
            ))}
         </Grid>
      </div>
   )

}

export default withRouter(withRoot(CollectionGrid));