select first_name, last_name from users
join albums
on users.user_id = albums.author_id
where album_id = $1;