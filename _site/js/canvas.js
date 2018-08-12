
var CIRCLE = 2 * Math.PI;
var CONFIG = {
  particle: {
    count: 500,
    size: 5
  }
};
var DIMENSION = {
  center: { x: 0, y: 0 },
  distance: 750,
  radius: 200
};

var PARTICLE = function (position) {
  this.x = position.x + DIMENSION.center.x;
  this.y = position.y + DIMENSION.center.y;
  this.z = position.z;
  this.size = CONFIG.particle.size;
  this.color = 'hsl(%hue, 100%, 70%)';
  
  this.init();
};
PARTICLE.prototype = {
  init : function () {
    this.color = this.color.replace('%hue', 60);
  },
  rotateX : function (delta) {
    this.storePosition();
    
    this.y = this.position.y * Math.cos(delta) - this.position.z * Math.sin(delta) + DIMENSION.center.y;
    this.z = this.position.y * Math.sin(delta) + this.position.z * Math.cos(delta);
  },
  rotateY : function (delta) {
    this.storePosition();
    
    this.z = this.position.z * Math.cos(delta) - this.position.x * Math.sin(delta);
    this.x = this.position.z * Math.sin(delta) + this.position.x * Math.cos(delta) + DIMENSION.center.x;
  },
  rotateZ : function (delta) {
    this.storePosition();
    
    this.x = this.position.x * Math.cos(delta) - this.position.y * Math.sin(delta) + DIMENSION.center.x;
    this.y = this.position.x * Math.sin(delta) + this.position.y * Math.cos(delta) + DIMENSION.center.y;
  },
  storePosition : function () {
    this.position = {
      x: this.x - DIMENSION.center.x,
      y: this.y - DIMENSION.center.y,
      z: this.z
    }
  },
  getDepth : function () {
    this.size = CONFIG.particle.size * (this.z + DIMENSION.distance) / DIMENSION.distance;
  }
};

var FORM = {
  sphere : function () {
    // xy
    var alpha = Math.random() * CIRCLE;
    // vertical plane
    var beta = Math.random() * CIRCLE;
    
    return {
			x : DIMENSION.radius * Math.cos(beta) * Math.cos(alpha),
			y : DIMENSION.radius * Math.cos(beta) * Math.sin(alpha),
			z : DIMENSION.radius * Math.sin(beta)
		}
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
    DIMENSION.center = { x: this.width / 2, y: this.height / 2 };
		
		this.$canvas = $('<canvas />').attr({ width: this.width, height: this.height }).appendTo(this.$container);
		this.context = this.$canvas.get(0).getContext('2d');
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
      this.particles[i].rotateX(0.002 * CIRCLE);
      this.particles[i].rotateY(0.002 * CIRCLE);
      this.particles[i].rotateZ(0.002 * CIRCLE);
      this.particles[i].getDepth();
      
			this.context.beginPath();
			this.context.fillStyle = this.particles[i].color;
			this.context.arc(this.particles[i].x, this.particles[i].y, this.particles[i].size, 0, CIRCLE, false);
			this.context.fill();
		}
	}
};

(function () {
	RENDERER.init();
} () );

