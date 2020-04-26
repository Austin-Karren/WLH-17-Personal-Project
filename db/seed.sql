create table users (
    user_id serial primary key,
    email varchar(150) not null,
    password varchar(350) not null,
    username varchar(150),
    first_name varchar(50),
    last_name varchar(50),
    is_admin boolean
);

create table collections (
    collection_id serial primary key,
    title varchar(100) not null,
    description varchar(100),
    featured_photo text
);

create table albums (
    album_id serial primary key,
    title varchar(100) not null,
    description varchar(100),
    cover_photo text,
    author_id int references users(user_id) not null
);

create table photos (
    photo_id serial primary key,
    title varchar(100),
    description varchar(150),
    image text
);

create table collection_junction (
    album_id int references albums(album_id),
    collection_id int references collections(collection_id)
);

create table album_photos (
    album_id int references albums(album_id),
    photo_id int references photos(photo_id)
);