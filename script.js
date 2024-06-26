console.log("welcome to the world of musicyyy")

/// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mpeg');
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

// audioElement.play();
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mpeg`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=33){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mpeg`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mpeg`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})