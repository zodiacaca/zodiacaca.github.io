
Paint.init = function () {
  
};

Paint.tick = 1;
Paint.painting = function () {
  
  this.tick++;
};

// Render.init();

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

