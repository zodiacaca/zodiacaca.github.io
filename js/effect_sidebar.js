
/* after document loaded */
$(document).ready(function(){
  sceneOpen();
});

function sceneOpen() {
  // main parts
  $("#nav-bar").css("transform", "translateX(-100%)");
  $("#board-slider").css("background-color", "#333");
  $("#board-slider").css("transform", "translateX(20%)");
};

