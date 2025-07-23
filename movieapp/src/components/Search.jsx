import React from 'react'


const Search = ({searchTerm, setSearchTerm}) => {
    // do not change the props (arguments) that were passed into the component
    // in this case, dont change the searchTerm (searchTerm = "I AM NOT BATMAN") etc
    // changing it breaks the behaviour of react
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search" />
                
                <input 
                    type="text"
                    placeholder="Search through thousands of movies"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />

            </div>
        </div>
    )
}

export default Search


/*
    Search optimisation:
    the default search functionality sends a query to the API 
    everytime a character is typed.
    so if you want to search for 'Batman'
    and you start typing b, then the app sends a query for 'b'
    so for 1 search here, it does 6 queries.
    this is not efficient. it could overwhelm the server.
    if API tokens are priced, it could cost us alot of money

    we need to add a delay so that the user can type 
    more of the movie name before the query is sent.

    this is called debouncing.
    it delays the request until the user has stopped typing
    for a predefined amount of time.

*/

/*
 * js - destructuring objects in js. this is used in react
normal object:

const person = {
    name: 'Bruce Wayne',
    age: 36,
    location: 'Gotham'
}

normal access:
    console.log(person.name)

***destructuring:
const { name, age, location } = person;

then you can access normally without having to write person. everytime.
console.log(name)

*/