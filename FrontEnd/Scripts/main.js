// Select elements
const playButton = document.getElementById('play-btn');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const trackTitle = document.getElementById('track-title');
const artistName = document.getElementById('artist-name');

// Example song list (can be replaced with backend integration)
const songs = [
    { title: 'Shape of You', artist: 'Ed Sheeran' },
    { title: 'Blinding Lights', artist: 'The Weeknd' },
    { title: 'Levitating', artist: 'Dua Lipa' },
];

let currentSongIndex = 0;

// Function to update track display
function updateTrackDisplay() {
    trackTitle.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].artist;
}

// Play button functionality
playButton.addEventListener('click', () => {
    alert(`Playing: ${songs[currentSongIndex].title}`);
});

// Next button functionality
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateTrackDisplay();
});

// Previous button functionality
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateTrackDisplay();
});

// Initialize track display
updateTrackDisplay();
