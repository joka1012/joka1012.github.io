const texts = [
  { line1: "Kai Jones", line2: "Software Developer" },
  { line1: "ジョーンズ 海", line2: "ソフトウェア開発者" }
];

let index = 0;

function switchText() {
  const l1 = document.getElementById("line1");
  const l2 = document.getElementById("line2");

  // Reset animation
  l1.style.animation = "none";
  l2.style.animation = "none";

  // Force reflow to restart animation
  void l1.offsetWidth;
  void l2.offsetWidth;

  // Update text
  index = (index + 1) % texts.length;
  l1.textContent = texts[index].line1;
  l2.textContent = texts[index].line2;

  // Trigger animation again
  l1.style.animation = "fadeSlideIn 1.5s ease forwards";
  l2.style.animation = "fadeSlideIn 1.5s ease forwards";
}

document.addEventListener("DOMContentLoaded", () => {
  setInterval(switchText, 5000);
});