const songs = [
    {
        title: "From The Start",
        artist: "Laufey",
        mood: "Cozy",
        cover: "images/laufey.jpg",
        audio: "music/from-the-start.mp3"
    },

    {
        title: "Every Summertime",
        artist: "NIKI",
        mood: "Happy",
        cover: "images/niki.jpg",
        audio: "music/every-summertime.mp3"
    },

    {
        title: "Soft Spot",
        artist: "keshi",
        mood: "Romantic",
        cover: "images/keshi.jpg",
        audio: "music/soft-spot.mp3"
    },

    {
        title: "Glue Song",
        artist: "beabadoobee",
        mood: "Romantic",
        cover: "images/beabadoobee.jpg",
        audio: "music/glue-song.mp3"
    },

    {
        title: "Seasons",
        artist: "Wave to Earth",
        mood: "Sad",
        cover: "images/wave-to-earth.jpg",
        audio: "music/seasons.mp3"
    }
];
const movies = [
    {
        title: "13 Going on 30",
        mood: "Cozy",
        image: "images/13-going-on-30.jpg"
    },

    {
        title: "Zootopia",
        mood: "Happy",
        image: "images/zootopia.jpg"
    },

    {
        title: "Alice in Borderland",
        mood: "Sad",
        image: "images/alice-in-borderland.jpg"
    },

    {
        title: "Long Live Love!",
        mood: "Romantic",
        image: "images/long-live-love.jpg"
    },

    {
        title: "When Life Gives You Tangerines",
        mood: "Romantic",
        image: "images/when-life-gives-you-tangerines.jpg"
    }
];
let songIndex = 0;
let movieIndex = 0;

let selectedMood = null;
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const albumCover = document.getElementById("albumCover");

const record = document.getElementById("record");
const playBtn = document.getElementById("playBtn");

const movieTitle = document.getElementById("movieTitle");
const moviePoster = document.getElementById("moviePoster");
// 🔊 REAL AUDIO PLAYER
const audioPlayer = new Audio();

