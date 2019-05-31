
(function () {
  var bodyWidth = window.innerWidth;
  var bodyHeight = window.innerHeight;

  var mi = ["timeline", "works", "about"];

  $(".menu-button").click(function () {
    $(this).removeClass("menu-button--shift");
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
      $(".tag").removeClass("tag--appear");
    } else {
      $(".tags").addClass("tags--open");
      $(".tag").addClass("tag--appear");
    }
  });
  $(".tag").click(function () {
    $(this).toggleClass("tag--selected");
  });

  for (var i = 0; i < mi.length; i++) {
    $("#mi-" + mi[i]).click(function () {
      $(".menu-button").addClass("menu-button--shift");
      $(".menu-wrapper").addClass("fade");
      $(".menu-wrapper").addClass("no-interact");
      var $projection = $("#" + this.id.substring(3));
      $projection.addClass("clear");
      $projection.addClass(this.id.substring(3) + "--surface");
    });
    $("#mi-" + mi[i]).on("mouseenter", function () {
      $("canvas").addClass("fade");
      var $projection = $("#" + this.id.substring(3));
      $projection.removeClass("fade");
      preloadImage($projection);
    });
    $("#mi-" + mi[i]).on("mouseleave", function () {
      if (!$(".menu-wrapper").hasClass("fade")) {
        $("canvas").removeClass("fade");
        var $projection = $("#" + this.id.substring(3));
        $projection.addClass("fade");
      }
    });
  };

  var canvas = $("canvas")[0];
  html2canvasHandler($(".menu-wrapper")[0], canvas);
  $(canvas).removeClass("fade");

  offsetTags();
  $(".article").removeClass("blur");
  $(".article").addClass("chamfer");

  $(".overlay").hover(
    function () {
      $(this).parent().height($(this).parent().height() * 1.8);
      $(this).fadeTo(0.3, 0);
    }, function () {
      $(this).parent().height($(this).parent().height() / 1.8);
      $(this).fadeTo(0.3, 1);
    }
  );

  function offsetTags() {
    var offsetH = $(".tag-button").offset().top - $(".tags").height() / 2;
    $(".tags").offset({ top: offsetH });
  };
} () );

function html2canvasHandler(element, canvas) {
  html2canvas(element, {
      async: true,
      canvas: canvas,
      backgroundColor: null
    }
  );
};

function preloadImage($element) {
  $element.find("[data-img]").each(function (index) {
    var src = $(this).attr("data-img");
    $(this).attr("src", src);
  });
};
