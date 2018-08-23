
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

    points.push(pos);
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
        
        points.push(pos);
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

  var points = formCube();
  for (var i = 0; i < Math.pow(9, 3); i++) {
    new Particle(this.canvas, points[i].x, points[i].y, points[i].z, 10, hsl.replace('%hue', 220 - i * 0.1));
  }
};

Paint.tick = 1;
Paint.painting = function () {
  var rotateAxis = Math.norm(new Axis3(0, 1, 0.1));
  if (this.tick % 120 == 0) {
    var points = formCube();
    for (var i = 0; i < this.canvas.entities.length; i++) {
      this.canvas.entities[i].transform.position.x = points[i].x;
      this.canvas.entities[i].transform.position.y = points[i].y;
      this.canvas.entities[i].transform.position.z = points[i].z;
      this.canvas.entities[i].transform.rotateAroundAxis(rotateAxis, Math.rad(this.tick * 0.2));
    }
  } else if (this.tick % 60 == 0) {
    var points = formSphere();
    for (var i = 0; i < this.canvas.entities.length; i++) {
      this.canvas.entities[i].transform.position.x = points[i].x;
      this.canvas.entities[i].transform.position.y = points[i].y;
      this.canvas.entities[i].transform.position.z = points[i].z;
      this.canvas.entities[i].transform.rotateAroundAxis(rotateAxis, Math.rad(this.tick * 0.2));
    }
  }
  for (var i = 0; i < this.canvas.entities.length; i++) {
    this.canvas.entities[i].transform.rotateAroundAxis(rotateAxis, Math.rad(0.2));
  }
  this.tick++;
};

Render.init();