audioPlayer.preload = "auto";
function loadSong() {

    const song = songs[songIndex];

    if (!song) return;


    // เปลี่ยนชื่อเพลง
    if (songTitle) {
        songTitle.textContent = song.title;
    }


    // เปลี่ยนชื่อศิลปิน
    if (songArtist) {
        songArtist.textContent = song.artist;
    }


    // เปลี่ยนปกเพลง
    if (albumCover) {
        albumCover.src = song.cover;
        albumCover.alt = song.title;
    }


    // โหลดไฟล์เพลง
    audioPlayer.src = song.audio;

    audioPlayer.load();


    // ปุ่มกลับเป็น Play
    if (playBtn) {
        playBtn.textContent = "▶ Play";
    }


    // แผ่นเสียงหยุดหมุน
    if (record) {
        record.classList.remove("playing");
    }


    console.log("🎵 Loaded:", song.title);
    console.log("🔊 File:", song.audio);
}
// ▶ PLAY / ⏸ PAUSE
function togglePlay() {

    // ถ้ากำลังเล่นอยู่ → Pause
    if (!audioPlayer.paused) {

        audioPlayer.pause();

        if (playBtn) {
            playBtn.textContent = "▶ Play";
        }

        if (record) {
            record.classList.remove("playing");
        }

        return;
    }


    // ถ้าหยุดอยู่ → Play
    audioPlayer.play()
        .then(function() {

            if (playBtn) {
                playBtn.textContent = "⏸ Pause";
            }

            if (record) {
                record.classList.add("playing");
            }

            console.log("▶ Playing:", songs[songIndex].title);

        })
        .catch(function(error) {

            console.error("❌ Cannot play:", error);

            alert(
                "เปิดเพลงไม่ได้ 😭\n\n" +
                "กรุณาเช็กว่าไฟล์ MP3 อยู่ในโฟลเดอร์ music และชื่อไฟล์ตรงกับใน mood.js"
            );

        });
}
// ⏮ PREVIOUS SONG
function prevSong() {

    const wasPlaying = !audioPlayer.paused;


    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }


    loadSong();


    // ถ้าเพลงก่อนหน้ากำลังเล่นอยู่
    // ให้เพลงใหม่เล่นต่อเลย
    if (wasPlaying) {

        audioPlayer.play()
            .then(function() {

                if (playBtn) {
                    playBtn.textContent = "⏸ Pause";
                }

                if (record) {
                    record.classList.add("playing");
                }

            });

    }

}
// ⏭ NEXT SONG
function nextSong() {

    const wasPlaying = !audioPlayer.paused;


    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }


    loadSong();


    // ถ้าเพลงกำลังเล่นอยู่
    // เพลงใหม่จะเล่นทันที
    if (wasPlaying) {

        audioPlayer.play()
            .then(function() {

                if (playBtn) {
                    playBtn.textContent = "⏸ Pause";
                }

                if (record) {
                    record.classList.add("playing");
                }

            });

    }

}
// 🎲 RANDOM SONG
function randomSong() {

    let availableSongs = songs;


    // ถ้าเลือก Mood แล้ว
    // สุ่มเฉพาะเพลงของ Mood นั้น
    if (selectedMood !== null) {

        availableSongs = songs.filter(function(song) {

            return song.mood === selectedMood;

        });

    }


    if (availableSongs.length === 0) {
        return;
    }


    // สุ่ม
    const randomIndex = Math.floor(
        Math.random() * availableSongs.length
    );


    const selectedSong = availableSongs[randomIndex];


    // หา index จริง
    songIndex = songs.indexOf(selectedSong);


    // เช็กว่ากำลังเล่นอยู่หรือไม่
    const wasPlaying = !audioPlayer.paused;


    // โหลดเพลงใหม่
    loadSong();


    // ถ้าก่อนหน้านี้กำลังเล่น
    // ให้เพลงใหม่เล่นทันที
    if (wasPlaying) {

        audioPlayer.play()
            .then(function() {

                if (playBtn) {
                    playBtn.textContent = "⏸ Pause";
                }

                if (record) {
                    record.classList.add("playing");
                }

            });

    }


    console.log(
        "🎲 Random Song:",
        selectedSong.title
    );

}
// เมื่อเพลงเล่นจบ
audioPlayer.addEventListener("ended", function() {

    // ไปเพลงถัดไป
    nextSong();

});
function updateMovie() {

    const movie = movies[movieIndex];

    if (!movie) return;


    if (movieTitle) {
        movieTitle.textContent = movie.title;
    }


    if (moviePoster) {
        moviePoster.src = movie.image;
        moviePoster.alt = movie.title;
    }

}
// ⏮ PREVIOUS MOVIE
function prevMovie() {

    movieIndex--;

    if (movieIndex < 0) {
        movieIndex = movies.length - 1;
    }

    updateMovie();

}
// ⏭ NEXT MOVIE
function nextMovie() {

    movieIndex++;

    if (movieIndex >= movies.length) {
        movieIndex = 0;
    }

    updateMovie();

}
// 🎲 RANDOM MOVIE
function randomMovie() {

    let availableMovies = movies;


    // ถ้าเลือก Mood
    // สุ่มเฉพาะหนังของ Mood นั้น
    if (selectedMood !== null) {

        availableMovies = movies.filter(function(movie) {

            return movie.mood === selectedMood;

        });

    }


    if (availableMovies.length === 0) {
        return;
    }


    const randomIndex = Math.floor(
        Math.random() * availableMovies.length
    );


    const selectedMovie = availableMovies[randomIndex];


    movieIndex = movies.indexOf(selectedMovie);


    updateMovie();


    console.log(
        "🎬 Random Movie:",
        selectedMovie.title
    );

}
// 💗 CHOOSE MOOD
function chooseMood(mood) {

    selectedMood = mood;


    console.log(
        "💗 Selected Mood:",
        selectedMood
    );
    const matchingSongs = songs.filter(function(song) {

        return song.mood === mood;

    });


    if (matchingSongs.length > 0) {

        const randomSongIndex = Math.floor(
            Math.random() * matchingSongs.length
        );


        const selectedSong =
            matchingSongs[randomSongIndex];


        songIndex = songs.indexOf(selectedSong);


        loadSong();

    }
    const matchingMovies = movies.filter(function(movie) {

        return movie.mood === mood;

    });


    if (matchingMovies.length > 0) {

        const randomMovieIndex = Math.floor(
            Math.random() * matchingMovies.length
        );


        const selectedMovie =
            matchingMovies[randomMovieIndex];


        movieIndex = movies.indexOf(selectedMovie);


        updateMovie();

    }

}
// 🌐 CONNECT WITH HTML
window.prevSong = prevSong;
window.nextSong = nextSong;
window.randomSong = randomSong;
window.togglePlay = togglePlay;

window.prevMovie = prevMovie;
window.nextMovie = nextMovie;
window.randomMovie = randomMovie;

window.chooseMood = chooseMood;
// 🚀 START
loadSong();
updateMovie();

console.log("✅ DAILYME mood.js loaded successfully!");
