const musicContainer = document.getElementById('music-container'); 
const playBtn = document.getElementById('play'); 
const nextBtn = document.getElementById('next'); 
const prevBtn = document.getElementById('prev'); 

const audio = document.getElementById('audio'); 
const progress = document.getElementById('progress'); 
const progressContainer = document.getElementById('progress-container'); 

const title = document.getElementById('title'); 
const cover = document.getElementById('cover'); 


//Song Titles: Bring in all the song titles we'll be using

const songs = ['moonlight', 'fall', 'bank']; 


//Keep count/track of the songs. Start the music player with the third song in the array.

let songIndex = 2; 

// Load the song details into the DOM: 

loadSong(songs[songIndex]); 

//Update song details with Title, audio, and image

function loadSong(song) { 
    title.innerText = song; 
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpeg`;  //make sure to use backticks 
}


// Play Song 
function playSong() { 
    musicContainer.classList.add ('play'); // Add 'play' class when playing
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');


    audio.play(); 
}

//Pause Song 
function pauseSong() { 
    musicContainer.classList.remove ('play'); // Remove 'play' class when pausing
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');


    audio.pause(); 
}

// Previous Song 
function prevSong() { 
    songIndex--; 

    if (songIndex < 0) { 
        songIndex = songs.length - 1; 
    }

    loadSong(songs[songIndex]); 
    playSong(); 

}

// Next Song 

function nextSong() { 
    songIndex++; 

    if (songIndex > songs.length - 1) { 
        songIndex = 0; 
    }

    loadSong(songs[songIndex]); 
    playSong(); 

}


//Update Progress Bar 

function updateProgress(e) { 
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime/duration) * 100; 
    progress.style.width = `${progressPercent}%`; 

}



// Set Progress Bar: So you can click on the bar to skip around

function setProgress(e) { 
    const width = this.clientWidth;
    const clickX = e.offsetX; 
    const duration = audio.duration; 

    audio.currentTime = (clickX / width) * duration; 

}

// Event Listeners 

//Play Event Listener 

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play'); 

    if (isPlaying) {
        pauseSong(); 
    } else {
        playSong();
    }
}); 


// Previous & Next Event Listener 

prevBtn.addEventListener('click' , prevSong);
nextBtn.addEventListener('click' , nextSong); 

//Time & song update
audio.addEventListener('timeupdate', updateProgress); 

// Click on progresbar
progressContainer.addEventListener('click', setProgress); 

//Song Ends 
audio.addEventListener('ended', nextSong); 