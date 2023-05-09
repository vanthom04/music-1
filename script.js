// All Music
let allMusic = [
  {
    name: "Bật Tình Yêu Lên",
    artist: "Tăng Duy Tân x Hòa Minzy",
    img: "img/music/bat_tinh_yeu_len.jpg",
    src: "music/bat_tinh_yeu_len.mp3",
    idMusic: "song1",
  },
  {
    name: "Chỉ Cần Em Muốn",
    artist: "NP.2 x Hngle",
    img: "img/music/chi_can_em_muon.jpg",
    src: "music/chi_can_em_muon.mp3",
    idMusic: "song2",
  },
  {
    name: "Em Đồng Ý Nha",
    artist: "Nguyễn Quang Quý",
    img: "img/music/em_dong_y_nha.jpg",
    src: "music/em_dong_y_nha.mp3",
    idMusic: "song3",
  },
  {
    name: "Mặt Mộc",
    artist: "Phạm Ngọc Nguyên ft VAnh",
    img: "img/music/mat_moc.jpg",
    src: "./music/mat_moc.mp3",
    idMusic: "song4",
  },
  {
    name: "Nơi Này Có Anh",
    artist: "Sơn Tùng MT-P",
    img: "img/music/noi_nay_co_anh.jpg",
    src: "./music/noi_nay_co_anh.mp3",
    idMusic: "song5",
  },
  {
    name: "Người Yêu Tương Lai",
    artist: "Thảo Phạm",
    img: "img/music/nguoi_yeu_tuong_lai.jpg",
    src: "./music/nguoi_yeu_tuong_lai.mp3",
    idMusic: "song6",
  },
  {
    name: "Hai Mươi Hai「Cukak Remix」",
    artist: "Amee x Hứa Kim Tuyền",
    img: "img/music/22.jpg",
    src: "./music/22.mp3",
    idMusic: "song7",
  },
  {
    name: "Muộn Rồi Mà Sao Còn",
    artist: "Sơn Tùng M-TP",
    img: "img/music/muon_roi_ma_sao_con.png",
    src: "./music/muon_roi_ma_sao_con.mp3",
    idMusic: "song8",
  },
  {
    name: "Tell Ur Mom II",
    artist: "Winno ft. Heily「Cukak Remix」",
    img: "img/music/tell_ur_mom_2.jpg",
    src: "./music/tell_ur_mom_2.mp3",
    idMusic: "song9",
  },
  {
    name: "Xích Thêm Chút",
    artist: "RPT Groovie ft TLinh x RPT MCK",
    img: "img/music/xich_them_chut.jpg",
    src: "./music/xich_them_chut.mp3",
    idMusic: "song10",
  },
  // {
  //   name: "Gió",
  //   artist: "JanK x Quanvrox「Lofi Ver.」",
  //   img: "img/music/gio.jpg",
  //   src: "./music/gio.mp3",
  //   idMusic: "song11",
  // },
  // {
  //   name: "",
  //   artist: "",
  //   img: "img/music/",
  //   src: "./music/",
  //   idMusic: "song12",
  // },
];

const playlist = document.querySelector(".playlist");
const cd = document.querySelector(".cd");
const cdThumb = document.querySelector(".cd-thumb");
const musicName = document.querySelector("header h2");
const musicArtist = document.querySelector("header h3");
const progress = document.querySelector(".progress");
const progressbar = document.querySelector(".progress-bar");
const randomBtn = document.querySelector("#btn-random");
const prevBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");
const playBtn = document.querySelector("#btn-play");
const playbackTimeBtn = document.querySelector("#btn-playback-time");
const songAudio = document.createElement("audio");

let currentIndex = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let isPlaybackTime = false;
let stopMusic = null;
let stopTime = 3600000;

window.addEventListener("load", () => {
  loadMusic(currentIndex);
  playSongMusic();
});

// Xử lý khi click vào playlist
for (let i = 0; i < allMusic.length; i++) {
  let song = `<div class="song" musicIndex="${i}">
                <div class="left">
                  <div
                    class="img-song"
                    style="background-image: url('${allMusic[i].img}')">
                  </div>
                  <div class="song-title">
                    <h3 class="name">${allMusic[i].name}</h3>
                    <p class="artist">${allMusic[i].artist}</p>
                  </div>
                </div>
                <audio class="${allMusic[i].idMusic}" src="${allMusic[i].src}">
                </audio>
                <div id="${allMusic[i].idMusic}" class="audio-duration">
                  <i class="fas fa-ellipsis-h"></i>
                </div>
                </div>`;
  playlist.insertAdjacentHTML("beforeend", song);
  let songAudioDuration = document.querySelector(`#${allMusic[i].idMusic}`);
  let songAudioTag = document.querySelector(`.${allMusic[i].idMusic}`);
  // -------hiển thị thời gian bài hát------------
  songAudioTag.addEventListener("loadeddata", () => {
    let audioDuration = songAudioTag.duration;
    let totalMusicmin = Math.floor(audioDuration / 60);
    let totalMusicsec = Math.floor(audioDuration % 60);
    if (totalMusicsec < 10) {
      totalMusicsec = `0${totalMusicsec}`;
    }
    songAudioDuration.innerText = `${totalMusicmin}:${totalMusicsec}`;
  });
}
//
const allSongMusic = playlist.querySelectorAll(".song");

