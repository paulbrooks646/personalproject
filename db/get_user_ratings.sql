select attractions.name, ratings.rating, ratings.comments
from attractions
join ratings on attractions.attraction_id = ratings.attraction_id
where ratings.user_id = $1;