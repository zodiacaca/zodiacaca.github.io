
function formSphere() {
  var points = [];
  for (var i = 0; i < Math.pow(9, 3); i++) {
    var alpha = Math.random() * Math.rad(360); // xy
    var beta = Math.random() * Math.rad(360);  // vertical plane

    var radius = 550;
    var pos = {
      x : radius * Math.cos(beta) * Math.cos(alpha),
      y : radius * Math.cos(beta) * Math.sin(alpha),
      z : radius * Math.sin(beta)
    };

    points.push(new Transform(new Axis3(pos.x, pos.y, pos.z)));
  }

  return points;
};

function formCube() {
  var points = [];
  for (var i = -4; i <= 4; i++) {
    for (var ii = -4; ii <= 4; ii++) {
      for (var iii = -4; iii <= 4; iii++) {
        var pos = {
          x : i * 160,
          y : ii * 160,
          z : iii * 160
        };

        points.push(new Transform(new Axis3(pos.x, pos.y, pos.z)));
      }
    }
  }

  return points;
};

var velDelay = [];
Paint.init = function () {
  this.canvas = new Canvas($('body')[0], true);
  this.canvas.background = 'rgba(0, 0, 15, 1)';

  var hsl = 'hsl(%hue, 100%, 70%)';

 this.desiredPositions = formCube();
  for (var i = 0; i < Math.pow(9, 3); i++) {
    new Particle(this.canvas, 0, 0, 0, 4, hsl.replace('%hue', 220 - i * 0.1));
    velDelay.push(new Axis3());
  }
};

Paint.tick = 1;
Paint.painting = function () {
  var rotateAxis = Math.norm(new Axis3(0, 1, 0.1));
  for (var i = 0; i < this.desiredPositions.length; i++) {
    this.desiredPositions[i].rotateAroundAxis(rotateAxis, Math.rad(0.2));
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

