import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import {makeStyles} from '@material-ui/core/styles';
import '../../App.css';
import AddToAlbumGrid from './AddToAlbumGrid';

const useStyles = makeStyles({
   root: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1em 4em'
   }
});

const EditPhoto = props => {
   const [title, setTitle] = useState(''),
         [description, setDescription] = useState(''),
         [image, setImage] = useState('');
   
   const classes = useStyles();

   useEffect(() => {
      axios.get(`/api/photo/${props.match.params.id}`)
      .then(res => {
         setTitle(res.data[0].title);
         setDescription(res.data[0].description);
         setImage(res.data[0].image);
      })
      .catch(err => console.log(err));
   }, []);

   const cancel = () => {
      axios.get(`/api/photo/${props.match.params.id}`)
      .then(res => {
         setTitle(res.data[0].title);
         setDescription(res.data[0].description);
         setImage(res.data[0].image);
      })
      .catch(err => console.log(err));
   }

   const updatePhoto = () => {
      axios.put(`/api/photo/${props.match.params.id}`, {
        title, description, image
      })
      .then(alert('Photo saved'))
      .catch(err => console.log(err));
   }

   const deletePhoto = () => {
      axios.delete(`/api/photo/${props.match.params.id}`)
      .then(props.history.goBack)
      .catch(console.log('unable to delete Photo'));
   }

   return(
      <React.Fragment>
         <header>
            <Button
               onClick={props.history.goBack}
               size='medium'
               variant='contained'
               style={{position: 'absolute', left: '1.5em'}}
            > {'< Back'} 
            </Button>
            <Typography variant='h5'>
               Edit Photo
            </Typography>
         </header>
         <Container maxWidth='sm'>
            <Box style = {{
               margin: '3.5em 0em',
               padding: '3.5em 0em',
               borderRadius: '20px',
               boxShadow: '0 1px 3px 0 rgba(0,0,0,0.25)'
            }} >
               <Typography variant='h4'>
                  {title}
               </Typography>
               {!image
                  ?<>
                     <img src='https://www.tellerreport.com/images/no-image.png' style={{width: '300px', margin: '2em auto'}}/>
                  </>
                  :<>
                     <img src={image} style={{width: '300px', margin:'2em auto'}}/>
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
                     onClick={deletePhoto}
                  >
                     delete
                  </Button>
                  <Button
                     onClick={updatePhoto}
                  >
                     save
                  </Button>
               </Box>
            </Box>
         </Container>
         <Typography variant='h5'>
            Add to Album
         </Typography>
         <Container
            maxWidth='md'
            style={{
               padding: '3em 2em'
            }}
         >
            <AddToAlbumGrid />
         </Container>
      </React.Fragment>
   );
}

export default EditPhoto;