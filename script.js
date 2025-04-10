console.log("welcome to the world of musicyyy")

/// Initialize variables
let songIndex = 0;
let audioElement = new Audio();
audioElement.preload = "metadata";
// Set the MIME type for MPEG audio
audioElement.type = 'audio/mpeg';

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Bharamu moyu varalara nayodhaku randi", filePath: "songs/1.mpeg", coverPath: "covers/1.png"},
    {songName: "Dhina Dhinambu yesuku dhegaragaa cherutha", filePath: "songs/2.mpeg", coverPath: "covers/1.png"},
    {songName: "Dhivya mandala rupini paraloka pattapurani", filePath: "songs/3.mpeg", coverPath: "covers/1.png"},
    {songName: "Aradhakhalamulo nenu thiriginanu nenela ", filePath: "songs/4.mpeg", coverPath: "covers/1.png"},
    {songName: "Kalvari Prema Kadu Vintha Prema", filePath: "songs/5.mpeg", coverPath: "covers/1.png"},
    {songName: "Nive Mahaganamu Yesu Nive Mahaganamu", filePath: "songs/6.mpeg", coverPath: "covers/1.png"},
    {songName: "Pampumu Dheva Panivaralanu ", filePath: "songs/7.mpeg", coverPath: "covers/1.png"},
    {songName: "Shremaleni dhoundhyundu", filePath: "songs/8.mpeg", coverPath: "covers/1.png"},
    {songName: "Sthuthi Sthrothra Geethamu Prabhu ", filePath: "songs/9.mpeg", coverPath: "covers/1.png"},
    {songName: "Yehova Na Kaapari Yehova Na Upiri", filePath: "songs/10.mpeg", coverPath: "covers/1.png"},
    {songName: "Yesu Prabhu Na Rakshaka", filePath: "songs/11.mpeg", coverPath: "covers/1.png"},
    {songName: "Yesuni Raakada Cheruva Kadha ", filePath: "songs/12.mpeg", coverPath: "covers/1.png"},
    {songName: "Nededhinamandhaina", filePath: "songs/13.mpeg", coverPath: "covers/1.png"},
    {songName: "keerthanalu   ", filePath: "songs/14.mpeg", coverPath: "covers/1.png"},
    {songName: "Paavanudagu Maa Parama Thandri", filePath: "songs/15.mpeg", coverPath: "covers/1.png"},
    {songName: "Aaradhana Sthuthi Pathruda Yesaiah", filePath: "songs/16.mpeg", coverPath: "covers/1.png"},
    {songName: "Krupa Kaalam Lo Prabhu Yesuni ", filePath: "songs/17.mpeg", coverPath: "covers/1.png"},
    {songName: "Keerthesu Prabhuvu Thana Rakthamichi", filePath: "songs/18.mpeg", coverPath: "covers/1.png"},
    {songName: "Yentho Dhukamu Pondhithiva", filePath: "songs/19.mpeg", coverPath: "covers/1.png"},
    {songName: "Kalavantidhi ni jeevitham", filePath: "songs/20.mpeg", coverPath: "covers/1.png"},
    {songName: "Edhe Dhinam", filePath: "songs/21.mpeg", coverPath: "covers/1.png"},
    {songName: "Strustiki kanna", filePath: "songs/22.mpeg", coverPath: "covers/1.png"},
    {songName: "Ni Vaakyame Sramakolimilo Nanu", filePath: "songs/23.mpeg", coverPath: "covers/1.png"},
    {songName: "Nannentho Preminchi Swargani Vidachi", filePath: "songs/24.mpeg", coverPath: "covers/1.png"},
    {songName: "Yathrikudanaina Naa Basalo paatalu", filePath: "songs/26.mpeg", coverPath: "covers/1.png"},
    {songName: "Naayesuni Margamulo Nadichedhanu", filePath: "songs/27.mpeg", coverPath: "covers/1.png"},
    {songName: "Nirakha Samipa Mandhu", filePath: "songs/28.mpeg", coverPath: "covers/1.png"},
    {songName: "Nakemi Bhayamu Nadhevudundaga", filePath: "songs/29.mpeg", coverPath: "covers/1.png"},
    {songName: "Yesutho Nadupuma", filePath: "songs/30.mpeg", coverPath: "covers/1.png"},
    {songName: "Yesuni Chenthaku Aashatho Rammu", filePath: "songs/31.mpeg", coverPath: "covers/1.png"},
    {songName: "Yesutho Navalo", filePath: "songs/32.mpeg", coverPath: "covers/1.png"},
    {songName: "Nededhinamandhaina", filePath: "songs/33.mpeg", coverPath: "covers/1.png"},
    {songName: "Nivanti varevaru", filePath: "songs/34.mpeg", coverPath: "covers/1.png"},
    {songName: "Yese Na Parihari", filePath: "songs/35.mpeg", coverPath: "covers/1.png"},
    {songName: "Nee Mukhamu Manoharamu", filePath: "songs/36.mpeg", coverPath: "covers/1.png"},
    {songName: "Naa jeevitha Vyadhanandhu ", filePath: "songs/37.mpeg", coverPath: "covers/1.png"},
]