function playSongMusic() {
  for (let j = 0; j < allSongMusic.length; j++) {
    if (allSongMusic[j].classList.contains("active")) {
      allSongMusic[j].classList.remove("active");
    }
    if (allSongMusic[j].getAttribute("musicIndex") == currentIndex) {
      allSongMusic[j].classList.add("active");
    }
    allSongMusic[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(index) {
  let getSongIndex = index.getAttribute("musicindex");
  currentIndex = getSongIndex;
  loadMusic(currentIndex);
  playSong();
  playSongMusic();
}
// Load Music
function loadMusic(index) {
  musicName.innerText = allMusic[index].name;
  musicArtist.innerText = allMusic[index].artist;
  cdThumb.style.backgroundImage = `url(${allMusic[index].img})`;
  songAudio.src = allMusic[index].src;
  songAudio.load();
}
loadMusic(currentIndex);

// Phóng to / Thu nhỏ CD
const cdWidth = cd.offsetWidth;

document.onscroll = function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const newCdWidth = cdWidth - scrollTop;

  cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
  cd.style.opacity = newCdWidth / cdWidth;
};

// Xử lý CD quay / dừng
const cdThumbAnimation = cdThumb.animate([{ transform: "rotate(360deg)" }], {
  duration: 10000,
  iterations: Infinity,
});
cdThumbAnimation.pause();

// Play song
function musicPlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}
function playSong() {
  songAudio.play();
  cdThumbAnimation.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseSong() {
  songAudio.pause();
  cdThumbAnimation.pause();
  isPlaying = false;
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// Next song
function nextSong() {
  if (currentIndex < allMusic.length - 1) {
    currentIndex++;
    loadMusic(currentIndex);
    playSongMusic();
    playSong();
  } else {
    currentIndex = 0;
    loadMusic(currentIndex);
    playSongMusic();
    playSong();
  }
}
nextBtn.onclick = function () {
  if (isRandom) {
    playRandomSong();
    nextSong();
  } else {
    nextSong();
  }
};

// Prev song
function prevSong() {
  if (currentIndex > 0) {
    currentIndex--;
    loadMusic(currentIndex);
    playSongMusic();
    playSong();
  } else {
    currentIndex = allMusic.length - 1;
    loadMusic(currentIndex);
    playSongMusic();
    playSong();
  }
}
prevBtn.onclick = function () {
  if (isRandom) {
    playRandomSong();
    prevSong();
  } else {
    prevSong();
  }
};

// Tự động chuyển bài khi kết thúc
songAudio.addEventListener("ended", () => {
  if (isRandom) {
    playRandomSong();
    nextSong();
  } else {
    nextSong();
  }
});

// -------- Random Music --------
randomBtn.onclick = function (e) {
  isRandom = !isRandom;
  randomBtn.classList.toggle("pink", isRandom);
};

let playedSongs = [];
function playRandomSong() {
  let randomIndex;
  let randomSong;

  // Lặp lại cho đến khi tìm được bài hát không trùng lặp
  do {
    randomIndex = Math.floor(Math.random() * allMusic.length);
    randomSong = allMusic[randomIndex];
  } while (playedSongs.includes(randomSong));

  // Thêm bài hát được random vào danh sách các bài đã được phát
  playedSongs.push(randomSong);

  // Nếu tất cả bài hát đã được phát thì reset lại danh sách
  if (playedSongs.length == allMusic.length) {
    playedSongs = [];
  }

  // Trả về bài hát được random
  currentIndex = randomIndex;
}

// Playback time
playbackTimeBtn.addEventListener("click", function () {
  if (!isPlaybackTime) {
    playbackTimeBtn.classList.add("pink");
    stopMusic = setTimeout(function () {
      isPlaybackTime = false;
      pauseSong();
    }, stopTime);
    isPlaybackTime = true;
  } else {
    clearTimeout(stopMusic);
    playbackTimeBtn.classList.remove("pink");
    isPlaybackTime = false;
    playSong();
  }
});

// progress
songAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressbar.style.width = `${progressWidth}%`;

  let musicCurrentTime = document.querySelector(".current");
  let musicDuration = document.querySelector(".duration");
  songAudio.addEventListener("loadeddata", () => {
    let audioduration = songAudio.duration;
    let totalMusicmin = Math.floor(audioduration / 60);
    let totalMusicsec = Math.floor(audioduration % 60);
    if (totalMusicsec < 10) {
      totalMusicsec = `0${totalMusicsec}`;
    }
    musicDuration.innerText = `${totalMusicmin}:${totalMusicsec}`;
  });
  let currentMusicmin = Math.floor(currentTime / 60);
  let currentMusicsec = Math.floor(currentTime % 60);
  if (currentMusicsec < 10) {
    currentMusicsec = `0${currentMusicsec}`;
  }
  musicCurrentTime.innerText = `${currentMusicmin}:${currentMusicsec}`;
});

// ----------- Tua nhạc-------
progress.addEventListener("click", (e) => {
  let progressWidthval = progress.clientWidth;
  let clickOffsetX = e.offsetX;
  let songDuration = songAudio.duration;
  songAudio.currentTime = (clickOffsetX / progressWidthval) * songDuration;
  playSong();
});
