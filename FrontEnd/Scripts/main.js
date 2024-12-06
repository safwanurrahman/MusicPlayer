// Select elements
const playButton = document.getElementById('play-btn');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const trackTitle = document.getElementById('track-title');
const artistName = document.getElementById('artist-name');
const playlistElement = document.getElementById('playlist');

// Dynamic song list (fetched from the backend)
let songs = [];
let currentSongIndex = 0;

const response = await fetch('http://localhost:3000/api/songs');


// Function to fetch songs from the backend
async function fetchSongs() {
    try {
        const response = await fetch('/api/songs'); // Ensure your backend has this route
        if (!response.ok) {
            throw new Error('Failed to fetch songs');
        }
        songs = await response.json();

        if (songs.length > 0) {
            updateTrackDisplay(); // Update the track display with the first song
            populatePlaylist(); // Populate the playlist
        } else {
            trackTitle.textContent = 'No songs available';
            artistName.textContent = '';
        }
    } catch (error) {
        console.error('Error fetching songs:', error);
        trackTitle.textContent = 'Error loading songs';
        artistName.textContent = '';
    }
}

// Function to update track display
function updateTrackDisplay() {
    trackTitle.textContent = songs[currentSongIndex]?.title || 'Unknown Title';
    artistName.textContent = songs[currentSongIndex]?.artist || 'Unknown Artist';
}

// Function to populate the playlist
function populatePlaylist() {
    playlistElement.innerHTML = ''; // Clear existing playlist
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            updateTrackDisplay();
        });
        playlistElement.appendChild(li);
    });
}

// Play button functionality
playButton.addEventListener('click', () => {
    if (songs.length > 0) {
        alert(`Playing: ${songs[currentSongIndex].title}`);
    } else {
        alert('No songs to play!');
    }
});

// Next button functionality
nextButton.addEventListener('click', () => {
    if (songs.length > 0) {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updateTrackDisplay();
    }
});

// Previous button functionality
prevButton.addEventListener('click', () => {
    if (songs.length > 0) {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updateTrackDisplay();
    }
});

// Initialize the app
fetchSongs();
