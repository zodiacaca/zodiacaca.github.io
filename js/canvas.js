
var entities = [];

Math.rad = function (degree) {
  return degree / 360 * 2 * Math.PI;
}
Math.normalize = function (obj) {
  var sum = 0;
  for (var key in obj) {
    sum += Math.pow(obj[key], 2);
  }
  for (var key in obj) {
    obj[key] = obj[key] / Math.sqrt(sum);
  }
  
  return obj;
}

var CONFIG = {
  offset: { xAxis: 0.5, yAxis: 0.5 }
};


var Point2 = function (x, y) {
  this.x = x;
  this.y = y;
}

var Point3 = function (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};
Point3.prototype = {
  rotateAroundAxis : function (vector, angle) {
    var x = this.x,
          y = this.y,
          z = this.z;
    var u = vector.x,
          v = vector.y,
          w = vector.z;
    var sinTheta = Math.sin(angle),
          cosTheta = Math.cos(angle);
    
    this.x = u * (u * x + v * y + w * z) * (1 - cosTheta) + x * cosTheta + (v * z - w * y) * sinTheta;
    this.y = v * (u * x + v * y + w * z) * (1 - cosTheta) + y * cosTheta + (w * x - u * z) * sinTheta;
    this.z = w * (u * x + v * y + w * z) * (1 - cosTheta) + z * cosTheta + (u * y - v * x) * sinTheta;
  },
  getDistance : function () {
    var sum = 0;
    for (var key in Renderer.camera.position) {
      sum += Math.pow(this[key] - Renderer.camera.position[key], 2);
    }
    
    return Math.sqrt(sum);
  },
  get2D: function () {
    var point = new Point2(0, 0);
    var ratio = Math.abs(Renderer.camera.position.z) / (this.z - Renderer.camera.position.z);
    for (var key in point) {
      point[key] = this[key] * ratio;
    }
    
    return { x: point.x, y: point.y };
  }
};

var Particle = function (x, y, z, size, hue) {
  this.class = 'Particle';
  
  this.position = new Point3(x, y, z);
  this.size = size;
  this.color = 'hsl(%hue, 100%, 70%)';
  
  this.init(hue);
};
Particle.prototype = {
  init : function (hue) {
    this.color = this.color.replace('%hue', hue);
  }
};

var Renderer = {
  init : function () {
    this.setupVariables();
    this.initRender();
  },
  setupVariables : function () {
    this.$container = $($('.card-item')[0]);
    this.width = this.$container.width();
    this.height = this.$container.height();
    
    this.$canvas = $('<canvas />').attr({ width: this.width, height: this.height }).appendTo(this.$container);
    this.context = this.$canvas.get(0).getContext('2d');
    this.camera = {
      position: { x: 0, y: 0, z: -this.width / 2 }
    };
    this.offset = { x: this.width * CONFIG.offset.xAxis, y: this.height * CONFIG.offset.yAxis };
    
    this.background = 'rgba(0, 0, 255, 0)';
    
    this.tick = 0;
  },
  initRender : function () {
    requestAnimationFrame(this.initRender.bind(this));
    
    this['drawBackground']();
    for (var i = 0; i < entities.length; i++) {
      if (entities[i]) {
        this['draw' + entities[i].class](entities[i]);
      }
    }
  },
  
  drawBackground : function () {
    this.context.fillStyle = this.background;
    this.context.fillRect(0, 0, this.width, this.height);
  },
  drawParticle : function (entity) {
    if (entity.position.z > this.camera.position.z) {
      var depthPos = entity.position.get2D();
      
      this.context.beginPath();
      this.context.fillStyle = entity.color;
      this.context.arc(depthPos.x + this.offset.x, depthPos.y + this.offset.y, entity.size, 0, Math.rad(360), false);
      this.context.fill();
    }
  }
};

(function () {
  Renderer.init();
} () );

function setBackground(color) {
  Renderer.background = color;
}

