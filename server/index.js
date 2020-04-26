require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController'),
      postCtrl = require('./controllers/postController'),
      junctionCtrl = require('./controllers/junctionController' )
      port = SERVER_PORT,
      app = express();

app.use(express.json());

const aws = require('aws-sdk');

const { S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

app.use(session({
   resave: false,
   saveUninitialized: true,
   secret: SESSION_SECRET,
   cookie: {
      maxAge: 1000 * 60 * 60 * 2
   }
}))

massive({
   connectionString: CONNECTION_STRING,
   ssl: {rejectUnauthorized: false}
}).then(db => {
   app.set('db', db);
   console.log('db connected');
   app.listen(port, () => console.log(`server running on port ${port}`));
})

// Auth endpoints
app.post('/auth/register-admin', authCtrl.registerAdmin);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

// Posts endpoints
app.get('/api/collections', postCtrl.getCollections);
app.get('/api/albums', postCtrl.getAlbums);
app.get('/api/photos', postCtrl.getPhotos);
app.get('/api/collection/:id', postCtrl.getCollectionById);
app.get('/api/album/:id', postCtrl.getAlbumById);
app.get('/api/photo/:id', postCtrl.getPhotoById);
app.get('/api/album-photos/:id', postCtrl.getPhotosByAlbumId);

app.post('/api/collection', postCtrl.addCollection);
app.post('/api/album', postCtrl.addAlbum);
app.post('/api/photo', postCtrl.addPhoto);

app.delete('/api/collection/:id', postCtrl.deleteCollection);
app.delete('/api/album/:id', postCtrl.deleteAlbum);
app.delete('/api/photo/:id', postCtrl.deletePhoto);

app.put('/api/collection/:id', postCtrl.updateCollection);
app.put('/api/album/:id', postCtrl.updateAlbum);
app.put('/api/photo/:id', postCtrl.updatePhoto);

// junction endpoints
app.get('/api/collection/albums/:id', junctionCtrl.getCollectionAlbumIds);
app.get('/api/album/photos/:id', junctionCtrl.getAlbumPhotoIds);

app.post('/api/collection/album', junctionCtrl.addCollectionAlbum);
app.post('/api/album/photo', junctionCtrl.addAlbumPhoto);

app.delete('/api/collection/album/:id', junctionCtrl.removeCollectionAlbum);
app.delete('/api/album/photo/:id', junctionCtrl.removeAlbumPhoto);

// aws endpoint
app.get('/api/signs3', (req, res) => {
   aws.config = {
     region: 'us-west-1',
     accessKeyId: AWS_ACCESS_KEY_ID,
     secretAccessKey: AWS_SECRET_ACCESS_KEY,
   };
 
   const s3 = new aws.S3();
   const fileName = req.query['file-name'];
   const fileType = req.query['file-type'];
   const s3Params = {
     Bucket: S3_BUCKET,
     Key: fileName,
     Expires: 60,
     ContentType: fileType,
     ACL: 'public-read',
   };
 
   s3.getSignedUrl('putObject', s3Params, (err, data) => {
     if (err) {
       console.log(err);
       return res.end();
     }
     const returnData = {
       signedRequest: data,
       url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
     };
 
     return res.send(returnData);
   });
 });