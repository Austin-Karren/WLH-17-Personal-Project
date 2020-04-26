insert into users (
    email, 
    password,
    is_admin
) values (
    ${email},
    ${password},
    true
);