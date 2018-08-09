
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



var PARTICLE = function (center, size) {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.size = size;
  this.color = 'hsl(60, 100%, 70%)';
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
		
		this.$canvas = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container);
		this.context = this.$canvas.get(0).getContext('2d');
    
		this.center = {x : this.width / 2, y : this.height / 2};
	},
	initParticles : function () {
		for (var i = 0; i < this.PARTICLE_COUNT; i ++) {
			this.particles.push(new PARTICLE(this.center, this.PARTICLE_SIZE));
		}
	},

	drawFigure : function () {
    
		requestAnimationFrame(this.drawFigure.bind(this));
		
		this.context.fillStyle = 'rgba(0, 0, 0, 0.2)';
		this.context.fillRect(0, 0, this.width, this.height);
		
		for (var i = 0; i < this.particles.length; i++) {
      var point = this.particles[i];
      
			this.context.beginPath();
			this.context.fillStyle = point.color;
			this.context.arc(point.x, point.y, point.size, 0, 2 * Math.PI, false);
			this.context.fill();
		}
	}
};


(function () {
	RENDERER.init();
} () );