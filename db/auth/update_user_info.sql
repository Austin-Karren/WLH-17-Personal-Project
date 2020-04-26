update users
set email = ${email},
   username = ${username},
   first_name = ${first_name},
   last_name = ${last_name}
where user_id = $1;