$(document).ready(function () {
    $('#kerrierAccordion').on('shown.bs.collapse', function (e) {
        var targetId = $(e.target).attr('id');
        $('html, body').animate({
            scrollTop: $('#' + targetId).offset().top - $('#header').outerHeight(true) - 60
        }, 350);
    });
});