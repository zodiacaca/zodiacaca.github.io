
(function () {
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

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
  $(".card-item").hover(function () {
    $(this).css("opacity", "1");
  }, function() {
    $(this).css("opacity", "0.9");
  });
} () );

