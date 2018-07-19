
$("#construct-helper-slider").slider({
  range: true,
  min: 0,
  max: 100,
  values: [0,50],
  slide: function(event, ui) {
    $(".TTT")[0].style.left = ui.values[0] + "%";
    $(".TTT")[0].innerHTML = ui.values[0];
  }
});

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

