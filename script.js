let songs = [];
let playlistMeta = {};
let songIndex = 0;
let isShuffle = false;
let isRepeat = false;
let filteredSongs = [];

const audioElement = new Audio();
audioElement.preload = 'metadata';

const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const playerCover = document.getElementById('playerCover');
const playerArtist = document.getElementById('playerArtist');
const songListEl = document.getElementById('songList');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const timeCurrent = document.getElementById('timeCurrent');
const timeTotal = document.getElementById('timeTotal');
const volumeBar = document.getElementById('volumeBar');

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function encodePath(path) {
    return path.split('/').map(part => encodeURIComponent(part)).join('/');
}

async function init() {
    try {
        const res = await fetch('songs.json');
        const data = await res.json();
        playlistMeta = data;
        songs = data.songs;
        filteredSongs = [...songs];
        updateMetaUI();
        renderSongList(filteredSongs);
        bindEvents();
        audioElement.volume = volumeBar.value / 100;
    } catch (err) {
        console.error('Failed to load songs:', err);
        songListEl.innerHTML = '<p class="load-error">Could not load playlist. Please run a local server.</p>';
    }
}

function updateMetaUI() {
    const count = `${songs.length} song${songs.length !== 1 ? 's' : ''}`;
    document.getElementById('heroTitle').textContent = playlistMeta.playlistName;
    document.getElementById('heroArtist').textContent = playlistMeta.artist;
    document.getElementById('heroSongCount').textContent = count;
    document.getElementById('sidebarSongCount').textContent = count;
    document.getElementById('sidebarPlaylistName').textContent = 'Keerthanalu';
    playerArtist.textContent = playlistMeta.artist;
}

function renderSongList(list) {
    songListEl.innerHTML = '';
    emptyState.classList.toggle('hidden', list.length > 0);

    list.forEach((song, displayIndex) => {
        const actualIndex = songs.indexOf(song);
        const row = document.createElement('div');
        row.className = 'song-row';
        row.dataset.index = actualIndex;
        row.innerHTML = `
            <span class="col-index">
                <span class="track-num">${displayIndex + 1}</span>
                <button class="row-play-btn" data-index="${actualIndex}" aria-label="Play">
                    <i class="fas fa-play"></i>
                </button>
                <span class="now-playing-bars" aria-hidden="true">
                    <span></span><span></span><span></span>
                </span>
            </span>
            <div class="col-title">
                <img src="${song.coverPath}" alt="">
                <div class="title-text">
                    <span class="song-name">${song.songName}</span>
                    <span class="song-artist">${playlistMeta.artist}</span>
                </div>
            </div>
            <span class="col-album">Keerthanalu</span>
            <span class="col-duration song-duration" data-index="${actualIndex}">—:——</span>
        `;
        songListEl.appendChild(row);
        loadDuration(song.filePath, actualIndex);
    });

    syncPlayUI();
}

function loadDuration(filePath, index) {
    const temp = new Audio();
    temp.preload = 'metadata';
    temp.src = encodePath(filePath);
    temp.addEventListener('loadedmetadata', () => {
        const el = document.querySelector(`.song-duration[data-index="${index}"]`);
        if (el) el.textContent = formatTime(temp.duration);
    });
}

function isAudioPlaying() {
    return !audioElement.paused && !audioElement.ended && audioElement.src;
}

function syncPlayUI() {
    const playing = isAudioPlaying();
    const icon = masterPlay.querySelector('i');
    icon.className = playing ? 'fas fa-pause' : 'fas fa-play';
    masterPlay.title = playing ? 'Pause' : 'Play';
    gif.style.opacity = playing ? 1 : 0;

    document.querySelectorAll('.song-row').forEach(row => {
        const idx = parseInt(row.dataset.index);
        const isActive = idx === songIndex;
        row.classList.toggle('active', isActive);
        row.classList.toggle('is-playing', isActive && playing);

        const btn = row.querySelector('.row-play-btn');
        const bars = row.querySelector('.now-playing-bars');
        if (bars) bars.classList.toggle('visible', isActive && playing);
        if (!btn) return;
        const rowIcon = btn.querySelector('i');
        if (isActive && playing) {
            rowIcon.className = 'fas fa-pause';
            btn.setAttribute('aria-label', 'Pause');
        } else {
            rowIcon.className = 'fas fa-play';
            btn.setAttribute('aria-label', 'Play');
        }
    });
}

function updatePlayerUI() {
    const song = songs[songIndex];
    if (!song) return;
    masterSongName.textContent = song.songName;
    playerCover.src = song.coverPath;
    syncPlayUI();
}

