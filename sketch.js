let walls = [];
let obstacles = [];
let ball;
let count = 0;

function setup() {
  createCanvas(400, 400);

  // walls (x, y, width, height)
  walls = [
    [190,120,250,3], [190,260,250,3],
    [67,145,3,50], [67,235,3,50],
    [313,145,3,50], [313,235,3,50],
    [41,170,50,3], [41,210,50,3],
    [337,210,50,3], [337,170,50,3],
    [18,190,3,40], [361,190,3,40]
  ];

  // obstacles
  obstacles = [
    {x:100,y:130,v:3},
    {x:215,y:130,v:3},
    {x:165,y:250,v:3},
    {x:270,y:250,v:3}
  ];

  // player
  ball = {x:40, y:190, r:6};
}

function draw() {
  background("lightyellow");

  // draw walls
  fill(0);
  for (let w of walls) {
    rectMode(CENTER);
    rect(w[0], w[1], w[2], w[3]);
  }

  // move + draw obstacles
  fill("red");
  for (let o of obstacles) {
    o.y += o.v;

    // bounce (top/bottom)
    if (o.y < 120 || o.y > 260) {
      o.v *= -1;
    }

    rect(o.x, o.y, 10, 10);
  }

  // movement
  if (keyIsDown(RIGHT_ARROW)) ball.x += 4;
  if (keyIsDown(LEFT_ARROW)) ball.x -= 4;
  if (keyIsDown(UP_ARROW)) ball.y -= 4;
  if (keyIsDown(DOWN_ARROW)) ball.y += 4;

  // collision with walls
  for (let w of walls) {
    if (collideRectCircle(w[0], w[1], w[2], w[3], ball.x, ball.y, ball.r*2)) {
      // simple pushback
      ball.x -= 2;
      ball.y -= 2;
    }
  }

  // collision with obstacles
  for (let o of obstacles) {
    if (dist(ball.x, ball.y, o.x, o.y) < 10) {
      ball.x = 40;
      ball.y = 190;
      count++;
    }
  }

  // draw player
  fill("blue");
  circle(ball.x, ball.y, ball.r*2);

  // text
  fill(0);
  textSize(16);
  text("Deaths: " + count, 250, 100);
}

// helper collision
function collideRectCircle(rx, ry, rw, rh, cx, cy, diameter) {
  let testX = cx;
  let testY = cy;

  if (cx < rx - rw/2) testX = rx - rw/2;
  else if (cx > rx + rw/2) testX = rx + rw/2;

  if (cy < ry - rh/2) testY = ry - rh/2;
  else if (cy > ry + rh/2) testY = ry + rh/2;

  let d = dist(cx, cy, testX, testY);
  return d <= diameter/2;
}