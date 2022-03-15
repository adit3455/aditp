const image = document.querySelector('img');
const title = document.getElementById('title');
const artist= document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time')
const durationEL = document.getElementById('duration')
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
      },
      {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
      },
      {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
      },
];

// check if playing
let isPlaying = false;

// play 
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or pause eventlistener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
// question mark (?) menandakan bahwa jika ini benar maka function akan melancarkan pause song.


// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music-player/music/${song.name}.mp3`;
  image.src = `music-player/img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// previous song
function prevSong() {
  songIndex--;
  if  (songIndex < 0) {
    songIndex = song.length -1;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length -1) {
    songIndex = 0;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// on Load - Select First song
loadSong(songs[songIndex]);

// update progress bar
function updateProgressBar(event) {
  if (isPlaying) {
    const {duration, currentTime} = event.srcElement;
    // update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    
    durationEL.textContent=`${durationMinutes}:${durationSeconds}`;
    // delay swittching duraton element to avoid NaN
    if (durationSeconds) {
      durationEL.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
  }
}

// set progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// event listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);