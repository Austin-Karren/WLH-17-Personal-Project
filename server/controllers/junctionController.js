module.exports = {
   getCollectionAlbumIds: (req, res) => {
      const {id} = req.params;
      const db = app.get('db');
      db.collection_albums.get_collection_albums(+id)
      .then(album_ids => res.status(200).send(album_ids))
      .catch(err => res.status(500).send(err));
   },
   getAlbumPhotoIds: (req, res) => {
      const {id} = req.params;
      const db = app.get('db');
      db.album_photos.get_album_photos(+id)
      .then(photo_ids => res.status(200).send(photo_ids))
      .catch(err => res.status(500).send(err));
   },
   addCollectionAlbum: (req, res) => {
      const {album_id, collection_id} = req.body;
      const db = app.get('db');
      db.collection_albums.add_to_collection({
         album_id, 
         collection_id,
      })
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
   },
   addAlbumPhoto: (req, res) => {
      const {album_id, photo_id} = req.body;
      const db = app.get('db');
      db.album_photos.add_to_album({
         album_id,
         photo_id,
      })
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
   },
   removeCollectionAlbum: (req, res) => {
      const {id} = req.params;
      const db = app.get('db');
      db.collection_albums.remove_album(+id)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
   },
   removeAlbumPhoto: (req, res) => {
      const {id} = req.params;
      const db = app.get('db');
      db.album_photos.remove_photo(+id)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
   },
   getAlbumAuthor: (req, res) => {
      const {id} = req.params;
      const db = app.get('db');
      db.album_author.album_author(+id)
      .then(author => res.status(200).send(author))
      .catch(err => res.status(500).send(err));
   }
}