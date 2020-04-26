update collections
set title = ${title},
    description = ${description},
    featured_photo = ${featured_photo}
where collection_id = ${id};