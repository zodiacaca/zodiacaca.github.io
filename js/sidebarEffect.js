
/* before rendered */
var adjustElementsAppearance = (function(){

  
  
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

