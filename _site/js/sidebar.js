
(function () {
  
  var inCardPool;
  var selected = 0;
  
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;
  
  window.onwheel = function (e) {
    
    if (inCardPool) {
      
      if (e.deltaY < 0) {
        if (selected > 0) { selected -= 1 }
      }
      if (e.deltaY > 0) {
        if (selected < $(".card-item").length - 1) { selected += 1 }
      }
      selectCard();
      
    }
    
  }

  /*
    tag-pool
  */
  function getTagListVerticalCenter() {
    var listHeight = $("#tag-list").height();
    $("#tag-pool").css("top", bodyHeight / 2 - listHeight / 2);
  }
  getTagListVerticalCenter();
  
  /* after document loaded */
  $(document).ready(function () {
    sceneOpen();
  });

  function sceneOpen() {
    // main parts
    $("#nav-slider").css("transform", "translateX(-100%)");
    $("#board-slider").css("background-color", "#333");
    $("#board-slider").css("transform", "translateX(" + $("#nav-slider").width() + "px)");
    $("#board-content").css("left", 0);
    // tag
    var left = getTagListLeftBorder();
    setTimeout(function () {
      $(".tag-item").css("background-position", (left - 5) + "vw 0");
    }, 600);
  }

  function getTagListLeftBorder() {
    // x position has been translated
    var left = ($("#tag-pool").width() - $("#tag-list").width()) / bodyWidth * 100;
    
    return left;
  }
  
  /*
    card-pool
  */
  function selectCard() {
    
    var cardHeight = $(".card-item").height();
    var foucsTop = bodyHeight / 2 - cardHeight / 2;
    var multi = 1;
    var zIndex = 99;
    
    for (var i = 0; i < $(".card-item").length; i++) {
      
      var level = i - selected;
      var side = 0;
      if (level != 0) {
        side = level / Math.abs(level);
      }
      
      $(".card-item")[i].style.top = foucsTop + cardHeight * 0.12 * multi * Math.sqrt(Math.abs(level)) * side + "px";
      var scale = 1 - 0.05 * multi * Math.sqrt(Math.abs(level));
      $(".card-item")[i].style.transform = "scale(" + scale + ", " + scale + ")";
      $(".card-item")[i].style.zIndex = zIndex - Math.abs(level);
      if (i == selected) {
        $(".card-item")[i].style.boxShadow = "0 0 2rem 0.8rem #222";
      } else {
        $(".card-item")[i].style.boxShadow = "0 0 1rem 0.4rem #222";
      }
      
    }
  }
  setTimeout(function () {
    selectCard();
  }, 800);
  
  $("#card-pool").hover(function () {
    inCardPool = true;
    }, function () {
    inCardPool = false;
  });

} () );


var fullCircle = 2 * Math.PI;
var PARTICLE = function (position, center, size) {
  this.origin = center;
  this.x = center.x + position.x;
  this.y = center.y + position.y;
  this.z = position.z;
  this.size = size;
  this.color = 'hsl(%hue, 100%, 70%)';
  
  this.init();
}
PARTICLE.prototype = {
  init : function () {
    this.color = this.color.replace('%hue', 60);
  },
  rotateX : function (delta) {
    var old = {
      x : this.x - this.origin.x,
      y : this.y - this.origin.y,
      z : this.z
    }
    
    this.y = old.y * Math.cos(delta) - old.z * Math.sin(delta) + this.origin.y;
    this.z = old.y * Math.sin(delta) + old.z * Math.cos(delta);
  },
  rotateY : function (delta) {
    var old = {
      x : this.x - this.origin.x,
      y : this.y - this.origin.y,
      z : this.z
    }
    
    this.z = old.z * Math.cos(delta) - old.x * Math.sin(delta);
    this.x = old.z * Math.sin(delta) + old.x * Math.cos(delta) + this.origin.x;
  },
  rotateZ : function (delta) {
    var old = {
      x : this.x - this.origin.x,
      y : this.y - this.origin.y,
      z : this.z
    }
    
    this.x = old.x * Math.cos(delta) - old.y * Math.sin(delta) + this.origin.x;
    this.y = old.x * Math.sin(delta) + old.y * Math.cos(delta) + this.origin.y;
  }
}
var FORM = {
  sphere : function () {
    var radius = 200;
    
    // xy
    var alpha = Math.random() * fullCircle;
    // vertical plane
    var beta = Math.random() * fullCircle;
    
    return {
			x : radius * Math.cos(beta) * Math.cos(alpha),
			y : radius * Math.cos(beta) * Math.sin(alpha),
			z : radius * Math.sin(beta)
		}
  }
}

var RENDERER = {
  PARTICLE_COUNT : 500,
  PARTICLE_SIZE : 2,

	init : function () {
		this.setupVariables();
		this.initParticles();
		this.drawFigure();
	},
	setupVariables : function () {
    this.particles = [];
    
		this.$container = $($(".card-item")[0]);
		this.width = this.$container.width();
		this.height = this.$container.height();
    this.center = {x : this.width / 2, y : this.height / 2};
		
		this.$canvas = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container);
		this.context = this.$canvas.get(0).getContext('2d');
	},
	initParticles : function () {
		for (var i = 0; i < this.PARTICLE_COUNT; i++) {
			this.particles.push(new PARTICLE(FORM.sphere(), this.center, this.PARTICLE_SIZE));
		}
	},
	drawFigure : function () {
		requestAnimationFrame(this.drawFigure.bind(this));
		
		this.context.fillStyle = 'rgba(0, 0, 0, 0.2)';
		this.context.fillRect(0, 0, this.width, this.height);
		
		for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].rotateX(0.005 * fullCircle);
      this.particles[i].rotateY(0.005 * fullCircle);
      this.particles[i].rotateZ(0.005 * fullCircle);
      
			this.context.beginPath();
			this.context.fillStyle = this.particles[i].color;
			this.context.arc(this.particles[i].x, this.particles[i].y, this.particles[i].size, 0, fullCircle, false);
			this.context.fill();
		}
	}
};

(function () {
	RENDERER.init();
} () );