import React, {useState, useEffect} from 'react';
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

const AlbumCard = props => {
   const classes = useStyles;
   const [albumAuthor, setAlbumAuthor] = useState('');
   // title, description, cover_photo, author_id

   useEffect(() => {
      Axios.get(`/api/album/author/${props.id}`)
      .then(res => {
         // console.log(res.data[0]);
         setAlbumAuthor(`${res.data[0].first_name} ${res.data[0].last_name}`)
      })
      .catch(err => console.log(err));
   }, [])

   const editAlbum = () => {
      props.history.push(`edit/album/${props.id}`)
   }

   return (
      <Card 
         className={classes.root}
         onClick={editAlbum}
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
            <Typography gutterBottom variant='subtitle2' component='h3'>
               {`By ${albumAuthor}`}
            </Typography>
         </CardContent>
      </Card>
   )
}

export default withRouter(AlbumCard);