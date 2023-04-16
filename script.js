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
    src: "./music/Mặt mộc.mp3",
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
    name: "Hai Mươi Hai",
    artist: "Amee x Hứa Kim Tuyền「Cukak Remix」",
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

const wrapper = document.querySelector(".wrapper");
const musicPlayer = wrapper.querySelector(".music-player");
const cd = wrapper.querySelector(".cd");
const cdAnimation = wrapper.querySelector(".cd-thumb");
const cdThumb = wrapper.querySelector(".cd-thumb img");
const musicName = wrapper.querySelector("header h2");
const musicArtist = wrapper.querySelector("header h3");
const progress = wrapper.querySelector(".progress");
const progressbar = wrapper.querySelector(".progress-bar");
const randomBtn = wrapper.querySelector("#btn-random");
// const repeatBtn = wrapper.querySelector("#btn-repeat");
const playBtn = wrapper.querySelector("#btn-play");
const prevBtn = wrapper.querySelector("#btn-prev");
const nextBtn = wrapper.querySelector("#btn-next");
const playbackTime = wrapper.querySelector("#btn-playback-time");
const playlist = wrapper.querySelector(".playlist");

let musicIndex = 0;
let autoplay = 0;
let timer = 0;
let play_song = false;
let songAudio = document.createElement("audio");

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playLiMusic();
});

function loadMusic(index) {
  reset_music();
  autoplay_song();
  musicName.innerText = allMusic[index].name;
  musicArtist.innerText = allMusic[index].artist;
  cdThumb.src = allMusic[index].img;
  songAudio.src = allMusic[index].src;
  songAudio.load();

  timer = setInterval(range_slider, 1000);
}
loadMusic(musicIndex);

// Play music
function musicPlay() {
  if (play_song == false) {
    playsong();
  } else {
    pausesong();
  }
}
function playsong() {
  songAudio.play();
  play_song = true;
  cdAnimation.classList.add("animation-cd");
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pausesong() {
  songAudio.pause();
  play_song = false;
  cdAnimation.classList.remove("animation-cd");
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}
// Xử lý phóng to / thu nhỏ CD

// -------- Random Music --------
randomBtn.addEventListener("click", function (event) {
  event.currentTarget.classList.toggle("pink");
});

// // --------Repeat Music----------
// repeatBtn.addEventListener("click", function () {
//   repeatBtn.classList.add("pink");
// });

// repeatBtn.addEventListener("click", function () {
//   repeatBtn.classList.remove("pink");
// });

// -------- Playback time --------
playbackTime.addEventListener("click", function (event) {
  event.currentTarget.classList.toggle("pink");
});

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
  } else {
    musicIndex = allMusic.length - 1;
    loadMusic(musicIndex);
    playsong();
  }
}
nextBtn.addEventListener("click", () => {
  nextMusic();
});

prevBtn.addEventListener("click", () => {
  prevMusic();
});

// -------- Tự chuyển bài ----------
function autoplay_song() {
  if (autoplay == 1) {
    autoplay = 1;
  } else {
    autoplay = 1;
  }
}

function range_slider() {
  if (songAudio.ended) {
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    if (autoplay == 1) {
      nextMusic();
      loadMusic(musicIndex);
      playsong();
    }
  }
}
// ------------- Update progress -------
songAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressbar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current");
  let musicDuration = wrapper.querySelector(".duration");
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
const ulMusic = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
  let liMusic = `<li Musicindex="${i}">
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
              </li>`;
  ulMusic.insertAdjacentHTML("beforeend", liMusic);
}

// -----------------------------------------------

const allLiMusic = ulMusic.querySelectorAll("li");
function playLiMusic() {
  for (let j = 0; j < allLiMusic.length; j++) {
    if (allLiMusic[j].classList.contains("active")) {
      allLiMusic[j].classList.remove("active");
    }
    if (allLiMusic[j].getAttribute("Musicindex") == musicIndex) {
      allLiMusic[j].classList.add("active");
    }
    allLiMusic[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(index) {
  let getLiIndex = index.getAttribute("Musicindex");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playsong();
  playLiMusic();
}
