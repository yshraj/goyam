$(document).ready(function () {
  $(".cookies-bar .close, .cookies-bar .btn-container .com-btn").on(
    "click",
    function (e) {
      e.preventDefault();
      if (getCookie("cookie_consent") != "true") {
        setCookie("cookie_consent", true, 30);
      }
      $(".cookies-bar").removeClass("show-bar");
    }
  );

  $(".com-tab-horizontal .item a, .com-tab-vertical .item a").on(
    "click",
    function (e) {
      e.preventDefault();
      type = $(this).attr("data-type");
      if (type == "gallery") {
        $(".content .wrapper").addClass("type-gallery");
      } else {
        $(".content .wrapper").removeClass("type-gallery");
      }
      if (
        $(".com-tab-horizontal").hasClass("type-sync") ||
        $(".com-tab-vertical").hasClass("type-sync")
      ) {
        $(".filter-container .filter select").val(type);
      }
      $(this)
        .closest(".item")
        .addClass("active")
        .siblings(".item")
        .removeClass("active");
      $(".com-tab-details .item[data-type='" + type + "']")
        .fadeIn()
        .siblings(".item")
        .hide();
    }
  );
  // not applicable to KL site
  //if ($("iframe").length) {
  //  $("iframe").iFrameResize();
  //}
  $(".filter-container.type-change .filter select").on("change", function () {
    var year = $(this).val();
    $(".com-tab-horizontal .item a[data-type=" + year + "]").trigger("click");
    $(".com-tab-vertical .item a[data-type=" + year + "]").trigger("click");
  });
  $(".search-container .close-light").on("click", function () {
    $(this).siblings("input").val("");
  });
  $(".keyword-wrap .icon").on("click", function (e) {
    e.preventDefault();
    $(this).siblings("input").val("").focus();
  });
  //$(".search-result .com-row .txt").shave(46);
  //$(".notice-bar .notice .msg .details").shave(20);
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
