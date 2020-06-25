delete from events
where trip_id = $1;

delete from trips
where trip_id = $1