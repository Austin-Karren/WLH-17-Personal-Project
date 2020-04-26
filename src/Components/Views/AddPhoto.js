import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class AddPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      url: 'https://www.tellerreport.com/images/no-image.png',
    };
  }

  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

    axios
      .get('/api/signs3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url });
        console.log(response);
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
        // send in body={{}}
        axios.post(`/api/photo`, {image: url, title: '', description: ''})
        .then(alert('Photo has been added'))
        .catch(err => {
          console.log(err);
          alert('Failed to add photo')
        })
      })
      .catch(err => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
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

  render() {
    const { url, isUploading } = this.state;
    return (
      <div className="AddPhoto">
        <header>
            <Button
               onClick={this.props.history.goBack}
               size='medium'
               variant='contained'
               style={{position: 'absolute', left: '1.5em'}}
            > {'< Back'} 
            </Button>
            <Typography variant='h5'>
               Add Photo
            </Typography>
         </header>
        <Container maxWidth='xs' style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '3em',
        }}>
          <Typography variant='h5'>
            Upload Image Here
          </Typography>
          {/* <p>{url}</p> */}
          <img src={url} alt="" width="300px" />

          <Dropzone
            onDropAccepted={this.getSignedRequest}
            style={{
              width: 300,
              height: 300,
              borderWidth: 7,
              marginTop: 50,
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
            {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
            
          </Dropzone>
        </Container>
      </div>
    );
  }
}

export default AddPhoto;