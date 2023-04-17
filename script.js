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

const cd = document.querySelector(".cd");
const cdThumb = document.querySelector(".cd-thumb");
const musicName = document.querySelector("header h2");
const musicArtist = document.querySelector("header h3");
const progress = document.querySelector(".progress");
const progressbar = document.querySelector(".progress-bar");
const playBtn = document.querySelector("#btn-play");
const prevBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");
const randomBtn = document.querySelector("#btn-random");
const playbackTimeBtn = document.querySelector("#btn-playback-time");
const playlist = document.querySelector(".playlist");

let musicIndex = 0;
let autoplay = 0;
let timer = 0;
let play_song = false;
let isRandom = false;
let isRepeat = false;
let isPlaybackTime = false;
let songAudio = document.createElement("audio");

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playLiMusic();
});

function loadMusic(index) {
  reset_music();
  autoPlaySong();
  musicName.innerText = allMusic[index].name;
  musicArtist.innerText = allMusic[index].artist;
  cdThumb.style.backgroundImage = `url(${allMusic[index].img})`;
  songAudio.src = allMusic[index].src;
  songAudio.load();

  timer = setInterval(range_slider, 1000);
}
loadMusic(musicIndex);

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

// Play Music
function musicPlay() {
  if (play_song == false) {
    playsong();
  } else {
    pausesong();
  }
}
function playsong() {
  songAudio.play();
  cdThumbAnimation.play();
  play_song = true;
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pausesong() {
  songAudio.pause();
  cdThumbAnimation.pause();
  play_song = false;
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// --------- Next Music ----------
function nextMusic() {
  if (musicIndex < allMusic.length - 1) {
    musicIndex++;
    loadMusic(musicIndex);
    playsong();
    playLiMusic();
  } else {
    musicIndex = 0;
    loadMusic(musicIndex);
    playsong();
    playLiMusic();
  }
}
// --------- Prev Music ----------
function prevMusic() {
  if (musicIndex > 0) {
    musicIndex--;
    loadMusic(musicIndex);
    playsong();
    playLiMusic();
  } else {
    musicIndex = allMusic.length - 1;
    loadMusic(musicIndex);
    playsong();
    playLiMusic();
  }
}
nextBtn.onclick = function () {
  if (isRandom) {
    playRandomSong();
    nextMusic();
  } else {
    nextMusic();
  }
};

prevBtn.onclick = function () {
  if (isRandom) {
    playRandomSong();
    prevMusic();
  } else {
    prevMusic();
  }
};

// -------- Tự chuyển bài ----------
// songAudio.onended = function () {
//   if (isRepeat) {
//     songAudio.play();
//   } else {
//     nextBtn.click();
//   }
// };

function autoPlaySong() {
  if (autoplay == 1) {
    autoplay = 1;
  } else {
    autoplay = 1;
  }
}

function range_slider() {
  if (songAudio.ended) {
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    if (autoplay == 1 && isRandom) {
      playRandomSong();
      nextMusic();
      loadMusic(musicIndex);
      playsong();
    }
    if (autoplay == 1) {
      nextMusic();
      loadMusic(musicIndex);
      playsong();
    }
  }
}
// -------- Random Music --------

randomBtn.onclick = function (e) {
  isRandom = !isRandom;
  randomBtn.classList.toggle("pink", isRandom);
};

function playRandomSong() {
  let newMusicIndex;
  do {
    newMusicIndex = Math.floor(Math.random() * allMusic.length);
  } while (newMusicIndex === musicIndex);
  musicIndex = newMusicIndex;
}

// --------Repeat Music----------

// -------- Playback time --------

// ------------- Update progress -------
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
  playsong();
});

// -------- Reset music ---------
function reset_music() {
  progressbar.value = 0;
}

// -------- Playlist---------
const ulMusic = document.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
  let song = `<div class="song" Musicindex="${i}">
                <div class="left">
                  <div
                    class="img-song"
                    style="background-image: url('${allMusic[i].img}')"
                  ></div>
                  <div class="music-name">
                    <h3 class="name">${allMusic[i].name}</h3>
                    <p class="artist">${allMusic[i].artist}</p>
                  </div>
                </div>
                <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
                </div>
              </div>`;
  playlist.insertAdjacentHTML("beforeend", song);
}

// -----------------------------------------------
const allSongMusic = playlist.querySelectorAll(".song ");

function playLiMusic() {
  for (let j = 0; j < allSongMusic.length; j++) {
    if (allSongMusic[j].classList.contains("active")) {
      allSongMusic[j].classList.remove("active");
    }
    if (allSongMusic[j].getAttribute("Musicindex") == musicIndex) {
      allSongMusic[j].classList.add("active");
    }
    allSongMusic[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(index) {
  let getSongIndex = index.getAttribute("Musicindex");
  musicIndex = getSongIndex;
  loadMusic(musicIndex);
  playsong();
  playLiMusic();
}
