
(function () {
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

  $(".menu-button").click(function () {
    if ($(this).hasClass("menu-button--open")) {
      $(this).removeClass("menu-button--open");
      $("#showcase").removeClass("showcase--open");
    } else {
      $(this).addClass("menu-button--open");
      $("#showcase").addClass("showcase--open");
    }
  });
} () );

