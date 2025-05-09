$(document).ready(function () {
  $(".loading")
    .promise()
    .done(function () {
      setTimeout(function () {
        $(".loading-logo").addClass("in");
      }, 100);
      setTimeout(function () {
        $(".loading").removeClass("loading");
        setTimeout(function () {
          initAnimation();
          initSwiper();
        }, 200);
      }, 1400);
    });

  $(".banner .field-nav a").click(function (e) {
    e.preventDefault();
    var _this = $(this);
    var mobileView = $(".icon-menu-trigger:visible").length;
    var fieldNav = _this.closest(".field-nav");
    if (mobileView == 0) {
      var fieldCenter = fieldNav.offset().top + fieldNav.height() / 2;
      var itemCenter =
        _this.closest(".item").offset().top +
        _this.closest(".item").height() / 2;
      fieldNav.css(
        "transform",
        "translateY(" + (fieldCenter - itemCenter) + "px)"
      );
    }

    var gridIndex = $(
      ".banner .grid-col.type-" + _this.data("type") + " .item-grid:eq(0)"
    ).data("grid");
    $(".banner .bg[data-grid=" + gridIndex + "]")
      .show()
      .siblings(".bg")
      .hide();

    if (_this.data("type") == "products") {
      $(".banner .type-products").fadeIn(300);
      $(".banner .type-industries").hide();
    } else if (_this.data("type") == "industries") {
      $(".banner .type-products").hide();
      $(".banner .type-industries").fadeIn(300);
    }

    fieldNav.find("a").removeClass("actived");
    _this.addClass("actived");
    var targetGridWrap = $(
      ".banner .type-" + _this.data("type") + " .grid-container"
    );
    if (targetGridWrap.find(".animated").length) {
      targetGridWrap
        .find(".animated")
        .removeAttr("style")
        .removeClass("animated");
      initAnimation();
    }
  });
  $(".banner .field-nav .item:eq(0) a").trigger("click");

  $(".banner .grid-col .item-grid").hover(
    function () {
      var _this = $(this);
      var mobileView = $(".mobile-xl-visible:visible").length;
      if (mobileView == 0) {
        $(".banner .bg[data-grid=" + _this.data("grid") + "]")
          .fadeIn(300)
          .siblings(".bg")
          .hide();
        _this.find(".item-icon").stop(false, true).hide();
        _this.find(".item-text, .item-links").stop(false, true).fadeIn(300);
          _this.find(".item-text .text").shave(140, { spaces: false });
      }
    },
    function () {
      var _this = $(this);
      var mobileView = $(".mobile-xl-visible:visible").length;
      if (mobileView == 0) {
        _this.find(".item-text, .item-links").stop(false, true).hide();
        _this.find(".item-icon").stop(false, true).fadeIn(300);
      }
    }
  );

  $(".track-box-label").click(function () {
    var _this = $(this);
    if (!_this.hasClass("actived")) {
      _this.closest(".track-box").addClass("actived");
      _this.addClass("actived");
    } else {
      _this.closest(".track-box").removeClass("actived");
      _this.removeClass("actived");
    }
  });
});
