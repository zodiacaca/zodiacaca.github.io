
var init = function () {
  setBackground('rgba(0, 0, 0, 0.2)');
  
  // for (var i = 0; i < 500; i++) {
    // var alpha = Math.random() * Math.rad(360); // xy
    // var beta = Math.random() * Math.rad(360);  // vertical plane
    
    // var radius = 200;
    // var pos = {
      // x : radius * Math.cos(beta) * Math.cos(alpha),
      // y : radius * Math.cos(beta) * Math.sin(alpha),
      // z : radius * Math.sin(beta)
    // };
    
    // entities.push(new Particle(pos.x, pos.y, pos.z, 5, 60));
  // }
  
  for (var i = -5; i <= 5; i++) {
    for (var ii = -5; ii <= 5; ii++) {
      for (var iii = -5; iii <= 5; iii++) {
        entities.push(new Particle(i * 50, ii * 50, iii * 50, 5, (iii + 5) * 5));
      }
    }
  }
};

var render = function () {
  requestAnimationFrame(render);
  
  var rotateAxis = Math.normalize({ x: 0, y: 1, z: 0 });
  for (var i = 0; i < entities.length; i++) {
    if (entities[i]) {
      entities[i].position.rotateAroundAxis(rotateAxis, Math.rad(1));
    }
  }
};

(function () {
  init();
  // render();
} () );

