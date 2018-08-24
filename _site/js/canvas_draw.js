
function formSphere() {
  var points = [];
  for (var i = 0; i < Math.pow(9, 3); i++) {
    var alpha = Math.random() * Math.rad(360); // xy
    var beta = Math.random() * Math.rad(360);  // vertical plane

    var radius = 200;
    var pos = {
      x : radius * Math.cos(beta) * Math.cos(alpha),
      y : radius * Math.cos(beta) * Math.sin(alpha),
      z : radius * Math.sin(beta)
    };

    points.push(new Transform(new Axis3(pos.x, pos.y, pos.z)));
  }

  return points;
}

function formCube() {
  var points = [];
  for (var i = -4; i <= 4; i++) {
    for (var ii = -4; ii <= 4; ii++) {
      for (var iii = -4; iii <= 4; iii++) {
        var pos = {
          x : i * 80,
          y : ii * 80,
          z : iii * 80
        };

        points.push(new Transform(new Axis3(pos.x, pos.y, pos.z)));
      }
    }
  }

  return points;
}

Paint.init = function () {
  this.canvas = new Canvas($('.card-item')[0]);
  this.canvas.background = 'rgba(0, 0, 15, 0.2)';

  var hsl = 'hsl(%hue, 100%, 70%)';

  // var points = formSphere();
  // for (var i = 0; i < Math.pow(9, 3); i++) {
    // new Particle(this.canvas, points[i].x, points[i].y, points[i].z, 10, hsl.replace('%hue', 255 - i * 0.4));
  // }

 this.desiredPositions = formCube();
  for (var i = 0; i < Math.pow(9, 3); i++) {
    new Particle(this.canvas, 0, 0, 0, 10, hsl.replace('%hue', 220 - i * 0.1));
  }
};

Paint.tick = 1;
var maxV = 6;
Paint.painting = function () {
  var rotateAxis = Math.norm(new Axis3(0, 1, 0.1));
  if (this.tick % 240 == 0) {
    this.desiredPositions = formCube();
    for (var i = 0; i < this.desiredPositions.length; i++) {
      this.desiredPositions[i].rotateAroundAxis(rotateAxis, Math.rad(this.tick * 0.2));
    }
  } else if (this.tick % 120 == 0) {
    this.desiredPositions = formSphere();
    for (var i = 0; i < this.desiredPositions.length; i++) {
      this.desiredPositions[i].rotateAroundAxis(rotateAxis, Math.rad(this.tick * 0.2));
    }
  }
  for (var i = 0; i < this.desiredPositions.length; i++) {
    this.desiredPositions[i].rotateAroundAxis(rotateAxis, Math.rad(0.2));
  }
  for (var i = 0; i < this.canvas.entities.length; i++) {
    transformLerp(this.canvas.entities[i].transform, this.desiredPositions[i]);
  }
  // console.log(Math.len(this.canvas.entities[0].velocity()));
  // console.log(this.canvas.entities[0].velocity());
  this.tick++;
};

Render.init();

function transformLerp(trFrom, trTo) {
  var path = new Axis3(
    trTo.position.x - trFrom.position.x,
    trTo.position.y - trFrom.position.y,
    trTo.position.z - trFrom.position.z
  );
  var pathNorm = Math.norm(path);
  for (var key in pathNorm) {
    pathNorm[key] *= maxV;
  }
  for (var key in trFrom.position) {
    trFrom.position[key] += pathNorm[key];
  }
};

