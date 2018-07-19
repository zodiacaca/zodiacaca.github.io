
$("#helper-slider1").slider({
  range: true,
  min: 0,
  max: 100,
  values: [0,100],
  slide: function(event, ui) {
    $(".helper-TTT")[0].style.left = ui.values[0] + "%";
    $(".helper-TTT")[0].innerHTML = ui.values[0];
    // x position has been translated
    $(".tag-item")[0].style.backgroundPosition = (ui.values[0] - 20) + "vw 0";
    $(".tag-item")[1].style.backgroundPosition = (ui.values[0] - 20) + "vw 0";
  }
});

