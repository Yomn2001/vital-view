document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById('audio-player');
    
    // Play audio when a "Listen Now" button is clicked
    document.querySelectorAll('.listen-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const audioSrc = button.dataset.audio;
            audioPlayer.src = audioSrc;
            audioPlayer.style.display = 'block';
            audioPlayer.play();
        });
    });
});
