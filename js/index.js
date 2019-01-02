
(function () {
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

  // var mi = ["timeline", "works", "about"];
  var mi = ["timeline", "about"];

  $(".menu-button").click(function () {
    $(this).removeClass("menu-button--open");
    $(".menu-wrapper").removeClass("fade");
    $(".menu-wrapper").removeClass("no-interact");
    $("canvas").removeClass("fade");
    for (var i = 0; i < mi.length; i++) {
      $("#" + mi[i]).removeClass("clear");
      $("#" + mi[i]).addClass("fade");
      $("#" + mi[i]).removeClass(mi[i] + "--surface");
    };
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

  for (var i = 0; i < mi.length; i++) {
    $("#mi-" + mi[i]).click(function () {
      $(".menu-button").addClass("menu-button--open");
      $(".menu-wrapper").addClass("fade");
      $(".menu-wrapper").addClass("no-interact");
      $("#" + this.id.substring(3)).addClass("clear");
      $("#" + this.id.substring(3)).addClass(this.id.substring(3) + "--surface");
    });
    $("#mi-" + mi[i]).on("mouseenter", function () {
      $("canvas").addClass("fade");
      $("#" + this.id.substring(3)).removeClass("fade");
    });
    $("#mi-" + mi[i]).on("mouseleave", function () {
      if (!$(".menu-wrapper").hasClass("fade")) {
        $("canvas").removeClass("fade");
        $("#" + this.id.substring(3)).addClass("fade");
      }
    });
    $("#" + mi[i]).addClass("fade");
  };

  html2canvasHandler($(".menu-wrapper")[0]);
} () );

function html2canvasHandler(element) {
  html2canvas(element, {
      async: true,
      canvas: $("canvas")[0]
    }
  );
};

