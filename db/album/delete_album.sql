delete from collection_junction
where album_id = $1;

delete from album_photos
where album_id = $1;

delete from albums where album_id = $1;