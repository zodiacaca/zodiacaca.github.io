
(function () {
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

  $(".menu-button").click(function () {
    $(this).removeClass("menu-button--open");
    $(".menu-wrapper").removeClass("menu-wrapper--fade");
    $("canvas").removeClass("canvas--surface");
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
    $(".menu-wrapper").addClass("menu-wrapper--fade");
    $(".menu-button").addClass("menu-button--open");
    $("canvas").addClass("canvas--surface");
  });
  $("#mi-timeline").on("mouseenter", function () {
    html2canvasHandler($("#timeline")[0]);
  });
  $("#mi-timeline").on("mouseleave", function () {
    if (!$(".menu-wrapper").hasClass("menu-wrapper--fade")) {
      html2canvasHandler($(".menu-wrapper")[0]);
    }
  });

  html2canvasHandler($(".menu-wrapper")[0]);
} () );

function html2canvasHandler(element) {
  html2canvas(element, {
      async: true,
      canvas: $("canvas")[0]
    }
  );
};

