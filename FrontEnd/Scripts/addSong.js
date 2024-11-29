// Select elements
const addSongButton = document.getElementById('addSongButton');
const playlist = document.getElementById('playlist');

// Add song functionality
addSongButton.addEventListener('click', () => {
    const newSongTitle = prompt('Enter the song title:');
    const newSongArtist = prompt('Enter the artist name:');

    if (newSongTitle && newSongArtist) {
        // Add new song to the playlist UI
        const newSongItem = document.createElement('li');
        newSongItem.textContent = `${newSongTitle} by ${newSongArtist}`;
        playlist.appendChild(newSongItem);

        // Optional: Add the new song to the songs array
        songs.push({ title: newSongTitle, artist: newSongArtist });

        alert(`Added: ${newSongTitle} by ${newSongArtist}`);
    } else {
        alert('Song title and artist are required!');
    }
});
