insert into users (
    email, 
    password, 
    username, 
    first_name, 
    last_name, 
    is_admin
) values (
    ${email},
    ${password},
    ${username},
    ${first_name},
    ${last_name},
    true
);