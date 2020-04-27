import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../App.css';
import withRoot from '../Theme/withRoot';
import Grid from '@material-ui/core/Grid';
import AddToCollectionCard from './AddToCollectionCard';
import {makeStyles} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
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
      <div>
         <header>
            <Button
               onClick={props.history.goBack}
               size='medium'
               variant='contained'
               style={{position: 'absolute', left: '1.5em'}}
            > {'< Back'} 
            </Button>
            <Typography variant='h5'>
               Add Album to collection
            </Typography>
         </header>
         <Container 
            maxWidth='md'
            style={{
               padding: '3em 2.5em'
            }}
         >
            <Grid container spacing={8}>
               {collections.map((collection) => (
                  <Grid item xs={12} sm={6} lg={4} xl={3} spacing={3}>
                     <AddToCollectionCard 
                        key={collection.collection_id}
                        collection_id={collection.collection_id}
                        url={collection.featured_photo}
                        title={collection.title}
                        description={collection.description}
                        album_id={+props.match.params.id}
                     />
                  </Grid>
               ))}
            </Grid>
         </Container>
      </div>
   )

}

export default withRouter(withRoot(CollectionGrid));