// Initialize song names and covers
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Add buffering indicator
let isBuffering = false;
audioElement.addEventListener('waiting', () => {
    isBuffering = true;
    masterSongName.innerText = 'Buffering... ' + songs[songIndex].songName;
});

audioElement.addEventListener('canplay', () => {
    isBuffering = false;
    masterSongName.innerText = songs[songIndex].songName;
});

// Improved error handling with format check
audioElement.addEventListener('error', (e) => {
    console.error('Error loading audio:', e);
    const errorCode = e.target.error ? e.target.error.code : null;
    
    if (errorCode === 3) { // MEDIA_ERR_DECODE
        console.log('Trying alternative audio format handling...');
        const currentSrc = audioElement.src;
        audioElement.src = '';
        setTimeout(() => {
            audioElement.src = currentSrc;
            audioElement.load();
            audioElement.play().catch(err => {
                console.error('Alternative playback failed:', err);
            });
        }, 1000);
    } else if (errorCode === 2) { // MEDIA_ERR_NETWORK
        setTimeout(() => {
            const currentSrc = audioElement.src;
            audioElement.src = currentSrc;
            audioElement.load();
            audioElement.play().catch(err => {
                console.error('Retry failed:', err);
            });
        }, 1000);
    }
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
});

// Function to load and play audio with format handling
const loadAndPlayAudio = (src) => {
    return new Promise((resolve, reject) => {
        audioElement.src = src;
        audioElement.load();
        
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
            playPromise.then(resolve).catch(error => {
                console.error('Playback error:', error);
                if (error.name === 'NotSupportedError') {
                    // Try with explicit MIME type
                    audioElement.type = 'audio/mpeg';
                    audioElement.load();
                    return audioElement.play();
                }
                reject(error);
            }).catch(reject);
        }
    });
};

// Handle main play/pause button click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        
        // Update the individual song button state
        const currentSongPlay = document.getElementById(songIndex.toString());
        if(currentSongPlay) {
            currentSongPlay.classList.remove('fa-play-circle');
            currentSongPlay.classList.add('fa-pause-circle');
        }
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        
        // Update the individual song button state
        const currentSongPlay = document.getElementById(songIndex.toString());
        if(currentSongPlay) {
            currentSongPlay.classList.remove('fa-pause-circle');
            currentSongPlay.classList.add('fa-play-circle');
        }
    }
})

// Update progress bar
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

// Handle progress bar change
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// Reset all play buttons to play state except current
const makeAllPlays = (exceptId)=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        if(element.id !== exceptId) {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }
    })
}

// Handle individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', async (e)=>{ 
        const clickedId = e.target.id;
        const isPlaying = !audioElement.paused;
        const isSameSong = songIndex === parseInt(clickedId);

        if(isSameSong && isPlaying) {
            // Pause current song
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else if(isSameSong && !isPlaying) {
            // Resume paused song
            try {
                await audioElement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            } catch (error) {
                console.error('Error resuming audio:', error);
            }
        } else {
            // Play new song
            makeAllPlays(clickedId);
            songIndex = parseInt(clickedId);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            
            // Show loading state
            masterSongName.innerText = 'Loading... ' + songs[songIndex].songName;
            gif.style.opacity = 0;
            
            try {
                await loadAndPlayAudio(`songs/${songIndex+1}.mpeg`);
                masterSongName.innerText = songs[songIndex].songName;
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            } catch (error) {
                console.error('Error playing new song:', error);
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                masterSongName.innerText = 'Error playing ' + songs[songIndex].songName;
            }
        }
    })
})

// Handle next button
document.getElementById('next').addEventListener('click', async ()=>{
    if(songIndex>=33){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    makeAllPlays(songIndex.toString());
    const currentSongPlay = document.getElementById(songIndex.toString());
    if(currentSongPlay) {
        currentSongPlay.classList.remove('fa-play-circle');
        currentSongPlay.classList.add('fa-pause-circle');
    }
    
    try {
        await loadAndPlayAudio(`songs/${songIndex+1}.mpeg`);
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } catch (error) {
        console.error('Error playing next song:', error);
        if(currentSongPlay) {
            currentSongPlay.classList.remove('fa-pause-circle');
            currentSongPlay.classList.add('fa-play-circle');
        }
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        masterSongName.innerText = 'Error playing ' + songs[songIndex].songName;
    }
})

// Handle previous button
document.getElementById('previous').addEventListener('click', async ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    makeAllPlays(songIndex.toString());
    const currentSongPlay = document.getElementById(songIndex.toString());
    if(currentSongPlay) {
        currentSongPlay.classList.remove('fa-play-circle');
        currentSongPlay.classList.add('fa-pause-circle');
    }
    
    try {
        await loadAndPlayAudio(`songs/${songIndex+1}.mpeg`);
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } catch (error) {
        console.error('Error playing previous song:', error);
        if(currentSongPlay) {
            currentSongPlay.classList.remove('fa-pause-circle');
            currentSongPlay.classList.add('fa-play-circle');
        }
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        masterSongName.innerText = 'Error playing ' + songs[songIndex].songName;
    }
})
