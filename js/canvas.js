
var canvases = [];

Math.rad = function (degree) {
  return degree / 360 * 2 * Math.PI;
};
Math.norm = function (obj) {
  var sum = 0;
  for (var key in obj) {
    sum += Math.pow(obj[key], 2);
  }
  if (sum == 0) {
    return obj;
  } else {
    for (var key in obj) {
      obj[key] = obj[key] / Math.sqrt(sum);
    }

    return obj;
  }
};
Math.len = function (obj) {
  var sum = 0;
  for (var key in obj) {
    sum += Math.pow(obj[key], 2);
  }

  return Math.sqrt(sum);
};
Math.clamp = function (num, min, max) {
  if (num > max) {
    return max;
  } else if (num < min) {
    return min;
  } else {
    return num;
  }
};

var Axis2 = function (x = 0, y = 0) {
  this.x = x;
  this.y = y;
};
var Axis3 = function (x = 0, y = 0, z = 0) {
  this.x = x;
  this.y = y;
  this.z = z;
};
var Transform = function (vector, angle) {
  this.position = vector;
  this.rotation = angle;
};
Transform.prototype = {
  rotateAroundAxis : function (vector, angle) {
    var x = this.position.x,
          y = this.position.y,
          z = this.position.z;
    var u = vector.x,
          v = vector.y,
          w = vector.z;
    var sinTheta = Math.sin(angle),
          cosTheta = Math.cos(angle);

    this.position.x = u * (u * x + v * y + w * z) * (1 - cosTheta) + x * cosTheta + (v * z - w * y) * sinTheta;
    this.position.y = v * (u * x + v * y + w * z) * (1 - cosTheta) + y * cosTheta + (w * x - u * z) * sinTheta;
    this.position.z = w * (u * x + v * y + w * z) * (1 - cosTheta) + z * cosTheta + (u * y - v * x) * sinTheta;
  },
  getRelativePosition: function (canvas) {
    this.distance = this.position.z - (canvas.camera.position.z + canvas.camera.offsetZ);
    
    return new Axis3(this.position.x, this.position.y, this.distance);
  },
  get2D: function (canvas) {
    var point = new Axis3();
    var viewPosition = this.getRelativePosition(canvas);
    var ratio = Math.abs(canvas.camera.position.z) / this.distance;

    point.x = viewPosition.x * ratio;
    point.y = viewPosition.y * ratio;
    point.z = viewPosition.z;

    return point;
  }
};

var Particle = function (canvas, x, y, z, size, color) {
  this.id = 'entity_' + canvas.entities.length;
  this.class = 'Particle';

  this.transform = new Transform(new Axis3(x, y, z));
  this.lastTransform = new Transform(new Axis3(x, y, z));
  this.size = size;
  this.color = color;

  this.init(canvas);
};
Particle.prototype = {
  init : function (canvas) {
    canvas.entities.push(this);
  },
  getPerceivedSize : function (canvas) {
    var ratio = Math.abs(canvas.camera.position.z) / this.transform.distance;
    var size = this.size * ratio;

    return size;
  },
  getVelocity : function () {
    return {
      x: this.transform.position.x - this.lastTransform.position.x,
      y: this.transform.position.y - this.lastTransform.position.y,
      z: this.transform.position.z - this.lastTransform.position.z
    };
  },
  remove : function () {
    for (var i = 0; i < entities.length; i++) {
      if (entities.id == this.id) {
        entities[i] = undefined;
      }
    }
  }
};

var Canvas = function (container) {
  this.$container = $(container);

  this.entities = [];

  this.setup();
};
Canvas.prototype = {
  setup : function () {
    this.width = this.$container.width();
    this.height = this.$container.height();

    this.$canvas = $('<canvas />').attr({ width: this.width, height: this.height }).appendTo(this.$container);
    this.context = this.$canvas.get(0).getContext('2d');

    this.camera = {
      position: { x: 0, y: 0, z: -this.width / 2 },
      offsetZ: 0
    };
    this.changeFOV(90);
    this.offset = { x: this.width * 0.5, y: this.height * 0.5 };

    this.background = 'rgba(0, 0, 255, 0)';

    canvases.push(this);
  },
  draw : function () {
    var entitiesCopy = this.entities.slice();
    entitiesCopy.sort(function (a, b) {
      return b.transform.position.z - a.transform.position.z;
    });

    this['drawBackground']();
    for (var i = 0; i < entitiesCopy.length; i++) {
      if (this.entities[i]) {
        for (var key in this.entities[i].transform.position) {
          this.entities[i].lastTransform.position[key] = this.entities[i].transform.position[key];
        }
      }
      if (entitiesCopy[i]) {
        var pos = entitiesCopy[i].transform.get2D(this);
        if (pos.z > 0) {
          this['draw' + entitiesCopy[i].class](entitiesCopy[i], pos);
        }
      }
    }
  }
};
Canvas.prototype.changeFOV = function (fov) {
  this.FOV = fov;

  var tan = Math.tan(Math.rad(fov / 2));
  this.camera.offsetZ = -(tan * this.width / 2 - this.width / 2);
};
Canvas.prototype.drawBackground = function () {
  this.context.fillStyle = this.background;
  this.context.fillRect(0, 0, this.width, this.height);
};
Canvas.prototype.drawParticle = function (entity, pos) {
  var size = entity.getPerceivedSize(this);

  this.context.beginPath();
  this.context.fillStyle = entity.color;
  this.context.arc(pos.x + this.offset.x, pos.y + this.offset.y, size / 2, 0, Math.rad(360));
  this.context.fill();
};

var Paint = {
  init : function () {},
  painting : function (canvas) {}
};

var Render = {
  init : function () {
    Paint.init();
    this.frame();
  },
  frame : function () {
    requestAnimationFrame(Render.frame);

    for (var i = 0; i < canvases.length; i++) {
      Paint.painting();
      canvases[i].draw();
    }
  }
};

