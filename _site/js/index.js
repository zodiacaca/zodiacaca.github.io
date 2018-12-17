
(function () {
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

  $(".menu-button").click(function () {
    $(this).removeClass("menu-button--open");
    $(".menu-wrapper").removeClass("fade");
    $(".menu-wrapper").removeClass("no-interact");
    $("#timeline").removeClass("clear");
    $("canvas").removeClass("fade");
    $("#timeline").addClass("fade");
    $("#timeline").removeClass("timeline--surface");
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

  $("#mi-timeline").click(function () {
    $(".menu-button").addClass("menu-button--open");
    $(".menu-wrapper").addClass("fade");
    $(".menu-wrapper").addClass("no-interact");
    $("#timeline").addClass("clear");
    $("#timeline").addClass("timeline--surface");
  });
  $("#mi-timeline").on("mouseenter", function () {
    $("canvas").addClass("fade");
    $("#timeline").removeClass("fade");
  });
  $("#mi-timeline").on("mouseleave", function () {
    if (!$(".menu-wrapper").hasClass("fade")) {
      $("canvas").removeClass("fade");
      $("#timeline").addClass("fade");
    }
  });

  html2canvasHandler($(".menu-wrapper")[0]);
  $("#timeline").addClass("fade");
} () );

function html2canvasHandler(element) {
  html2canvas(element, {
      async: true,
      canvas: $("canvas")[0]
    }
  );
};

