module.exports = {
   // get all by type
   getCollections: (req, res) => {
      const db = req.app.get('db');
      db.collection.get_all_collections()
      .then(collections => res.status(200).send(collections))
      .catch(err => res.status(500).send(err));
   },
   getAlbums: (req, res) => {
      const db = req.app.get('db');
            db.album.get_all_albums()
      .then(albums => res.status(200).send(albums))
      .catch(err => res.status(500).send(err));
   },
   getPhotos: (req, res) => {
      const db = req.app.get('db');
            db.photo.get_all_photos()
      .then(photos => res.status(200).send(photos))
      .catch(err => res.status(500).send(err));
   },
   // get one by id
   getCollectionById: (req, res) => {
      const {id} = req.params,
            db = req.app.get('db');
      db.collection.get_collection_by_id(+id)
      .then(collection => res.status(200).send(collection))
      .catch(err => res.status(500).send(err));
   },
   getAlbumById: (req, res) => {
      const {id} = req.params,
            db = req.app.get('db');
      db.album.get_album_by_id(+id)
      .then(album => res.status(200).send(album))
      .catch(err => res.status(500).send(err))
   },
   getPhotoById: (req, res) => {
      const {id} = req.params,
            db = req.app.get('db');
      db.photo.get_photo_by_id(+id)
      .then(photo => res.status(200).send(photo))
      .catch(err => res.status(500).send(err));
   },
   // get all photos by album_id
   getPhotosByAlbumId: (req, res) => {
      const {id} = req.params,
            db = req.app.get('db');
      db.photo.get_photos_by_album_id(+id)
      .then(photos => res.status(200).send(photos))
      .catch(err => res.status(500).send(err));
   },
   // add/create
   addCollection: (req, res) => {
      const collection = {...req.body},
            db = req.app.get('db');
      db.collection.create_collection(collection)
      .then(newCollection => res.status(200).send(newCollection))
      .catch(err => res.status(500).send(err));
   },
   addAlbum: (req, res) => {
      const album = {...req.body},
            db = req.app.get('db');
      db.album.create_album(album)
      .then(newAlbum => res.status(200).send(newAlbum))
      .catch(err => res.status(500).send(err));
   },
   addPhoto: (req, res) => {
      const {title, description, image} = req.body,
            db = req.app.get('db');
      db.photo.add_photo({title, description, image})
      .then(newPhoto => res.status(200).send(newPhoto))
      .catch(err => res.status(500).send(err));
   },
   // delete
   deleteCollection: (req, res) => {
      const {id} = req.params,
            db = req.app.get('db');
      db.collection.delete_collection(+id)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
   },
   deleteAlbum: (req, res) => {
      const {id} = req.params,
            db = req.app.get('db');
      db.album.delete_album(+id)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
   },
   deletePhoto: (req, res) => {
      const {id} = req.params,
         db = req.app.get('db');
      db.photo.delete_photo(+id)
      .then(res => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
   },
   // update
   updateCollection: (req, res) => {
      const {title, description, featured_photo} = req.body,
            {id} = req.params,
            db = req.app.get('db');
      db.collection.update_collection({
         title,
         description,
         featured_photo,
         id
      }).then(collection => {
         res.status(200).send(collection);
      }).catch(err => res.status(500).send(err));
   },
   updateAlbum: (req, res) => {
      const {
         title,
         description,
         cover_photo, 
      } = req.body,
          {id} = req.params,
          db = req.app.get('db');
      db.album.update_album({
         title,
         description,
         cover_photo,
         id
      }).then(() => {
         res.sendStatus(200);
      }).catch(err => res.status(500).send(err));
   },
   updatePhoto: (req, res) => {
      const {title, description, image} = req.body,
            {id} = req.params
            db = req.app.get('db');
      db.photo.update_photo({
         title,
         description,
         image,
         id
      }).then(photo => res.status(200).send(photo))
      .catch(err => res.status(500).send(err));
   }
}