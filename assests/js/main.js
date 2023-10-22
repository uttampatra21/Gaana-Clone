// BOOT UP
window.addEventListener("load", bootUp);
function bootUp() {
  fetchRenderSection();
}

// API FETCHING
const fetchRenderSection = async () => {
  const response = await fetch("/assests/js/gaana.json");
  const data = await response.json();
  const { cardbox, slider } = data;

  slider.map((x) => {
    const { songscards } = x;
    sliderData(songscards);
  });

  if (Array.isArray(cardbox) && cardbox.length) {
    cardbox.forEach((item) => {
      const { songsbox, songscards } = item;
      renderSection(songsbox, songscards);
    });
  }
};

const renderSection = (title, songlist) => {
  renderData(title, songlist);
};

// RENDER DATA

const renderData = (title, songlist) => {
  const movieCont = document.createElement("div");
  movieCont.innerHTML = `
            <h2 class="songCetagories">${title}</h2>
            <div class="songCard" >${songlist
              .map((item) => {
                return `
                <div class="songItem" onclick="playSong(this)" data-songobj='${JSON.stringify(
                  item
                )}'>
              <div class="songImg">
                <img
                  src="${item.image_source}"
                  alt="${item.album_name}"
                />
                <div class="overlay"></div>
              </div>
              <p>${item.song_name}</p>
              <small>${item.album_name}</small>
            </div>
                `;
              })
              .join(" ")}</div>
          `;
  document.getElementById("cetagories").appendChild(movieCont);
};

function playSong(i) {
  const data = JSON.parse(i.dataset.songobj);
  currentSong(data);
}

function currentSong(data) {
  // songObj = data;
  // audioPlayer.play();
  // audioPlayer.pause();
  // audioPlayer.currentTime = 0;
  // audioPlayer.src = data.quality.low;
  updatePlayer(data);
}

//! ---------------------------------  MUSIC CONTROLER ----------------------------- !//
function updatePlayer(data) {
  const songImage = document.getElementById("songIcon");
  const songTitle = document.getElementById("songTitle");
  const songArtist = document.getElementById("songArtist");
  const currentTime = document.getElementById("currentTime");
  const endingTime = document.getElementById("endingTime");
  const playBtn = document.getElementById("playBtn");
  const playSvg = document.getElementById("playSvg");
  const progressRange = document.getElementById("progressRange");
  songImage.src = data.image_source;
  songTitle.innerHTML = data.song_name;
  songArtist.innerHTML = data.album_name;
  console.log(data);
  const audio = new Audio();

  if (audio.paused || audio.currentTime <= 0) {
    audio.currentTime = 0;
    audio.src = data.quality.low;
    audio.play();
    document.getElementById("play").style.display = "none";
    document.getElementById("pause").style.display = "flex";
  } else {
    audio.pause();
    document.getElementById("play").style.display = "flex";
    document.getElementById("pause").style.display = "none";
  }

  playBtn.addEventListener("click", () => {
    if (audio.paused || audio.currentTime <= 0) {
      audio.play();
      document.getElementById("play").style.display = "none";
      document.getElementById("pause").style.display = "flex";
    } else {
      audio.pause();
      document.getElementById("play").style.display = "flex";
      document.getElementById("pause").style.display = "none";
    }
  });

  audio.addEventListener("timeupdate", () => {
    const currentTime = parseInt((audio.currentTime / audio.duration) * 100);
    progressRange.value = currentTime;
    progressRange.addEventListener("change", () => {
      audio.currentTime = (progressRange.value * audio.duration) / 100;
    });
  });
}

//! -------------------------------------- SLIDER
const sliderData = (data) => {
  const musicSlider = data
    .map((x) => {
      return `
          <li onclick="fetchSlider(this)" data-songobj='${JSON.stringify(x)}'>
            <div >
                <img src="${x.image_source}" title="${x.song_name}">
            </div>
          </li>`;
    })
    .join("");
  document.getElementById("music-slider").innerHTML = musicSlider;
};

function fetchSlider(data) {
  const songData = JSON.parse(data.dataset.songobj);
  createBanner(songData);
  // document.getElementById("overlay").style.display = "flex";
}

const createBanner = (data) => {
  const playList = data.playlist;
  const playData = playList
    .map((x) => {
      // console.log(x);
      return `
       
    `;
    })
    .join("");
  document.getElementById("overlay").innerHTML = playData;
};
