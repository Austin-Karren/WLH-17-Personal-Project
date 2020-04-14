update albums
set title = ${title},
    description = ${description},
    album_cover_photo = ${album_cover_photo},
    collection_id = ${collection_id}
where album_id = ${album_id};