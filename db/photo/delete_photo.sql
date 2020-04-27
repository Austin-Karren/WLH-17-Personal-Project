delete from album_photos
where photo_id = $1;
delete from photos where photo_id = $1;