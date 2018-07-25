
(function () {
  
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

  function getTagListVerticalCenter() {
    var listHeight = $("#tag-list").height();
    $("#tag-pool")[0].style.top = (bodyHeight / 2 - listHeight / 2) + "px";
  }
  getTagListVerticalCenter();
  
  /* after document loaded */
  $(document).ready(function () {
    sceneOpen();
  });

  function sceneOpen() {
    // main parts
    $("#nav-bar")[0].style.transform = "translateX(-100%)";
    $("#board-slider")[0].style.backgroundColor = "#333";
    $("#board-slider")[0].style.transform = "translateX(" + $("#nav-bar").width() + "px)";
    $("#board-content")[0].style.left = "0";
    // tag
    var left = getTagListLeftBorder();
    setTimeout(function () {
      $(".tag-item").each(function () {
        this.style.backgroundPosition = (left - 5) + "vw 0";
      });
    }, 600);
  }

  function getTagListLeftBorder() {
    // x position has been translated
    var left = ($("#tag-pool").width() - $("#tag-list").width()) / bodyWidth * 100;
    
    return left;
  }

} () );
