import React, {useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router-dom';

const styles = (theme) => ({
   root: {
     marginTop: theme.spacing(2),
     marginBottom: theme.spacing(4),
   },
   images: {
     marginTop: theme.spacing(8),
     display: 'flex',
     flexWrap: 'wrap',
   },
   imageWrapper: {
     position: 'relative',
     display: 'block',
     padding: 0,
     borderRadius: 0,
     height: 180,
     [theme.breakpoints.down('xs')]: {
       width: '100% !important',
       height: 200,
     },
     '&:hover': {
       zIndex: 1,
     },
     '&:hover $imageBackdrop': {
       opacity: 0.15,
     },
     '&:hover $imageMarked': {
       opacity: 0,
     },
     '&:hover $imageTitle': {
       border: '4px solid currentColor',
     },
   },
   imageButton: {
     position: 'absolute',
     left: 0,
     right: 0,
     top: 0,
     bottom: 0,
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     color: theme.palette.common.white,
   },
   imageSrc: {
     position: 'absolute',
     left: 0,
     right: 0,
     top: 0,
     bottom: 0,
     backgroundSize: 'cover',
     backgroundPosition: 'center 40%',
   },
   // imageBackdrop: {
   //   position: 'absolute',
   //   left: 0,
   //   right: 0,
   //   top: 0,
   //   bottom: 0,
   //   background: theme.palette.common.black,
   //   opacity: 0.5,
   //   transition: theme.transitions.create('opacity'),
   // },
   imageTitle: {
     position: 'relative',
     padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
   },
   imageMarked: {
     height: 3,
     width: 18,
     background: theme.palette.common.white,
     position: 'absolute',
     bottom: -2,
     left: 'calc(50% - 9px)',
     transition: theme.transitions.create('opacity'),
   },
 });

 const Photo = props => {
   const {classes} = props;
   const [image, setImage] = useState('');

   const editPhoto = () => {
    props.history.push(`/edit/photo/${props.id}`)
   }

   return (
      <ButtonBase
         className={classes.imageWrapper}
         onClick={editPhoto}
         style={{
           width: '100%',
          //  maxWidth: 345
          }}
      >
         <div
            className={classes.imageSrc}
            style={{
               backgroundImage: `url(${props.url})`,
            }}
         />
      </ButtonBase>
   );
}

 export default withRouter(withStyles(styles)(Photo));