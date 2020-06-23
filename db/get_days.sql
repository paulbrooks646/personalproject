select attractions.name, events.trip_id 
from attractions
join events on attractions.attraction_id = events.attraction_id
where events.user_id = $1
order by events.event_id;