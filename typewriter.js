const text = "Hi, Welcome to my page..";
const element = document.getElementById("section1");
const audio = document.getElementById("typeAudio");
const profileBlock = document.getElementById("profile-block");
const social = document.getElementById("social");
const cv = document.getElementById("cv-button");

// Individuelle Zeitpunkte (ms) für jedes Zeichen
const timings = [
  0, 100, 200,         // "Hi,"
  1000, 1100, 1200, 1300, 1400, 1500,
  1600, 1700, 1800, 1900, 2000, 2100,
  2200, 2300, 2400, 2500, 2600, 2700,
  2800, 2900, 3000     // " Welcome to my page.."
];

function startTyping() {
  const startButton = document.getElementById("start-button");
  social.classList.add("slide-down")

  // Entferne Button-Eigenschaften von start-button
  startButton.classList.replace("border-gray-300", "border-transparent");
  startButton.classList.remove("shadow", "cursor-pointer","hover:shadow-lg", "hover:scale-105");
  startButton.classList.add("fade-border");
  //startButton.classList.remove("border", "border-gray-300", "rounded-lg", "p-4", "shadow")

  // Zeige den Text
  element.classList.remove("hidden");

  // Starte Audio
  audio.play();

  // Typewriter Effekt mit Timing
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      element.textContent += text[i];
    }, timings[i]);
  }

  // Nach letztem Zeichen: zusammen nach oben + mainContent anzeigen
  const totalDuration = timings[timings.length - 1] + 500;
  setTimeout(() => {
    // Nach oben schieben
    document.getElementById("start-area").classList.add("slide-up");
    [startButton, element].forEach(el => el.classList.add("slide-down"));
    
    // Hauptinhalt einblenden
    const content = document.getElementById("mainContent");
    content.classList.remove("opacity-0");
    content.classList.add("opacity-100");
    social.classList.replace("opacity-0", "opacity-100");
    cv.classList.replace("opacity-0", "opacity-100");

  }, totalDuration);

}

document.getElementById("start-button").addEventListener("click", startTyping, { once: true });