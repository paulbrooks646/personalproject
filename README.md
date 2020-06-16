Ideas and users:

This app helps people who are taking a trip to Disneyland maximize their trip.

It does this by helping know which attractions they want to experience based on descriptions and by a rating based on other users' input. It helps them deicde in advance the order they want to visit attractions in advance to save time and confusion in the park.

This is primarily for people how are going to Disneyland for the first time or people who haven't been for a long time although this will also be enjoyable for any fans of Disneyland.

Features:

The MVP features for my app include:

    The ability to create and login to your own profile.
    A map to reference the park.
    
    A list of all the attractions in the park.
    
    The ability to click on an attraction from either the map  or the list to see general information and user ratings and opinions on that attraction. 

    The ability to select attractions from the list and at them to your trip plan, also the ability to remove items from your plan.

    A survey for to fill out, for those who have been before or for users after their trip.

    There are a lot of additional features I would like to add. Information on restroom locations, shops, restaurants and extend attractions to include parades and shows. A countdown clock. Each attraction having an average wait time and ride duration information. time information distinguished by time of day, day of week, and time of year. Fun quizes. A more interactive map.

    Views:

    Login Page : When coming to the page you will come here first. You will also be sent back here once you have logged out.

    Map: There will be a link on the navbar that will direct you here.

    My Trip: Once you login in you will be sent here. There will also be a link on the navbar that will send you here.

    Survey Form: There will be a link on the navbar that will send you here.

    Attraction: You will be sent here when you click on an attraction on either the map or my trip view.

    Routes:

    Login Page: "/Auth"
    My Trip: "/"
    Map: "/Map"
    Survey Form: "/Survey"

    Schema:

    Table Users:

    user_id: serial
    username: varchar(20) primary key
    password: varchar(20)
    email: varchar(30)

    Table trip:

    trip_id: serial
    user: varchar(20) foreign key
    attraction: varchar(20)

    Table attractions:

    attraction_id: serial
    name: varchar(20) primary key
    location: varchar(20)

    Table rating:

    rating_id: serial
    attraction: varchar(20)
    rating: integer
    comments: varchar(100)



