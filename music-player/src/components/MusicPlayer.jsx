import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./assets/styles/MusicPlayer.css";

function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([
    { 
      title: "Blinding Lights", 
      artist: "The Weeknd", 
      duration: "3:20", 
      releaseYear: 2019, 
      songURL: "https://example.com/blinding_lights.mp3" 
    },
    { 
      title: "Shape of You", 
      artist: "Ed Sheeran", 
      duration: "4:00", 
      releaseYear: 2017, 
      songURL: "https://example.com/shape_of_you.mp3" 
    },
    { 
      title: "Someone Like You", 
      artist: "Adele", 
      duration: "4:45", 
      releaseYear: 2011, 
      songURL: "https://example.com/someone_like_you.mp3" 
    },
    { 
      title: "Bad Guy", 
      artist: "Billie Eilish", 
      duration: "3:14", 
      releaseYear: 2019, 
      songURL: "https://example.com/bad_guy.mp3" 
    },
    { 
      title: "Uptown Funk", 
      artist: "Mark Ronson ft. Bruno Mars", 
      duration: "4:30", 
      releaseYear: 2014, 
      songURL: "https://example.com/uptown_funk.mp3" 
    },
  ]);

  // Form inputs for adding a new song
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    duration: '',
    releaseYear: '',
    songURL: ''
  });

  const navigate = useNavigate();

  const playPauseTrack = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleLogout = () => {
    // Clear session data (if any)
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Navigate to the login screen
    navigate("/");
  };

  const handleSongClick = (index) => {
    setCurrentTrack(index); // Set the selected song as the current track
    setIsPlaying(true); // Automatically start playing the selected track
  };
  
  // Handle song deletion
  const deleteSong = async (index) => {
    const songToDelete = playlist[index]; // Get the song to delete based on index

    try {
      // Send a DELETE request to the backend with the song details
      const response = await fetch('http://localhost:5000/api/songs/delete/:' + songToDelete.songID, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songID: songToDelete.songID }), // Send song details
      });

      const data = await response.json();

      if (response.ok) {
        // If the song is successfully deleted from the database, update the playlist
        const newPlaylist = playlist.filter((_, i) => i !== index); // Remove the song by index
        setPlaylist(newPlaylist); // Update the playlist state

        if (currentTrack === index) {
          setIsPlaying(false); // Stop playback if the deleted song was the current one
          setCurrentTrack(0); // Set the first song as the current track
        }
      } else {
        console.error('Failed to delete song:', data.error);
      }
    } catch (err) {
      console.error('Error deleting song:', err);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prevSong) => ({
      ...prevSong,
      [name]: value
    }));
  };

  const addSong = async () => {
    if (!newSong.title || !newSong.artist || !newSong.releaseYear || !newSong.songURL) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/songs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      });

      const data = await response.json();

      if (response.ok) {
        setPlaylist([...playlist, data.song]);  // Add the new song to the playlist
        setNewSong({ title: '', artist: '', duration: '', releaseYear: '', songURL: '' }); // Clear the input fields
      } else {
        console.error('Failed to add song:', data.error);
      }
    } catch (err) {
      console.error('Error adding song:', err);
    }
  };

  return (
    <div id="music-player" className="screen">
      <header>
        <button id="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <h1>CUPIFY</h1>
      </header>
      <main>
        <div className="current-track">
          <img
            src="https://i.pinimg.com/736x/65/8e/f5/658ef57a19b46e33f386be4391c8f95b.jpg"
            alt="Album Art"
            className="album"
          />
          <div className="track-info">
            <h2 id="track-title">{playlist[currentTrack].title}</h2>
            <p id="artist-name">{playlist[currentTrack].artist}</p>
            <p id="track-duration">{playlist[currentTrack].duration}</p>
            <p id="release-year">{playlist[currentTrack].releaseYear}</p>
          </div>
        </div>
        <div className="controls">
          <button id="prev-btn" onClick={prevTrack}>
            ⏮
          </button>
          <button id="play-btn" onClick={playPauseTrack}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button id="next-btn" onClick={nextTrack}>
            ⏭
          </button>
        </div>
        <div className="playlist">
          <h3>Playlist</h3>
          <ul id="playlist">
            {playlist.map((track, index) => (
              <li
                key={index}
                className={index === currentTrack ? "active" : ""}
                onClick={() => handleSongClick(index)} // Use index here to handle song click
              >
                {track.title} - {track.artist}
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the song click from firing
                    deleteSong(index); // Pass the index for deletion
                  }}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Add Songs Form */}
        <div className="add-song-form">
          <input
            type="text"
            name="title"
            placeholder="Song Title"
            value={newSong.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            value={newSong.artist}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={newSong.duration}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="releaseYear"
            placeholder="Release Year"
            value={newSong.releaseYear}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="songURL"
            placeholder="Song URL"
            value={newSong.songURL}
            onChange={handleInputChange}
          />
          <button id="add-song-btn" onClick={addSong}>
            Add Song
          </button>
        </div>
      </main>
    </div>
  );
}

export default MusicPlayer;
