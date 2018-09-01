
var colors = [];

function formCube() {
  var hsl = 'hsl(%hue, 100%, 60%)';
  
  var points = [];
  
  var gap = 320;
  
  for (var i = -2; i <= 2; i++) {
    for (var ii = -2; ii <= 2; ii++) {
      for (var iii = -2; iii <= 2; iii++) {
        var pos = {
          x: i * gap - gap / 4,
          y: ii * gap,
          z: iii * gap
        };
        var color = hsl.replace('%hue', 220 - points.length * 0.2);

        points.push(new Transform(new Axis3(pos.x, pos.y, pos.z)));
        colors.push(color);
      }
    }
  }

  var blues = points.length;
  for (var i = -2; i <= 2; i++) {
    for (var ii = -2; ii <= 2; ii++) {
      for (var iii = -2; iii <= 2; iii++) {
        var pos = {
          x: i * gap + gap / 4,
          y: ii * gap,
          z: iii * gap
        };
        var color = hsl.replace('%hue', 10 + (points.length - blues) * 0.4);

        points.push(new Transform(new Axis3(pos.x, pos.y, pos.z)));
        colors.push(color);
      }
    }
  }

  return points;
};

var velDelay = [];
Paint.init = function () {
  this.canvas = new Canvas($('body')[0], true);
  this.canvas.background = 'rgba(0, 0, 15, 1)';

  this.desiredPositions = formCube();
  for (var i = 0; i < this.desiredPositions.length; i++) {
    new Particle(this.canvas, 0, 0, 0, 3, colors[i]);
    velDelay.push(new Axis3());
  }
};

Paint.tick = 1;
Paint.painting = function () {
  var rotateAxis1 = Math.norm(new Axis3(0.1, 1, 0));
  var rotateAxis2 = Math.norm(new Axis3(-0.1, 1, 0));
  for (var i = 0; i < 125; i++) {
    this.desiredPositions[i].rotateAroundAxis(rotateAxis1, Math.rad(-0.1));
  }
  for (var i = 125; i < this.desiredPositions.length; i++) {
    this.desiredPositions[i].rotateAroundAxis(rotateAxis2, Math.rad(0.2));
  }
  for (var i = 0; i < this.canvas.entities.length; i++) {
    lerpVector(i, this.canvas.entities[i].transform.position, this.desiredPositions[i].position);
  }
  // console.log(Math.len(this.canvas.entities[0].getVelocity()));
  // console.log(this.canvas.entities[0].getVelocity());
  this.tick++;
};

Render.init();

function lerpVector(i, vFrom, vTo) {
  var path = new Axis3(
    vTo.x - vFrom.x,
    vTo.y - vFrom.y,
    vTo.z - vFrom.z
  );
  for (var key in velDelay[i]) {
    velDelay[i][key] += path[key] * 0.01;
    velDelay[i][key] *= 0.9;
  }
  for (var key in vFrom) {
    vFrom[key] += velDelay[i][key];
  }
};

