import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles({
   root: {
      maxWidth: 345,
   }
});

const CollectionCard = props => {
   const classes = useStyles;
   // title, description, cover_photo, author_id

   const editCollection = () => {
      props.history.push(`edit/collection/${props.id}`)
   }

   return (
      <Card 
         className={classes.root}
         onClick={editCollection}
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
         </CardContent>
      </Card>
   )
}

export default withRouter(CollectionCard);