import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../Custom/Typography';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import withRoot from '../Theme/withRoot'

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
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
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 400,
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
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
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

const ProductCategories = (props) => {
  const { classes } = props;
  const [photos, setPhotos] = useState([]);
  const [idArray, setIdArray] = useState([]);

useEffect(() => {
   axios.get(`/api/album/photos/${props.match.params.id}`)
   .then(res => {
      setIdArray(res.data);
   })
   .catch(err => console.log(err));
}, []);

useEffect(() => {
   idArray.map(element => {
      axios.get(`/api/photo/${element.photo_id}`)
      .then(res => {
         setPhotos(photos => [...photos, res.data[0]])
      })
   })
}, [idArray])

//   const goToPhoto = (href) => {
//     return (
//        <a href={href} />
//     )
//   }

  return (
     <React.Fragment>
        <AppNavbar />
      <Container className={classes.root} component="section">
         <Typography variant="h4" marked="center" align="center" component="h2">
         Album Photos
         </Typography>
         <div className={classes.images}>
         {photos.map((photo) => ( 
            <ButtonBase
               // onClick={photo.image}
               key={photo.title}
               className={classes.imageWrapper}
               style={{
               width: '50%',
               }}
            >
               <div
               className={classes.imageSrc}
               style={{
                  backgroundImage: `url(${photo.image})`,
               }}
               />
               <div className={classes.imageBackdrop} />
               <div className={classes.imageButton}>
               <Typography
                  component="h3"
                  variant="h6"
                  color="inherit"
                  className={classes.imageTitle}
               >
                  {photo.title}
                  {/* <div className={classes.imageMarked} /> */}
               </Typography>
               </div>
            </ButtonBase>
         ))}
         </div>
      </Container>
      <AppFooter />
     </React.Fragment>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withRouter(withStyles(styles)(ProductCategories)));