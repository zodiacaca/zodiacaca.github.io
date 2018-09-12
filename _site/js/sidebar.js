
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
      // selectCard();
      
    }
    
  }
  $(".card-item").click(function () {
    $(this).children(".overlay").css("display", "none");
    selected = $(this).index();
    // selectCard();
  });
  $(".card-item").hover(function () {
    if (selected != $(this).index()) {
      $(this).children(".overlay").css("display", "block");
    }
  }, function() {
    $(this).children(".overlay").css("display", "none");
  });

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
    $("#board-slider").css("background-color", "rgba(50, 50, 50, 0.2)");
    $("#board-slider").css("transform", "translateX(" + $("#nav-slider").width() + "px)");
    $("#board-content").css("left", 0);
    // tags
    $("#tag-list").css("margin-right", 0);
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
        $(".card-item")[i].style.boxShadow = "0 0 2rem 0.8rem rgba(0, 0, 0, 0.7)";
      } else {
        $(".card-item")[i].style.boxShadow = "0 0 1rem 0.4rem rgba(0, 0, 0, 0.7)";
      }
      
    }
  }
  setTimeout(function () {
    // selectCard();
  }, 800);
  
  $("#card-pool").hover(function () {
    inCardPool = true;
    }, function () {
    inCardPool = false;
  });

} () );

