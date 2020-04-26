import React, {useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import {makeStyles} from '@material-ui/core/styles';
import '../../App.css';
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';
import {GridLoader} from 'react-spinners';

const useStyles = makeStyles({
   root: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1em 4em'
   }
});

const CreateAlbum = props => {
   const [title, setTitle] = useState(''),
         [description, setDescription] = useState(''),
         [cover_photo, setCoverPhoto] = useState('');
   const [isUploading, setIsUploading] = useState(false);
   
   const classes = useStyles();

   const getSignedRequest = ([file]) => {
      setIsUploading(true);
      const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

      axios.get('/api/signs3', {
         params: {
            'file-name': fileName,
            'file-type': file.type,
         },
      })
      .then(res => {
         const {signedRequest, url} = res.data;
         uploadFile(file, signedRequest, url);
      })
      .catch(err => console.log(err));
   };

   const uploadFile = (file, signedRequest, url) => {
      const options = {
         headers: {
            'Content-type': file.type,
         },
      };
      axios.put(signedRequest, file, options)
      .then(res => {
         setIsUploading(false);
         setCoverPhoto(url);
         // do something with url here if you want
      })
      .catch(err => {
         setIsUploading(false);
         if(err.res.data.status === 403) {
            alert(
               `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                 err.stack
               }`
             );
         } else {
            alert(`ERROR: ${err.status}\n ${err.stack}`);
         }
      });
   };

   const cancel = () => {
      setTitle('');
      setDescription('');
      setCoverPhoto('');
   }

   const addAlbum = () => {
      axios.post(`/api/album/`, {
        title, description, cover_photo
      })
      .then(alert('Album added'))
      .catch(err => console.log(err));
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
               Create A New Album
            </Typography>
         </header>
         <Container
            style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <Dropzone
               onDropAccepted={getSignedRequest}
               style={{
               width: 200,
               height: 200,
               borderWidth: 7,
               marginTop: 25,
               borderColor: 'rgb(102, 102, 102)',
               borderStyle: 'dashed',
               borderRadius: 5,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               fontSize: 28,
               }}
               accept="image/*"
               multiple={false}
            >
               {isUploading ? <GridLoader /> : <p>Add Cover Photo Here</p>}
            </Dropzone>
         </Container>
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
                     onClick={addAlbum}
                  >
                     add
                  </Button>
               </Box>
            </Box>
         </Container>
      </React.Fragment>
   );
}

export default CreateAlbum;