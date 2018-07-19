
/* after document loaded */
$(document).ready(function(){
  sceneOpen();
});

function sceneOpen() {
  // main parts
  $("#nav-bar")[0].style.transform = "translateX(-100%)";
  $("#board-slider")[0].style.backgroundColor = "#333";
  $("#board-slider")[0].style.transform = "translateX(20%)";
}

