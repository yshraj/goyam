var recaptchas = {};

$(document).ready(function () {
    $.extend($.validator.messages, { phone: $("html").attr("lang") == "zh-Hant" ? "請輸入有效的電話號碼" : $("html").attr("lang") == "zh-Hans" ? "请输入有效的电话号码" : "Please input valid phone number" });
    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        $.validator.messages.phone//"Please input valid phone number"
    );

    $(".form-phone").rules("add", {
        regex: "[()+-\\d\\s]"
    });
    $("form button[type=submit]").on("click", function (e) {
        e.preventDefault();
        var elm = $(this);
        var form = elm.closest("form");

        var validator = form.data("validator");

        if (validator == undefined) {
            validator = form.validator();
        }

        if (form.data("submitting") == undefined) {
            form.data("submitting", true);
            elm.attr("disabled", "disabled");
            //elm.closest(".submit-btn").hide();
            //form.find(".processing-btn").show();
            var valid = true;

            var recaptchaId = -1;
            if (form.find(".g-recaptcha").length) {
                if (recaptchas != undefined && !$.isEmptyObject(recaptchas)) {
                    recaptchaId = recaptchas[form.find(".g-recaptcha").attr("id")];
                    var response = grecaptcha.getResponse(recaptchaId);
                } else {
                    var response = grecaptcha.getResponse();
                }
                form.find("#IsVerified").val(response);
                if (response == "") {
                    valid = false
                    validator.showErrors({
                        "IsVerified": $.validator.messages.required //form.hasClass("en") ? "This field is required." : "必須填寫"
                    });
                } else if (valid) {
                    clearErrors(form);
                }
            }

            if (form.find("input[type=checkbox].tnc").length) {
                if (!form.find("input[type=checkbox].tnc").is(":checked")) {
                    valid = false
                    validator.showErrors({
                        "AgreeTnc": $.validator.messages.required
                    });
                } else if (valid) {
                    clearErrors(form);
                }
            }
            if (form.valid() && valid) {
                form.submit();
                /*var url = form.find("div.g-recaptcha").data("url");
                $.post(url, { response: response }, function (data) {
                    var success = $.parseJSON(data).success;
                    //verify recaptcha
                    if (success) {
                        form.submit();
                    } else {
                        console.log("recaptcha fail");
                        if (recaptchaId > -1) {
                            grecaptcha.reset(recaptchaId);
                        } else {
                            grecaptcha.reset();
                        }
                        form.removeData("submitting", undefined);
                        elm.removeAttr("disabled");
                    }
                })*/
            } else {
                form.removeData("submitting", undefined);
                elm.removeAttr("disabled");
                //form.find(".processing-btn").hide();
                //form.find(".submit-btn").show();
            }
        } else {
            console.log("submitting");
        }
    });

    $("form button[type=reset]").on("click", function (e) {
        var form = $(this).closest("form");
        var validator = form.data("validator");
        validator.resetForm();
        form.find(".field-validation-valid > span").text("");

        if (form.find(".g-recaptcha").length) {
            var recaptchaId = -1;
            if (recaptchas != undefined && !$.isEmptyObject(recaptchas)) {
                recaptchaId = recaptchas[form.find(".g-recaptcha").attr("id")];
            }

            if (recaptchaId > -1) {
                grecaptcha.reset(recaptchaId);
            } else {
                grecaptcha.reset();
            }
        }
    });
    
    $("form .form-group-parent select")
        .find("option:last-child").addClass("option-others").end()
        .on("change", function (e) {
            var elm = $(this);
            if (elm.val() == elm.find("option.option-others").first().attr("value")) {
                elm.closest(".form-group-parent").next(".form-group-child").show();
            } else {
                var container = $(this).closest(".form-group-parent").nextAll(".form-group-child");
                container.removeClass("focused").hide()
                    .find(":input").val("");
            }
        });

    $("form .form-group-parent input[type=checkbox]").on("change", function (e) {
        var specify = false;
        $.each($("input[type=checkbox]:checked"), function (index, elm) {
            //if ($(elm).val().toLowerCase() == "others") {
            if ($(elm).hasClass("option-others")) {
                specify = true;
                return false;
            }
        });

        if (specify) {
            $(this).closest(".form-group-parent").nextAll(".form-group-child").show();
        } else {
            var container = $(this).closest(".form-group-parent").nextAll(".form-group-child");
            container.removeClass("focused").hide()
                .find(":input").val("");
        }


    })
});

function clearErrors(form) {
    var elm = form.find(".field-validation-error span");
    var validator = form.data("validator");
    if (elm.length) {
        elm.each(function () {
            validator.settings.success($(this));
        });
        validator.resetForm();
    }
}

function ajaxSuccess(data, id) {
    var form = $("#" + id);
    if (data.success) {
        form.closest(".pannel-content-box")
            .find(".custom-plain-tab, .tab-content, .form-response").hide().end()
            .find(".form-response-success").show();
        form[0].reset();
    } else {
        var validator = form.data("validator");
        validator.showErrors(data.errors);
    }
    form.removeData("submitting", undefined);

    setTimeout(function () {
        form.find("button[type=submit]").removeAttr("disabled");
    }, form.hasClass("tracking-form") ? 5000 : 0);
}

function ajaxFail(id) {
    var form = $("#" + id);
    form.closest(".pannel-content-box")
        .find(".custom-plain-tab, .tab-content, .form-response").hide().end()
        .find(".form-response-fail").show();
    form.removeData("submitting", undefined);
    form.find("button[type=submit]").removeAttr("disabled");
    //form.find(".processing-btn").hide();
    //form.find(".submit-btn").show();
}

function googleReCaptchaRender() {
    $.each($(".g-recaptcha"), function (index, value) {
        var elm = $(this);
        var temp = grecaptcha.render(elm.attr("id"), { "sitekey": elm.data("sitekey"), "theme": "light" });
        recaptchas[elm.attr("id")] = temp;
    });
}