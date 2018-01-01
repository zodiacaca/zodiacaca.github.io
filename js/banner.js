
window.onload = function() {

  // canvas
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // set canvas to the window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // particle array
  var particles = [];
  
  // colors
  var colorPalette = {
      bg: {r:12,g:9,b:29},
      matter: [
        {r:36,g:18,b:42}, // darkPurple
        {r:78,g:36,b:42}, // burningAsh
        {r:252,g:178,b:96}, // magma
        {r:253,g:238,b:152} // flare
      ]
  };
  
  // configuration
  var config = {
    particleNumber: 320,
    maxParticleSize: 10,
    maxSpeed: 35,
    colorVariation: 50
  };
  

  // remove particles no longer in the view
  var cleanUpArray = function() {
      particles = particles.filter((p) => { 
        return (p.x > 0 && p.x < canvas.width && p.y > 0 && p.y < canvas.height); 
      });
  };
  
  // draw particles
  var drawParticle = function(x, y, r, c) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2*Math.PI, false); 
      ctx.fillStyle = c;
      ctx.fill();
  };
  
   // find matters' next positions
  var updateParticlePosition = function(p) {
      p.x += p.s * Math.sin(p.d);
      p.y += p.s * Math.cos(p.d);
      return p;
  };
  
  // provides some nice color variations
  // accepts an rgb object
  // returns a modified rgba object or a rgba string if true is passed in for argument 2
  var colorVariation = function(color, returnString) {
      var r,g,b,a;
      r = Math.round((Math.random() - 0.5) * config.colorVariation + color.r); 
      g = Math.round((Math.random() - 0.5) * config.colorVariation + color.g);
      b = Math.round((Math.random() - 0.5) * config.colorVariation + color.b);
      a = Math.random() + 0.5;
      if (returnString) {
          return "rgba(" + r + "," + g + "," + b + "," + a + ")";
      } else {
          return {r:r,g:g,b:b,a:a};
      }
  };
  
  // particle constructor
  var Particle = function(x, y) {
      // X coordinate
      this.x = x || Math.random() * canvas.width;
      // Y coordinate
      this.y = y || Math.random() * canvas.height;
      // radius
      this.r = Math.ceil(Math.random() * config.maxParticleSize);
      // color of the matters, make some randomness
      this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
      // speed of which the rock travels
      this.s = Math.random() * config.maxSpeed;
      // direction the matter flies
      this.d = Math.random() * 2 * Math.PI;
  };

  var initParticles = function(numParticles, x, y) {
      for (var i = 0; i < numParticles; i++) {
          particles.push(new Particle(x, y));
      }
  };
  
  var drawBg = function(ctx, color) {
      ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
      ctx.fillRect(0,0,canvas.width,canvas.height);
  };

  
  var frame = function() {
    // draw background to cover old pixels
    drawBg(ctx, colorPalette.bg);
    // update particle models to new positions
    particles.map((p) => {
      return updateParticlePosition(p);
    });
    // draw em'
    particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c);
    });
    
    window.requestAnimationFrame(frame);
  };
  
  // first particle explosion
  initParticles(config.particleNumber * 2);

  // first frame
  frame();
  
  
  // listener
  document.body.addEventListener("click", function(event) {
      var x = event.clientX,
          y = event.clientY;
      cleanUpArray(); // clear a bit
      initParticles(config.particleNumber, x, y);
  });
};