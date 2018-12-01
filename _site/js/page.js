
(function () {
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

  $(window).scroll(function (e) {
    if (this.scrollY == 0) {
      $("#outline").removeClass("corner");
    } else {
      $("#outline").addClass("corner");
    }
  });
} () );

