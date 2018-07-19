
$("#construct-helper-slider").slider({
  range: true,
  min: 0,
  max: 100,
  values: [0,50,100],
  slide: function(event, ui) {
//    $("#").left(ui.values[0]);
  }
});

/* after document loaded */
$(document).ready(function(){
  sceneOpen();
});

function sceneOpen() {
  // main parts
  $("#nav-bar").css("transform", "translateX(-100%)");
  $("#board-slider").css("background-color", "#333");
  $("#board-slider").css("transform", "translateX(20%)");
}

