import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';

const useStyles = makeStyles({
   root: {
      maxWidth: 345,
   }
});

const CollectionCard = props => {
   const classes = useStyles;
   // title, description, cover_photo, author_id

   const addAlbumToCollection = () => {
      const {collection_id, album_id} = props;
      console.log(props);
      Axios.post('/api/collection/album', {collection_id, album_id})
      .then(() => {
         alert(`Album added to collection`)
      })
      .catch(err => console.log(err));
   }

   return (
      <Card 
         className={classes.root}
         onClick={addAlbumToCollection}
      >
         <CardMedia 
            component='img'
            alt='cover photo'
            height='150'
            image={props.url}
            title={props.title}
         />
         <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
               {props.title}
            </Typography>
            <Typography variant='body1' color='textSecondary' component='p'>
               {props.description}
            </Typography>
         </CardContent>
      </Card>
   )
}

export default withRouter(CollectionCard);