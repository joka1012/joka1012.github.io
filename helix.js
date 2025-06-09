let time = 0;
let helixPoints = [];

let helixLength = 180;
let spacing = 10;
let radius = 50;

function setup() {
  if (window.innerWidth < 768) {
    remove(); // zerstört das WebGL-Canvas sofort
    noLoop(); // verhindert draw()
    return;
  }
  
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '0');

  noFill();
  strokeWeight(1.5);

  // Punkte vorberechnen (nur einmal)
  for (let i = 0; i < helixLength; i++) {
    let y = (i - helixLength / 2) * spacing;
    let theta = i * 0.2;
    let c = cos(theta);
    let s = sin(theta);
    helixPoints.push({ y, c, s });
  }
}

function draw() {
  clear();
  translate(340,0,0);
  rotateY(time);

  // Spirale 1
  stroke(0);
  beginShape();
  for (let p of helixPoints) {
    let x = p.c * radius;
    let z = p.s * radius;
    vertex(x, p.y, z);
  }
  endShape();

  // Spirale 2
  beginShape();
  for (let p of helixPoints) {
    let x = -p.c * radius;
    let z = -p.s * radius;
    vertex(x, p.y, z);
  }
  endShape();

  // Verbindungen
  for (let i = 0; i < helixPoints.length; i += 6) {
    let p = helixPoints[i];
    let x1 = p.c * radius;
    let z1 = p.s * radius;
    let x2 = -x1;
    let z2 = -z1;
    line(x1, p.y, z1, x2, p.y, z2);
  }

  time += 0.01; // ggf. noch langsamer für weniger Rechenlast
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}