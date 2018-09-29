
$("#helper-slider1").slider({
  min: 0,
  max: 100,
  values: [0,100],
  slide: function (event, ui) {
    $(".helper-TTT")[0].style.left = ui.values[0] + "%";
    $(".helper-TTT")[0].innerHTML = ui.values[0];
    // ui.values[0]
  }
});

