select attractions.name, attractions.location, ratings.rating, ratings.comments
from attractions
full outer join ratings on attractions.attraction_id = ratings.attraction_id
where attractions.attraction_id = $1;