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
    new Ball(240, row(7), orange),
  ]
];
