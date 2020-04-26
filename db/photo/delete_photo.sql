delete from album_photos
where album_photos.photo_id = $1;
delete from photos where photo_id = $1;