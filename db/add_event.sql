insert into events (trip_id, attraction_id, user_id)
values ($1, $2, $3);

select max(event_id)
from events;
