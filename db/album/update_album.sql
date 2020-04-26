update albums
set title = ${title},
    description = ${description},
    cover_photo = ${cover_photo}
where album_id = ${id};