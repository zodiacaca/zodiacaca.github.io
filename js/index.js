
(function () {
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

  $(".menu-button").click(function () {
    $(this).removeClass("menu-button--open");
    $(".menu-wrapper").removeClass("menu-wrapper--fade");
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

  $(".menu-item").click(function () {
    console.log(this);
    $(".menu-wrapper").addClass("menu-wrapper--fade");
    $(".menu-button").addClass("menu-button--open");
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

