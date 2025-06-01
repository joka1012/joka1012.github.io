document.getElementById("cv-button").addEventListener("click", slidepage);

function slidepage() {
  document.getElementById("cv-button").classList.add("hidden");
  const page2 = document.getElementById("secondPage");
  const page1 = document.getElementById("mainContent");
  page1.classList.remove("visible");
  page1.classList.add("hidden-left");
  page2.classList.remove("hidden-right");
  page2.classList.add("visible");
  document.getElementById("home-button").classList.remove("hidden");
}

document.getElementById("home-button").addEventListener("click", slidebackpage);

function slidebackpage() {
  document.getElementById("home-button").classList.add("hidden");
  const page2 = document.getElementById("secondPage");
  const page1 = document.getElementById("mainContent");
  page2.classList.remove("visible");
  page2.classList.add("hidden-right");
  page1.classList.remove("hidden-left");
  page1.classList.add("visible");
  document.getElementById("cv-button").classList.remove("hidden");
}