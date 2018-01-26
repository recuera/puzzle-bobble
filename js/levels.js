/* LEVELS */ 
function row(x){
  var rowDistance = 30 * Math.sqrt(3);
  return 30 + (rowDistance * x);
}

var levels = [
  [
    new Ball(30, row(0), red),
    new Ball(90, row(0), red),
    new Ball(150, row(0), orange),
    new Ball(210, row(0), orange),
    new Ball(270, row(0), blue),
    new Ball(330, row(0), blue),
    new Ball(390, row(0), green),
    new Ball(450, row(0), green),
    new Ball(60, row(1), red),
    new Ball(120, row(1), red),
    new Ball(180, row(1), orange),
    new Ball(240, row(1), orange),
    new Ball(300, row(1), blue),
    new Ball(360, row(1), blue),
    new Ball(420, row(1), green),
    new Ball(30, row(2), blue),
    new Ball(90, row(2), blue),
    new Ball(150, row(2), green),
    new Ball(210, row(2), green),
    new Ball(270, row(2), red),
    new Ball(330, row(2), red),
    new Ball(390, row(2), orange),
    new Ball(450, row(2), orange),
    new Ball(60, row(3), blue),
    new Ball(120, row(3), blue),
    new Ball(180, row(3), green),
    new Ball(240, row(3), green),
    new Ball(300, row(3), red),
    new Ball(360, row(3), red),
    new Ball(420, row(3), orange)
  ],
  [
    new Ball(210, row(0), orange),
    new Ball(270, row(0), orange),
    new Ball(240, row(1), red),
    new Ball(210, row(2), green),
    new Ball(240, row(3), red),
    new Ball(210, row(4), blue),
    new Ball(240, row(5), green),
    new Ball(210, row(6), blue),
    new Ball(240, row(7), orange)
  ],
  [
    new Ball(30, row(0), orange),
    new Ball(450, row(0), orange),
    new Ball(60, row(1), blue),
    new Ball(120, row(1), orange),
    new Ball(180, row(1), red),
    new Ball(240, row(1), green),
    new Ball(300, row(1), red),
    new Ball(360, row(1), green),
    new Ball(420, row(1), blue),
    new Ball(30, row(2), green),
    new Ball(450, row(2), green),
    new Ball(60, row(3), red),
    new Ball(120, row(3), green),
    new Ball(180, row(3), blue),
    new Ball(240, row(3), orange),
    new Ball(300, row(3), red),
    new Ball(360, row(3), orange),
    new Ball(420, row(3), blue),
    new Ball(210, row(4), blue),
    new Ball(240, row(5), green),
    new Ball(210, row(6), green)
  ],
  [
    new Ball(90, row(0), orange),
    new Ball(150, row(0), orange),
    new Ball(120, row(1), red),
    new Ball(90, row(2), green),
    new Ball(120, row(3), red),
    new Ball(90, row(4), red),
    new Ball(120, row(5), green),
    new Ball(90, row(6), blue),
    new Ball(120, row(7), orange),
    new Ball(330, row(0), blue),
    new Ball(390, row(0), blue),
    new Ball(360, row(1), green),
    new Ball(330, row(2), green),
    new Ball(360, row(3), red),
    new Ball(330, row(4), orange),
    new Ball(360, row(5), blue),
    new Ball(330, row(6), green),
    new Ball(360, row(7), orange)
  ]
];

/* MUSIC */ 
var music = new Audio("sounds/puzzle_bobble.mp3");
music.loop = true;
music.volume = 0.3;
var throwSound = new Audio("sounds/throw.wav");
throwSound.volume = 0.3;
var bounceSound = new Audio("sounds/bounce.wav");
var popSound = new Audio("sounds/pop.flac");
popSound.volume = 0.2;
var goSound = new Audio("sounds/go.wav");
goSound.volume = 0.3;
var readySound = new Audio("sounds/ready.wav");
readySound.volume = 0.3;
var failSound = new Audio("sounds/fail.wav");
var stickSound = new Audio("sounds/stick.wav");
var roofSound = new Audio("sounds/roof.wav");
readySound.volume = 0.2;
var levelSound = new Audio("sounds/level.wav");
var winSound = new Audio("sounds/win.wav");