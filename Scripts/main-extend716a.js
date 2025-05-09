$(document).ready(function () {
    var noticeHash = generateNoticeHash();
    var isLatest = hashIsLatest(noticeHash);
    if (isLatest) {
        $(".notice.force-show").css("display", "none");
    } else
    {
        $(".notice.force-show").css("display", "block");
    }

    $(".search-form .btn-search").click(function (e) {
        e.preventDefault();
        $(this).closest("form").submit();
    });

    if (getCookie("cookie_consent") != "true") {
        $(".cookies-bar").addClass("show-bar");
    }

    if ($(".search-result").length) {
        $(".search-result .com-row .txt").shave(46);
    }

    $(".field-menu .menu .menu-lv1-link.has-child").click(function (e) {
        if ($(this).attr("href") == "#") {
            e.preventDefault();
        }
    });

    $('#header .field-menu .menu-lv1-link').on("mouseenter", function () {
        if (!$(this).hasClass("active")) {
            if ($(this).hasClass("has-child")) {
                $(this).trigger("click");
            } else {
                $(this).closest('.field-menu').find('.dropdown-menu').stop(false, true).slideUp();
                $(this).closest('.field-menu').find('.has-child').removeClass('active');
            }
        }
    });


    $("#header .field-menu .submenu-box").on("mouseleave", function () {
        $(this).slideUp().prev(".has-child").removeClass("active");
    });

    //$('#notice .btn-notice-hide a').off("click").click(function () {
    //    $('#notice').stop(false, true).slideUp();
    //    //sessionStorage.setItem('noticeBarHide', true);
    //    setCookie("noticeBarHide", (new Date()).toDateString(), 30 * 365);   //30years
    //});

    //var noticeBarHideVal = getCookie('noticeBarHide');
    //if ((noticeBarHideVal != undefined && noticeBarHideVal != null) && !$("#notice").hasClass("force-show")) {
    //    $('#notice').hide();
    //}

    $(".header select.location-selector").on("change", function (e) {
        window.location.href = $(this).val();
    })

    $(".col-auto.btn-notice-hide .btn-notice").on("click", function () {
        var hashStr = generateNoticeHash();
        var isLatestHash = hashIsLatest(hashStr);
        if (!isLatestHash)
        {
            setCookie('noticeBar', hashStr);
        }

    });


}).on("click", "select", function (e) {
    var options = $(this).children();
    $(options).css('color', '#000');
});




function hashIsLatest(newHash) {
    if (!!getCookie('noticeBar')) {
        var existNotice = getCookie('noticeBar');
        if (existNotice == newHash) {
            // Not show the notice bar
            return true
        }
    } else {
        // Save the notice hash
        return false;
    }
}

function generateNoticeHash() {
    var noticeDateStr = $(".notice .notice-item .item-date").text();
    var noticeTitleStr = $(".notice .notice-item .item-name .item-name-title").text();
    var noticeStr = noticeDateStr + noticeTitleStr;

    var hashStr = convertStrToHash(noticeStr);
    return hashStr;
}


function convertStrToHash(string) {
    var hash = 0;
    if (string.length == 0) return hash;
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}