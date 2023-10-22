
// Dark Mode
const bgControll = document.getElementById("bgControll");
const sun = `<i id="sun" class="bx bx-sun"></i>`;
bgControll.innerHTML = sun;
document.getElementById("bgControll").addEventListener("click", () => {
  document.getElementById("body").classList.toggle("bgCol");
  document.querySelector(".musicPlayer").style.color = "black";
  document.getElementById("header").classList.toggle("headCol");
  document.getElementById("searchBar").classList.toggle("barInput");
  document.getElementById("plusMember").classList.toggle("plusMeme");
  document.getElementById("hamBur").classList.toggle("whiteBar");
  document.querySelector(".bx-search"),
    document.querySelector(".bx-chevron-down");
  document.querySelector(".subNav").classList.toggle("whiteBar");

  if (bgControll.innerHTML === sun) {
    const moon = `<i class='bx bx-moon'></i>`;
    bgControll.innerHTML = moon;
  } else {
    const sun = `<i id="sun" class="bx bx-sun"></i>`;
    bgControll.innerHTML = sun;
  }
});