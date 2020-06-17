update ratings
set rating = $3, comments = $4
where attraction_id = $2
and user_id = $1;