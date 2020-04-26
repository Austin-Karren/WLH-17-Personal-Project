const bcrypt = require('bcryptjs');

module.exports = {
   registerAdmin: async(req, res) => {
      const {email, password} = req.body;
      const db = req.app.get('db');
      let checkUser = await db.auth.check_email(email);
      if (checkUser[0]){
         return res.status(400).send('Email already in database')
      }
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);

      let newUser = await db.auth.register_admin({
         email,
         password: hash
      })

      req.session.user = newUser[0];
      res.status(200).send(req.session.user);
   },
   login: async(req, res) => {
      const {email, password} = req.body;
      const db = req.app.get('db');
      let user = await db.auth.check_email(email);
      if (!user[0]) {
         return res.status(400).send('Email does not exist');
      }

      const authenticated = await bcrypt.compareSync(password, user[0].password);
      if(!authenticated) {
         res.status(401).send('Password did not match');
      }
      delete user[0].password;
      req.session.user = user[0];
      res.status(202).send(req.session.user);
   },
   logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
   },
   updateUserInfo: async(req, res) => {
      const {email, username, first_name, last_name} = req.body,
         {id} = req.params,
         db = req.app.get('db');
      let user = await db.auth.check_email(email);
      if(!user[0]) {
         return res.status(400).send('Something is wrong user not logged in');
      }
      db.auth.update_user_info(+id, {
         email,
         username,
         first_name,
         last_name
      }).then(user => res.status(200).send(user))
      .catch(err => res.status(500).send(err));
   }
}