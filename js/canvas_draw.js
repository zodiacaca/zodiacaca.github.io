
Paint.init = function () {
  this.canvas = new Canvas($('.card-item')[0]);
  this.canvas.background = 'rgba(0, 0, 15, 0.2)';
  
  var hsl = 'hsl(%hue, 100%, 70%)';
  
  // for (var i = 0; i < 500; i++) {
    // var alpha = Math.random() * Math.rad(360); // xy
    // var beta = Math.random() * Math.rad(360);  // vertical plane
    
    // var radius = 200;
    // var pos = {
      // x : radius * Math.cos(beta) * Math.cos(alpha),
      // y : radius * Math.cos(beta) * Math.sin(alpha),
      // z : radius * Math.sin(beta)
    // };
    
    // new Particle(this.canvas, pos.x, pos.y, pos.z, 10, hsl.replace('%hue', 60));
  // }
  
  for (var i = -4; i <= 4; i++) {
    for (var ii = -4; ii <= 4; ii++) {
      for (var iii = -4; iii <= 4; iii++) {
        new Particle(this.canvas, i * 80, ii * 80, iii * 80, 10, hsl.replace('%hue', 255 - (iii + 8) * 15));
      }
    }
  }
};

Paint.painting = function () {
  var rotateAxis = Math.normalize({ x: 0, y: 1, z: 0.1 });
  for (var i = 0; i < this.canvas.entities.length; i++) {
    if (this.canvas.entities[i]) {
      this.canvas.entities[i].position.rotateAroundAxis(rotateAxis, Math.rad(0.1));
    }
  }
};

Render.init();
