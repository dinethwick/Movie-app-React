import React, { useState, useEffect } from 'react'
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
  // for error handling
  const [errorMessage, setErrorMessage] = useState('');
  
  const fetchMovies = async () => {
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS)
      
      if(!response.ok) {
        throw new Error('failed to fetch')
      }
      
      const data = await response.json();
      console.log(data);



    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.')
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll HATE without the Hassle</h1>
        

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h3 className="text-white">{searchTerm}</h3>
        </header>

        <section className='all-movies'>
          <h2>All Movies</h2>
          {/* if there is an error message, render it in a p tag */} 
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>

      </div>
    </main>
  )
}
export default App
