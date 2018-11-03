
(function () {
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

  $(".menu-button").click(function () {
    if ($(this).hasClass("menu-button--open")) {
      $(this).removeClass("menu-button--open");
    } else {
      $(this).addClass("menu-button--open");
    }
  });
  $(".tag-button").click(function () {
    if ($(".tags").hasClass("tags--open")) {
      $(".tags").removeClass("tags--open");
      $(".tag").removeClass("tag--open");
    } else {
      $(".tags").addClass("tags--open");
      $(".tag").addClass("tag--open");
    }
  });
} () );

