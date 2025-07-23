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