$(document).ready(function () {
    var fastTrackingBtnClick = false;
    var trackingBtnClick = false;

    $("#HouseNo").on("keyup", function (e) {
        var key = e.keyCode;
        if ((key == 32)) {
            document.getElementById("HouseNo").value = document.getElementById("HouseNo").value.trim() + "\n";
        }
    });


    $("#fastTrackingForm .btn-track").on("click", function (e) {
        e.preventDefault();
        if (fastTrackingBtnClick == false)
        {
            fastTrackingBtnClick = true;
            var form = $(this).closest("form");
            grecaptcha.execute().then(function (token) {
                $("#IsVerified").val(token);
                var houseNoList = form.find("#houseNo, #HouseNo").val().replace(/(\n)/gm, '%0A');
                form.attr("action", form.attr("action") + houseNoList)
                form.submit();
                /*var url = form.find("div.g-recaptcha").data("url");
                $.post(url, { response: token }, function (data) {
                    var res = $.parseJSON(data);
                    if (res.success && res.score > 0.5) {
                        form.submit();
                    } else {
                        console.log(res);
                    }
                });*/
            });
        }
    });

    $(".tracking-form .btn-track").on("click", function (e) {
        e.preventDefault();
        if (trackingBtnClick == false)
        {
            trackingBtnClick = true;
            var form = $(this).closest("form");
            grecaptcha.execute().then(function (token) {
                $("#IsVerified").val(token);
                var houseNoList = form.find("#houseNo, #HouseNo").val().replace(/(\n)/gm, '%0A');
                form.attr("action", form.attr("action") + houseNoList);
                form.submit();
                if (houseNo) {
                    window.location.search = "tracking=" + houseNoList;
                }
            });
        }
    });

    $.each($(".status-remarks"), function () {
        if ($(this).height() > 24) {
            $(this).addClass("text-overflow");
        }
    });
})
    .on("click", ".status-remarks.text-overflow", function (e) {
        if (e.offsetX > $(this).innerWidth() - 20) {
            $(this).closest(".status-remarks").removeClass("text-overflow");
        }
    });