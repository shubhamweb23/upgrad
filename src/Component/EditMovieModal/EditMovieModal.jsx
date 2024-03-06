import React, { useState } from "react";
import "./EditMovieModal.css";

const EditMovieModal = ({ movie, onSave, onClose }) => {
  const [movieTitle, setMovieTitle] = useState(movie.Title);
  const [error, setError] = useState("");

  const handleSaveAndContinueClick = () => {
    if (!movieTitle.trim()) {
      setError("Movie title cannot be empty.");
    } else {
      onSave(movie.imdbID, movieTitle);
      onClose();
    }
  };

  const handleChange = (e) => {
    setMovieTitle(e.target.value);
    if (e.target.value.trim()) {
      setError("");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <h2>Update Movie Title</h2>
        </div>
        <input
          className="modal-input"
          type="text"
          value={movieTitle}
          onChange={handleChange}
        />
        {error && <div className="modal-error">{error}</div>}
        <div className="modal-actions">
          <button className="modal-button" onClick={handleSaveAndContinueClick}>
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMovieModal;
