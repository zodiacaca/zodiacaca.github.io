
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
      
      var step = i - selected;
      var side = 0;
      if (step != 0) {
        side = (i - selected) / Math.abs(i - selected);
      }
      
      $(".card-item")[i].style.top = foucsTop + cardHeight * 0.1 * multi * Math.sqrt(Math.abs(step)) * side + "px";
      var scale = 1 - 0.02 * multi * Math.sqrt(Math.abs(i - selected));
      $(".card-item")[i].style.transform = "scale(" + scale + ", " + scale + ")";
      $(".card-item")[i].style.zIndex = zIndex - Math.abs(i - selected);
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
