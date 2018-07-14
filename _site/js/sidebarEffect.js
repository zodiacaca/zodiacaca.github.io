
/* before rendered */
var adjustElementsAppearance = (function(){

  $("#nav-bar").css("min-height", "80vh")
  
})();

/* after loaded */
$(window).on("load", function(){
  sceneOpen()
});

function sceneOpen() {
  // main parts
  $("#nav-bar").css("transform", "translateX(-100%)")
  $("#front-content").css("background-color", "#333")
  $("#front-content").css("transform", "translateX(20%)")
}

