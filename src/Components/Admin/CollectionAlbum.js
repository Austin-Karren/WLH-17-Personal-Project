import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
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

   const removeAlbum = () => {
      //add remove album code here
      Axios.delete(`/api/collection/album/${props.id}`)
      .then(() => {
         alert('Album will be removed');
         //Do something to refresh page?
      })
      .catch(err => {
         console.log(err);
         alert('Unable to remove photo');
      });
   }

   return (
      <Card 
         className={classes.root}
         onClick={removeAlbum}
      >
         <CardMedia 
            component='img'
            alt='cover photo'
            height='140'
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
            <CardActionArea>
               <CardActions>
                  <Button 
                     onClick={removeAlbum}
                     size='small'
                     color='primary'
                  >
                     Remove
                  </Button>
               </CardActions>
            </CardActionArea>
         </CardContent>
      </Card>
   )
}

export default withRouter(CollectionCard);