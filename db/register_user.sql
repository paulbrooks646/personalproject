insert into users (username, password, email)
value ($1, $2, $3);

select * from users
where username = $1;