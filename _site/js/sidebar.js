
(function () {
  
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

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
  
  function popupCards() {
    var cardWidth = $(".card-item").width();
    var cardHeight = $(".card-item").height();
    var foucsTop = bodyHeight / 2 - cardHeight / 2;
    var zIndex = 99;
    var selected = 0;
    for (var i = 0; i < $(".card-item").length; i++) {
      $(".card-item")[i].style.top = foucsTop + cardHeight * 0.1 * i + "px";
      var scale = 1 - 0.02 * i;
      $(".card-item")[i].style.transform = "scale(" + scale + ", " + scale + ")";
      $(".card-item")[i].style.zIndex = zIndex - i;
    }
    $(".card-item").css("box-shadow", "0 0 1rem 0.4rem #222");
    $(".card-item")[selected].style.boxShadow = "0 0 2rem 0.8rem #222";
  }
  setTimeout(function () {
    popupCards();
  }, 800);

} () );
