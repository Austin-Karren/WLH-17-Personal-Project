import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import {makeStyles} from '@material-ui/core/styles';
import '../../App.css';
import CollectionAlbumGrid from './CollectionAlbumGrid';

const useStyles = makeStyles({
   root: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1em 4em'
   }
});

const EditCollection = props => {
   const [title, setTitle] = useState(''),
         [description, setDescription] = useState(''),
         [featured_photo, setFeaturedPhoto] = useState('');
   
   const classes = useStyles();

   useEffect(() => {
      axios.get(`/api/collection/${props.match.params.id}`)
      .then(res => {
         setTitle(res.data[0].title);
         setDescription(res.data[0].description);
         setFeaturedPhoto(res.data[0].featured_photo);
      })
      .catch(err => console.log(err));
   }, []);

   const cancel = () => {
      axios.get(`/api/collection/${props.match.params.id}`)
      .then(res => {
         setTitle(res.data[0].title);
         setDescription(res.data[0].description);
         setFeaturedPhoto(res.data[0].featured_photo);
      })
      .catch(err => console.log(err));
   }

   const updateCollection = () => {
      axios.put(`/api/collection/${props.match.params.id}`, {
        title, description, featured_photo
      })
      .then(alert('collection saved'))
      .catch(err => console.log(err));
   }

   const deleteCollection = () => {
      axios.delete(`/api/collection/${props.match.params.id}`)
      .then(props.history.goBack)
      .catch(console.log('unable to delete collection'));
   }

   return(
      <React.Fragment>
         {/* <UploadCollectionCover image={featured_photo} collection_id={props.collection_id}/> */}
         <header>
            <Button
               onClick={props.history.goBack}
               size='medium'
               variant='contained'
               style={{position: 'absolute', left: '1.5em'}}
            > {'< Back'} 
            </Button>
            <Typography variant='h5'>
               Edit Collection
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
               {!featured_photo
                  ?<>
                     <img src='https://www.tellerreport.com/images/no-image.png' style={{width: '300px', margin: '2em auto'}}/>
                  </>
                  :<>
                     <img src={featured_photo} style={{width: '300px', margin:'2em auto'}}/>
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
                     onClick={deleteCollection}
                  >
                     delete
                  </Button>
                  <Button
                     onClick={updateCollection}
                  >
                     save
                  </Button>
               </Box>
            </Box>
         </Container>
         <Typography 
            variant='h5'
            style={{
               margin: '2em 0em .5em' 
            }}
         >
            Collection Albums
         </Typography>
         {/* <Typography variant='caption'>
            Click Photo to Remove
         </Typography> */}
         <Container
            maxWidth='md'
            style={{
               padding: '3em 2em',
            }}
         >
            <CollectionAlbumGrid />
         </Container>
      </React.Fragment>
   );
}

export default EditCollection;