update photos
set title = ${title},
    description = ${description},
    image = ${image},
    album_id = ${album_id}
where photo_id = ${photo_id};