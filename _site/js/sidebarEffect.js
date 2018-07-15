
/* after document loaded */
$(document).("ready", function(){
  sceneOpen()
});

function sceneOpen() {
  // main parts
  $("#nav-bar").css("transform", "translateX(-100%)")
  $("#front-content").css("background-color", "#333")
  $("#front-content").css("transform", "translateX(20%)")
}

