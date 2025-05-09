$(document).ready(function () {
    /*(30/05/2022) Comment out "Mouseover" & "Mouseout" Operations*/
    //$(".statement-wrap table tr td a").on("mouseover", function () {
    //    $(this).css("color", "#ed6d00");
    //    var btn = $(this).parent().parent().find("button");
    //    btn.css("filter", "invert(60%) sepia(100%) saturate(1794%) hue-rotate(8deg) brightness(100%) contrast(99%)");
    //})

    //$(".statement-wrap table tr td a").on("mouseout", function () {
    //    if (window.innerWidth < 768) {
    //        $(this).css("color", "#4c4948");
    //    } else {
    //        $(this).css("color", "#ffffff");
    //    }
    //    var btn = $(this).parent().parent().find("button");
    //    btn.css("filter", "");

    //})



    //$(".statement-wrap table tr td button").on("mouseover", function () {
    //    $(this).css("color", "#ed6d00");
    //    var link = $(this).parent().parent().find("a");
    //    //link.css("color", "#ed6d00");
    //    link.css("color", "#ed6d00");
    //});

    //$(".statement-wrap table tr td button").on("mouseout", function () {
    //    $(this).css("color", "#ffffff");
    //    var link = $(this).parent().parent().find("a");
    //    if (window.innerWidth < 768) {
    //        link.css("color", "#4c4948");
    //    } else
    //    {
    //        link.css("color", "#ffffff");
    //    }
        
    //});


    /* (30/05/2022) Remove checking "pannel-content" */
    $(".statement-wrap table tr td button").on("click", function () {
        //if ($(".pannel-content").is(":before"))
        //{
            var link = $(this).parent().parent().find("a");
            link[0].click();
        /*}*/
    });


})