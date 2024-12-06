// Select DOM elements
const playButton = document.getElementById('playButton'); // Button for play/pause
const prevButton = document.getElementById('prev-btn');  // Previous track button
const nextButton = document.getElementById('next-btn');  // Next track button
const trackTitle = document.getElementById('track-title'); // Track title display
const artistName = document.getElementById('artist-name'); // Artist name display
const playlist = document.getElementById('playlist'); // Playlist container
let isPlaying = false; // Track play state

// Track list (You can replace this with a dynamic playlist from your backend)
const tracks = [
  { title: 'Shape of You', artist: 'Ed Sheeran' },
  { title: 'Blinding Lights', artist: 'The Weeknd' },
  { title: 'Levitating', artist: 'Dua Lipa' },
  { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber' },
];
let currentTrackIndex = 0; // Index of the currently playing track

// Function to update track details
function updateTrackDetails() {
  const currentTrack = tracks[currentTrackIndex];
  trackTitle.textContent = currentTrack.title;
  artistName.textContent = currentTrack.artist;
}

// Function to play/pause music
function togglePlayPause() {
  isPlaying = !isPlaying; // Toggle the play state

  if (isPlaying) {
    alert(`Playing: ${tracks[currentTrackIndex].title} by ${tracks[currentTrackIndex].artist}`);
    playButton.textContent = '⏸'; // Change button text to pause
  } else {
    alert('Music paused!');
    playButton.textContent = '▶'; // Change button text to play
  }
}

// Function to play the previous track
function playPreviousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Circular navigation
  updateTrackDetails();
  alert(`Playing previous track: ${tracks[currentTrackIndex].title} by ${tracks[currentTrackIndex].artist}`);
}

// Function to play the next track
function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Circular navigation
  updateTrackDetails();
  alert(`Playing next track: ${tracks[currentTrackIndex].title} by ${tracks[currentTrackIndex].artist}`);
}

// Function to populate the playlist
function populatePlaylist() {
  playlist.innerHTML = ''; // Clear existing playlist items
  tracks.forEach((track, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${track.title} - ${track.artist}`;
    listItem.addEventListener('click', () => {
      currentTrackIndex = index;
      updateTrackDetails();
      alert(`Selected track: ${track.title} by ${track.artist}`);
    });
    playlist.appendChild(listItem);
  });

  // Add "Add Song" button at the end of the playlist
  const addSongButton = document.createElement('button');
  addSongButton.textContent = 'Add Song';
  addSongButton.id = 'addSongButton';
  addSongButton.addEventListener('click', () => {
    alert('Add song functionality not implemented yet!');
  });
  playlist.appendChild(addSongButton);
}

// Event listeners
playButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', playPreviousTrack);
nextButton.addEventListener('click', playNextTrack);

// Initialize the music player
updateTrackDetails(); // Set initial track details
populatePlaylist(); // Populate the playlist
