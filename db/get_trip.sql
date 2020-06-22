select attractions.name, events.event_id
from attractions
full outer join events on attractions.attraction_id = events.attraction_id
where events.trip_id = $1
order by events.event_id;