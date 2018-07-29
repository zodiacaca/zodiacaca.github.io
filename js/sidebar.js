
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

} () );
