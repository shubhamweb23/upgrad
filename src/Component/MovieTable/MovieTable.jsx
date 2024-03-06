import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditMovieModal from "../EditMovieModal/EditMovieModal";

import { fetchMovies } from "../../Redux/Slice/movieSlice";
import { TbEdit } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import "./MovieTable.css";

const MovieTable = () => {
  const dispatch = useDispatch();
  const { movies, totalResults } = useSelector((state) => state.movies);
  const [movie, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorted, setSorted] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    setMovies(movies);
  }, [movies]);

  useEffect(() => {
    dispatch(fetchMovies(searchTerm));
  }, []);

  const handleEdit = (movie) => {
    setEditingMovie(movie);
  };

  const handleSaveUpdatedMovie = (imdbID, newTitle) => {
    const updatedMovies = movie.map((movie) =>
      movie.imdbID === imdbID ? { ...movie, Title: newTitle } : movie
    );
    setMovies(updatedMovies);
  };

  const handleModalClose = () => {
    setEditingMovie(null);
  };

  const handleDelete = (imdbID) => {
    const updatedMovies = movie.filter((movie) => movie.imdbID !== imdbID);
    setMovies(updatedMovies);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApply = () => {
    if (searchTerm.length <= 3) {
      alert("Search term must be longer than 3 characters.");
    } else {
      dispatch(fetchMovies(searchTerm));
    }
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleSort = () => {
    const direction = sorted ? -1 : 1;
    const sortedMovies = [...movie].sort(
      (a, b) => direction * a.Title.localeCompare(b.Title)
    );
    setMovies(sortedMovies);
    setSorted(!sorted);
  };

  return (
    <div>
      <div className="outer-box">
        <div className="search-box-main-container">
          <div className="search-heading">filter list of the movie title</div>
          <div className="search-box-container">
            <div className="search-box">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search movies..."
              />
              <FaSearch className="search-icon" />
            </div>
            <button className="button" onClick={handleApply}>
              Apply
            </button>
            <button className="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="sort-container">
        <button className="button sort-button" onClick={handleSort}>
          Sort
        </button>
      </div>
      <div className="table-main-container">
        <div className="table-container">
          {editingMovie && (
            <EditMovieModal
              movie={editingMovie}
              onSave={handleSaveUpdatedMovie}
              onClose={handleModalClose}
            />
          )}
          <div className="table-heading-main-container">
            <div className="table-heading-container">
              <div className="table-heading">View the list of the Movie</div>
              <div className="table-listing-count">
                showing <strong>{totalResults ? movie?.length : 0}</strong> of{" "}
                {totalResults ? totalResults : 0} Results
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Movie Title</th>
                <th>Movie Poster</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movie?.map((movie, index) => (
                <tr key={movie.imdbID}>
                  <td>{index + 1}</td>
                  <td>{movie.Title}</td>
                  <td>
                    <img src={movie.Poster} alt={movie.Title} />
                  </td>
                  <td className="delete-button">
                    <div onClick={() => handleDelete(movie.imdbID)}>delete</div>
                  </td>
                  <td>
                    <TbEdit
                      className="edit-button"
                      onClick={() => handleEdit(movie)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovieTable;
