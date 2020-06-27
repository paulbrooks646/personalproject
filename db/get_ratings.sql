select attractions.name, attractions.location, ratings.rating, ratings.comments, ratings.attraction_id
from attractions
join ratings on attractions.attraction_id = ratings.attraction_id

