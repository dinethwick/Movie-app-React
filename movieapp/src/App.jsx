import React, { useState } from 'react'
import Search from './components/search'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}



const App = () => {
  // create a useState so we can pass the search prompt into the component
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <main>
      <div classname="pattern" />

      <div className="wrapper">
        <header>
          <img src="hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll HATE without the Hassle</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h3 className="text-white">{searchTerm}</h3>

      </div>
    </main>
  )
}
export default App
