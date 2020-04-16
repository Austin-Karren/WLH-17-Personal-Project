require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController'),
      postCtrl = require('./controllers/postController'),
      port = SERVER_PORT,
      app = express();

app.use(express.json());

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

// Post endpoints