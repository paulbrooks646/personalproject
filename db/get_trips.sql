select * from trips
where user_id = $1
order by trip_id asc;


