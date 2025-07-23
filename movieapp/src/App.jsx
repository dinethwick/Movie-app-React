import React, { useState, useEffect } from 'react'
import Search from './components/search'
import Spinner from './components/spinner'
import MovieCard from './components/MovieCard'
import {useDebounce} from 'react-use'

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
  // for movie list
  const [movieList, setMovieList] = useState([]);
  // for a 'is loading' message
  const [isLoading, setIsLoading] = useState(false);
  // debounce for search optimisation
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
      
  // useDebounce hook. set 500ms delay.
  // and searchterm for dependency array (so it triggers when search term is changed)
  // Prevents the user from making too many API requests by using debouncing
  // waits for the user to STOP TYPING for 500ms before sending final query
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 
    500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    // initialise 'isLoading' and error message before running
    setIsLoading(true);
    setErrorMessage('');

    try{
      // declare endpoint url and fetch data from it
      // if query provided : encode URI with the query
      // else, display default movie list sorted by popularity
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS)
      
      // if response is not a HTTP OK, then throw error
      if(!response.ok) {
        throw new Error('failed to fetch')
      }
      
      // response.json() -> reads the response body and parses it as JSON (turns it into a js object)
      // await pauses execution until JSON is fully read and parsed
      const data = await response.json();
      // console.log(data);

      // some API's return 'Response: "False"' instead of using HTTP status codes
      // above case checks for HTTP code, this one checks for API returning 'Response: "False"'
      // show error message + clear movie list + stop further execution by using return
      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      // if no error in fetching data, populate movie list
      setMovieList(data.results || [])

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.')
    } finally {
      // at this point we have already handled success and failure. so we stop the loading 
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Love Without the Hassle</h1>
        

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        </header>

        <section className='all-movies'>
          <h2 className="mt-[40px]">All Movies</h2>
          
          {/*
          render fetch results using multi-ternary operator
          if isLoading - show loading text
          else if errorMessage - show error message text
          else - render movie list 
          */}

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}



        </section>

      </div>
    </main>
  )
}
export default App
