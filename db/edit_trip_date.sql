update users 
set trip_date = $2
where user_id = $1

returning *