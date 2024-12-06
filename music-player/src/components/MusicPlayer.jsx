import React, { useState } from "react";
import "./assets/styles/MusicPlayer.css";

function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playlist = [
    { title: "Song 1", artist: "Artist 1", albumArt: "placeholder.jpg" },
    { title: "Song 2", artist: "Artist 2", albumArt: "placeholder.jpg" },
    { title: "Song 3", artist: "Artist 3", albumArt: "placeholder.jpg" },
  ];

  const playPauseTrack = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack(
      (prevTrack) => (prevTrack - 1 + playlist.length) % playlist.length
    );
    setIsPlaying(true);
  };

  return (
    <div id="music-player" className="screen">
      <header>
        <h1>My Music Player</h1>
      </header>
      <main>
        <div className="current-track">
          <img
            src={playlist[currentTrack].albumArt}
            alt="Album Art"
            className="album"
          />
          <div className="track-info">
            <h2 id="track-title">{playlist[currentTrack].title}</h2>
            <p id="artist-name">{playlist[currentTrack].artist}</p>
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
                onClick={() => setCurrentTrack(index)}
              >
                {track.title} - {track.artist}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default MusicPlayer;
