
$("#helper-slider1").slider({
  min: 0,
  max: 100,
  values: [0,100],
  slide: function (event, ui) {
    $(".helper-TTT")[0].style.left = ui.values[0] + "%";
    $(".helper-TTT")[0].innerHTML = ui.values[0];
    // x position has been translated
    $(".tag-item").css("background-position", (ui.values[0] - 20) + "vw 0");
  }
});
