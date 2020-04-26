import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import {makeStyles} from '@material-ui/core/styles';
import '../../App.css';
import AlbumPhotoGrid from './AlbumPhotoGrid';
//Album
const useStyles = makeStyles({
   root: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1em 4em'
   }
});

const EditAlbum = props => {
   const [title, setTitle] = useState(''),
         [description, setDescription] = useState(''),
         [cover_photo, setCoverPhoto] = useState('');
   const [albumPhotos, setAlbumPhotos] = useState({});
   const classes = useStyles();

   useEffect(() => {
      axios.get(`/api/album/${props.match.params.id}`)
      .then(res => {
         setTitle(res.data[0].title);
         setDescription(res.data[0].description);
         setCoverPhoto(res.data[0].cover_photo);
      })
      .catch(err => console.log(err));
   }, []);

   const cancel = () => {
      axios.get(`/api/album/${props.match.params.id}`)
      .then(res => {
         setTitle(res.data[0].title);
         setDescription(res.data[0].description);
         setCoverPhoto(res.data[0].cover_photo);
      })
      .catch(err => console.log(err));
   }

   const updateAlbum = () => {
      axios.put(`/api/album/${props.match.params.id}`, {
        title, 
        description, 
        cover_photo
      })
      .then(alert('Album updated'))
      .catch((err) => {
         console.log(err);
         alert('Failed to update album')
      });
   }

   const deleteAlbum = () => {
      axios.delete(`/api/album/${props.match.params.id}`)
      .then(props.history.goBack)
      .catch(console.log('unable to delete Album'));
   }

   const addAlbumToCollection = () => {
      // console.log(props);
      props.history.push(`/add/album-to-collection/${props.match.params.id}`)
   }

   return(
      <React.Fragment>
         {/* <UploadAlbumCover image={cover_photo} Album_id={props.Album_id}/> */}
         <header>
            <Button
               onClick={props.history.goBack}
               size='medium'
               variant='contained'
               style={{position: 'absolute', left: '1.5em'}}
            > {'< Back'} 
            </Button>
            <Typography variant='h5'>
               Edit Album
            </Typography>
         </header>
         <Container maxWidth='sm'>
            <Box style = {{
               margin: '3.5em 0em',
               padding: '3.5em 0em',
               borderRadius: '20px',
               boxShadow: '0 1px 3px 0 rgba(0,0,0,0.25)'
            }} >
               <Typography variant='h5'>
                  {title}
               </Typography>
               {!cover_photo
                  ?<>
                     <img src='https://www.tellerreport.com/images/no-image.png' style={{width: '300px', margin: '2em auto'}}/>
                  </>
                  :<>
                     <img src={cover_photo} style={{width: '300px', margin:'2em auto'}}/>
                  </>}
               <Box classes={{root: classes.root}}>
                  <Typography>Title:</Typography>
                  <Input 
                     value={title}
                     onChange={e => setTitle(e.target.value)}
                  />
               </Box>
               <Box classes={{root: classes.root}}>
                  <Typography>Short Description:</Typography>
                  <Input 
                     value={description}
                     type='text'
                     onChange={e => setDescription(e.target.value)}
                  />
               </Box>
               <Box>
                  <Button
                     onClick={cancel}
                  >
                     cancel
                  </Button>
                  <Button
                     onClick={deleteAlbum}
                  >
                     delete
                  </Button>
                  <Button
                     onClick={updateAlbum}
                  >
                     save
                  </Button>
               </Box>
            </Box>
         </Container>
         <Button variant='contained' onClick={addAlbumToCollection}>
            Add Album to Collection
         </Button>
         <Typography 
            variant='h5'
            style={{
               margin: '2em 0em .5em' 
            }}
         >
            Album Photos
         </Typography>
         <Typography variant='caption'>
            Click Photo to Remove
         </Typography>
         <Container 
            maxWidth='md'
            style={{
               padding: '3em 2em'
            }}
         >
            <AlbumPhotoGrid />
         </Container>
      </React.Fragment>
   );
}

export default EditAlbum;