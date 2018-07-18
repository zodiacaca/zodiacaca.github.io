
/* after document loaded */
$(document).ready(function(){
  sceneOpen();
});

function sceneOpen() {
  // main parts
  $("#nav-bar").css("transform", "translateX(-100%)");
  $("#board-slider").css("background-color", "#333");
  $("#board-slider").css("transform", "translateX(20%)");
  $(".tag-item").css("box-shadow", "0 0 0 0.6rem #333");
  setTimeout(function(){
    $("#tag-list").css("background-image", "linear-gradient(to right, #f59393, #f59393)");
  }, 800);
}

