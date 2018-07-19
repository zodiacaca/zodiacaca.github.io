


/* after document loaded */
$(document).ready(function(){
  sceneOpen();
});

function sceneOpen() {
  // main parts
  $("#nav-bar")[0].style.transform = "translateX(-100%)";
  $("#board-slider")[0].style.backgroundColor = "#333";
  $("#board-slider")[0].style.transform = "translateX(20%)";
  var left = getTagListLeftBorder();
  setTimeout(function(){
    $(".tag-item").each(function(){
      this.style.backgroundPosition = left + "px 0";
    });
  }, 600);
}

function getTagListLeftBorder() {
  
  var left = $("#tag-list").offset().left;
  
  return left;
}
