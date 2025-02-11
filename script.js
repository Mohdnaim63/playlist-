const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const songList = document.getElementById("song-list");
const start = document.getElementById("start");

let isPlaying = false;

// Songs Array
const songs = [
  {
    title: "Samjho Na",
    artist: "Aditya Rikhari",
    src: "samjho-na -mp3.mpeg",
    cover: "album-cover.jpg",
  },
  {
    title: "Bye",
    artist: "Adiitya Bhardwaj",
    src: "Bye-.mpeg",
    cover: "album-cover2.jpg",
  },
  {
    title: "Jo tum mere ho",
    artist: "Anuv Jain",
    src: "Jo-tum-mere-ho.mpeg",
    cover: "album-cover3.jpg",
  },
  {
    title: "Agar Tum Sath Ho",
    artist: "Alka Yagnik, Arjit Singh",
    src: "agar-tum-sth-ho.mp3",
    cover: "album-cover4.jpg",
  },
  {
    title: "Bin Tere",
    artist: "Shafaqat Ali, Sunidhi Chauhan",
    src: "bin-tere.mp3",
    cover: "album-cover5.jpeg",
  },
  {
    title: "Kun faya kun",
    artist: "A.R rahman,Javed Ali",
    src: "kun-faya-kun.mp3",
    cover: "album-cover6.jpeg",
  },
  {
    title: "Phir se ud chala",
    artist: "Mohit Chauhan",
    src: "phir-se-ud-chala.mp3",
    cover: "album-cover8.jpg",
  },
  {
    title: "Nadaan Parindey",
    artist: "Mohit Chauhan",
    src: "Nadaan-parindey.mp3",
    cover: "album-cover7.jpeg",
  },
];

let currentSongIndex = 0;

// Load Song
function loadSong(index) {
  const song = songs[index];
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  audio.src = song.src;
  document.querySelector(".album-art img").src = song.cover;
}

// Play or pause the audio
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    start.src = "start.png";
  } else {
    audio.play();
    start.src = "pause.png";
  }
  isPlaying = !isPlaying;
}

// Next Song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
}

// Previous Song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration || 0);
});

// Seek functionality
progress.addEventListener("input", () => {
  const { duration } = audio;
  audio.currentTime = (progress.value / 100) * duration;
  // if (progress.value === duration) {
  //   start.src = "start.png";
  // }
});

// Format time (mm:ss)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
}

songList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    let selectedSongTitle = e.target.innerText.trim(); // Get clicked song name
    let selectedSongIndex = songs.findIndex(
      (song) => song.title === selectedSongTitle
    );

    if (selectedSongIndex !== -1) {
      currentSongIndex = selectedSongIndex; // Update current index
      loadSong(currentSongIndex); // Load selected song
      audio.play(); // Play song
      start.src = "pause.png";

      isPlaying = true;
    }
  }
});
audio.addEventListener("ended", function () {
  start.src = "start.png";
  isPlaying = false;
});

// Event listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Initial load
loadSong(currentSongIndex);
