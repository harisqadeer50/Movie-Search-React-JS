import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [favorites, SetFavorites] = useState([]);
  useEffect(()=>{
    const storedFavs = localStorage.getItem("favorites");
    if(storedFavs) SetFavorites(JSON.parse(storedFavs))
  },[])

  useEffect(()=>{
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },[favorites])


  const addToFavorites  = (movie) =>{
    SetFavorites((prev) => [...prev,movie])
  }
  const removeFromFavorites = (movieID) => {
    SetFavorites((prev) => prev.filter((movie)=>movie.id !== movieID))
  }
  const isFavorite = (movieID) => {
    return favorites.some((movie)=> movie.id ===movieID)
  }
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }


  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export default MovieContext
