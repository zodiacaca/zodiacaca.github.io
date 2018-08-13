
var CIRCLE = 2 * Math.PI;
var CONFIG = {
  particle: {
    count: 500,
    size: 5 // the size of the particle what we see at the origin
  },
  shape: {
    sphere: { radius: 200 }
  },
  
  camera: {
    position: { x: 0, y: 0, z: -750 }
  },
  offset: { xAxis: 0.5, yAxis: 0.5 }
};

var PARTICLE = function (position) {
  this.x = position.x;
  this.y = position.y;
  this.z = position.z;
  this.size = CONFIG.particle.size;
  this.color = 'hsl(%hue, 100%, 70%)';
  
  this.init();
};
PARTICLE.prototype = {
  init : function () {
    this.viewPosition = { x: 0, y: 0, z: 0 };
    this.color = this.color.replace('%hue', 60);
  },
  rotateAroundAxis : function (ang, axis) {
    var x = this.x,
          y = this.y,
          z = this.z;
    var u = axis.x,
          v = axis.y,
          w = axis.z;
    var sinTheta = Math.sin(ang),
          cosTheta = Math.cos(ang);
    
    this.x = u * (u * x + v * y + w * z) * (1 - cosTheta) + x * cosTheta + (v * z - w * y) * sinTheta;
    this.y = v * (u * x + v * y + w * z) * (1 - cosTheta) + y * cosTheta + (w * x - u * z) * sinTheta;
    this.z = w * (u * x + v * y + w * z) * (1 - cosTheta) + z * cosTheta + (u * y - v * x) * sinTheta;
  },
  getDistance : function () {
    var sum = 0;
    for (var key in CONFIG.camera.position) {
      sum += Math.pow(this[key] - CONFIG.camera.position[key], 2);
    }
    
    return Math.sqrt(sum);
  },
  getDepth : function () {
    this.size = CONFIG.particle.size * Math.abs(CONFIG.camera.position.z) / this.getDistance();
    for (var key in this.viewPosition) {
      this.viewPosition[key] = this[key] * Math.abs(CONFIG.camera.position.z) / this.getDistance();
    }
  }
};

var FORM = {
  sphere : function () {
    // xy
    var alpha = Math.random() * CIRCLE;
    // vertical plane
    var beta = Math.random() * CIRCLE;
    
    return {
      x : CONFIG.shape.sphere.radius * Math.cos(beta) * Math.cos(alpha),
      y : CONFIG.shape.sphere.radius * Math.cos(beta) * Math.sin(alpha),
      z : CONFIG.shape.sphere.radius * Math.sin(beta)
    };
  }
};

var RENDERER = {
  init : function () {
    this.setupVariables();
    this.initParticles();
    this.drawFigure();
  },
  setupVariables : function () {
    this.particles = [];
    
    this.$container = $($('.card-item')[0]);
    this.width = this.$container.width();
    this.height = this.$container.height();
    this.offset = { x: this.width * CONFIG.offset.xAxis, y: this.height * CONFIG.offset.yAxis };
    
    this.$canvas = $('<canvas />').attr({ width: this.width, height: this.height }).appendTo(this.$container);
    this.context = this.$canvas.get(0).getContext('2d');
    
    this.tick = 0;
  },
  initParticles : function () {
    for (var i = 0; i < CONFIG.particle.count; i++) {
      this.particles.push(new PARTICLE(FORM.sphere()));
    }
  },
  drawFigure : function () {
    requestAnimationFrame(this.drawFigure.bind(this));
    
    this.context.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.context.fillRect(0, 0, this.width, this.height);
    
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].rotateAroundAxis(0.002 * CIRCLE, this.normalize({ x: 1, y: 1, z: 1 }));
      
      this.particles[i].getDepth();
      var depthPos = this.particles[i].viewPosition;
      
      this.context.beginPath();
      this.context.fillStyle = this.particles[i].color;
      this.context.arc(depthPos.x + this.offset.x, depthPos.y + this.offset.y, this.particles[i].size, 0, CIRCLE, false);
      this.context.fill();
      
      this.tick++;
      this.tick %= 300;
      if (this.tick == 0) {
        
      }
    }
  },
  
  normalize : function (obj) {
    var sum = 0;
    for (var key in obj) {
      sum += Math.pow(obj[key], 2);
    }
    for (var key in obj) {
      obj[key] = obj[key] / Math.sqrt(sum);
    }
    
    return obj;
  }
};

(function () {
  RENDERER.init();
} () );

