delete from albums where album_id = $1;
delete from album_photos
where album_photos.album_id = $1;