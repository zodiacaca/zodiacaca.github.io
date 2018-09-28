
(function () {
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

  /* after document loaded */
  $(document).ready(function () {
    sceneOpen();
  });

  function sceneOpen() {
    // main parts
    // $("#nav-slider").css("transform", "translateX(-100%)");
    $("#board-slider").css("transform", "translateX(" + $("#nav-slider").width() + "px)");
    $("#board-wrapper").css("left", 0);
  }
  
  /*
    tag-pool
  */
  function getTagListVerticalCenter() {
    var listHeight = $("#tag-list").height();
    $("#tag-list").css("top", bodyHeight / 2 - listHeight / 2);
  }
  getTagListVerticalCenter();
} () );