async function loadAndPlay(index) {
    songIndex = index;
    const song = songs[songIndex];
    if (!song) return;

    masterSongName.textContent = 'Loading... ' + song.songName;
    audioElement.src = encodePath(song.filePath);
    audioElement.load();

    try {
        await audioElement.play();
        updatePlayerUI();
        syncPlayUI();
    } catch (err) {
        console.error('Playback error:', err);
        masterSongName.textContent = 'Error playing ' + song.songName;
        syncPlayUI();
    }
}

function togglePlayPause() {
    if (!songs.length) return;
    if (!audioElement.src) {
        loadAndPlay(0);
        return;
    }
    if (audioElement.paused) {
        audioElement.play().catch(err => console.error('Playback error:', err));
    } else {
        audioElement.pause();
    }
}

function playNext() {
    if (!songs.length) return;
    if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else if (songIndex >= songs.length - 1) {
        songIndex = isRepeat ? 0 : songs.length - 1;
        if (!isRepeat) { audioElement.pause(); syncPlayUI(); return; }
    } else {
        songIndex++;
    }
    loadAndPlay(songIndex);
}

function playPrevious() {
    if (!songs.length) return;
    if (audioElement.currentTime > 3) {
        audioElement.currentTime = 0;
        return;
    }
    songIndex = songIndex <= 0 ? (isRepeat ? songs.length - 1 : 0) : songIndex - 1;
    loadAndPlay(songIndex);
}

function bindEvents() {
    masterPlay.addEventListener('click', togglePlayPause);

    document.getElementById('next').addEventListener('click', playNext);
    document.getElementById('previous').addEventListener('click', playPrevious);

    document.getElementById('playAllBtn').addEventListener('click', () => loadAndPlay(0));

    document.getElementById('shuffleBtn').addEventListener('click', () => {
        isShuffle = !isShuffle;
        document.getElementById('shuffleBtn').classList.toggle('active', isShuffle);
        document.getElementById('shuffleToggle').classList.toggle('active', isShuffle);
    });

    document.getElementById('shuffleToggle').addEventListener('click', () => {
        isShuffle = !isShuffle;
        document.getElementById('shuffleBtn').classList.toggle('active', isShuffle);
        document.getElementById('shuffleToggle').classList.toggle('active', isShuffle);
    });

    document.getElementById('repeatToggle').addEventListener('click', () => {
        isRepeat = !isRepeat;
        document.getElementById('repeatToggle').classList.toggle('active', isRepeat);
    });

    myProgressBar.addEventListener('input', () => {
        if (audioElement.duration) {
            audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
        }
    });

    volumeBar.addEventListener('input', () => {
        audioElement.volume = volumeBar.value / 100;
        const volIcon = document.getElementById('volumeBtn').querySelector('i');
        const v = volumeBar.value;
        volIcon.className = v == 0 ? 'fas fa-volume-mute' : v < 50 ? 'fas fa-volume-down' : 'fas fa-volume-up';
    });

    audioElement.addEventListener('timeupdate', () => {
        if (audioElement.duration) {
            myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
            timeCurrent.textContent = formatTime(audioElement.currentTime);
            timeTotal.textContent = formatTime(audioElement.duration);
        }
    });

    audioElement.addEventListener('loadedmetadata', () => {
        timeTotal.textContent = formatTime(audioElement.duration);
    });

    audioElement.addEventListener('play', syncPlayUI);
    audioElement.addEventListener('pause', syncPlayUI);
    audioElement.addEventListener('ended', playNext);

    audioElement.addEventListener('waiting', () => {
        masterSongName.textContent = 'Buffering... ' + songs[songIndex]?.songName;
    });

    audioElement.addEventListener('canplay', updatePlayerUI);

    songListEl.addEventListener('click', (e) => {
        const row = e.target.closest('.song-row');
        const btn = e.target.closest('.row-play-btn');
        const index = btn
            ? parseInt(btn.dataset.index)
            : row ? parseInt(row.dataset.index) : null;
        if (index === null || isNaN(index)) return;

        if (index === songIndex && !audioElement.paused) {
            audioElement.pause();
        } else if (index === songIndex && audioElement.paused) {
            audioElement.play().catch(err => console.error('Playback error:', err));
        } else {
            loadAndPlay(index);
        }
    });

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase().trim();
        filteredSongs = q
            ? songs.filter(s => s.songName.toLowerCase().includes(q))
            : [...songs];
        renderSongList(filteredSongs);
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            const view = item.dataset.view;
            if (view === 'search') {
                searchInput.focus();
                document.getElementById('searchBar').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

init();
