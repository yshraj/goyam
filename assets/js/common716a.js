$(document).ready(function () {
    var noticeBarHideVal = sessionStorage.getItem('noticeBarHide');
    if (noticeBarHideVal != undefined && noticeBarHideVal != null && noticeBarHideVal == 'true') {
        $('#notice').hide();
    }
    if ($('.index').length == 0) {
        $('.loading').promise().done(function () {
            $('.loading-overlay').addClass('no-animation');
            $('.loading').removeClass('loading');
            setTimeout(function () {
                initAnimation();
                initSwiper();
                regionImage();
            }, 150);
        });
    }

    $('#header .icon-menu-trigger .menu-hamburger').click(function () {
        var _this = $(this);
        var search = $('#header .icon-search-trigger .icon-trigger');
        var searchIsActived = search.hasClass('actived');
        if (!_this.hasClass('actived')) {
            _this.addClass('actived');
            $('html, body').addClass('mm-actived');
            $('#header .field-mobile-menu').stop(false, true).slideDown();
        } else {
            _this.removeClass('actived');
            search.removeClass('actived');
            $('html, body').removeClass('mm-actived');
            if ($('#header .field-search:visible').length) {
                $('#header .field-search').stop(false, true).slideUp();
            }
            if ($('#header .field-mobile-menu:visible').length) {
                $('#header .field-mobile-menu').stop(false, true).slideUp();
            }
            if ($('#notice .notice-message-dropdown:visible').length) {
                $('#notice .btn-notice-view').removeClass('active');
                $('#notice .notice-message-dropdown').stop(false, true).slideUp();
            }
        }
    });

    $('#header .icon-submenu-show-trigger').click(function (e) {
        e.preventDefault();
        var _this = $(this);
        var menuID = $(this).data('menu-id');
        $('#header #' + menuID).animate({
            left: 0
        });
        $('.field-mobile-menu').addClass('sub-actived');
    });

    $('#header .submenu-hide-trigger-row').click(function (e) {
        e.preventDefault();
        var _this = $(this);
        _this.closest('.submenu-box').animate({
            left: '100%'
        });
        $('.field-mobile-menu').removeClass('sub-actived');
    });

    $('#header .icon-search-trigger .icon-trigger').click(function () {
        var _this = $(this);
        var hamburger = $('#header .icon-menu-trigger .menu-hamburger');
        var hamburgerIsActived = hamburger.hasClass('actived');
        if (!_this.hasClass('actived')) {
            $('#header .field-search').stop(false, true).slideDown();
            _this.addClass('actived');
            if (!hamburgerIsActived) {
                hamburger.addClass('actived');
            } else {
                $('html, body').removeClass('mm-actived');
                if ($('#header .field-mobile-menu:visible').length) {
                    $('#header .field-mobile-menu').stop(false, true).slideUp();
                }
                if ($('#notice .notice-message-dropdown:visible').length) {
                    $('#notice .notice-message-dropdown').stop(false, true).slideUp();
                }
            }
        } else {
            $('#header .field-search').stop(false, true).slideUp();
            $('#header .field-search').removeAttr('style');
            _this.removeClass('actived');
            hamburger.removeClass('actived');
        }
    });

    $('#header .field-menu .menu-lv1-link').click(function () {
        var _this = $(this);
        if (_this.siblings('.dropdown-menu').length) {
            if (!_this.hasClass('active')) {
                _this.closest('.field-menu').find('.dropdown-menu').stop(false, true).slideUp();
                _this.closest('.field-menu').find('.has-child').removeClass('active');
                _this.siblings('.dropdown-menu').stop(false, true).slideDown();
                _this.addClass('active');
                if ($('#header .field-lang .current-lang.active').length) {
                    $('#header .field-lang .dropdown-menu').stop(false, true).slideUp();
                    $('#header .field-lang .current-lang').removeClass('active');
                }
            } else {
                _this.siblings('.dropdown-menu').stop(false, true).slideUp();
                _this.removeClass('active');
            }
        } else {
            _this.closest('.field-menu').find('.dropdown-menu').stop(false, true).slideUp();
            _this.closest('.field-menu').find('.has-child').removeClass('active');
        }
    });

    //$('#header .field-lang .current-lang').click(function () {
    //    var _this = $(this);
    //    if (_this.siblings('.dropdown-list').length) {
    //        if (!_this.hasClass('active')) {
    //            _this.siblings('.dropdown-list').stop(false, true).slideDown();
    //            _this.addClass('active');
    //            if ($('#header .field-menu .has-child.active').length) {
    //                $('#header .field-menu .dropdown-menu').stop(false, true).slideUp();
    //                $('#header .field-menu .has-child').removeClass('active');
    //            }
    //        } else {
    //            _this.siblings('.dropdown-list').stop(false, true).slideUp();
    //            _this.removeClass('active');
    //        }
    //    }
    //    if ($("#header .field-lang .icon-trigger").hasClass('active')) {
    //        $("#header .field-lang .icon-trigger").removeClass('active').siblings('.dropdown-lang-menu').stop(false, true).slideUp();
    //    }
    //});

    $("#header .field-lang .icon-trigger").click(function () {
        var _this = $(this);
        if (_this.siblings('.dropdown-lang-menu').length) {
            if (!_this.hasClass('active')) {
                _this.siblings('.dropdown-lang-menu').stop(false, true).slideDown();
                _this.addClass('active');
                if ($('#header .field-menu .has-child.active').length) {
                    $('#header .field-menu .dropdown-menu').stop(false, true).slideUp();
                    $('#header .field-menu .has-child').removeClass('active');
                }
            } else {
                _this.siblings('.dropdown-lang-menu').stop(false, true).slideUp();
                _this.removeClass('active');
            }
        }
        //if ($("#header .field-lang .current-lang").hasClass('active')) {
        //    $("#header .field-lang .current-lang").removeClass('active').siblings('.dropdown-list').stop(false, true).slideUp();
        //}
    });

    $('#header .field-mobile-menu a.col').click(function (e) {
        if ($(this).attr("href") == "#") {
            e.preventDefault();
        }
        if ($(this).hasClass("landing")) {
            $(this).next(".icon-submenu-show-trigger").click();
        }
    });

    $('#notice .btn-notice-view a').click(function () {
        var target = $(this).closest('.btn-notice-view');
        var hamburger = $('#header .icon-menu-trigger .menu-hamburger');

        if (!$('#notice .notice-message-dropdown:visible').length) {
            $('#notice .notice-message-dropdown').stop(false, true).slideDown();
            target.addClass('active');
            if (!hamburger.hasClass('actived')) {
                hamburger.addClass('actived');
            }
            if (hamburger.is(':visible')) {
                $('html, body').addClass('mm-actived');
            }
        } else {
            $('#notice .notice-message-dropdown').stop(false, true).slideUp();
            target.removeClass('active');
        }
    });

    $('#notice .btn-notice-hide a').click(function () {
        $('#notice').stop(false, true).slideUp();
        sessionStorage.setItem('noticeBarHide', true);
    });

    $.validator.addMethod('phoneNumber', function (value, element) {
        var phone_number = value.replace(/\s+/g, '');
        return this.optional(element) || phone_number.length >= 8 && /^[0-9]*$/.test(phone_number);
    }, $.validator.messages.number);

    $('form').each(function () {
        var formID = $(this)[0].id;
        if (formID == '') return;
        var targetForm = $('#' + formID);
        /*var formValidator = targetForm.validate({
            invalidHandler: function (event, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    targetForm.addClass('has-error');
                } else {
                    targetForm.removeClass('has-error');
                }
            },
            highlight: function (element) {
                $(element).parents('.form-group').addClass('has-error');
                $(element).parents('.form-legend').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).parents('.form-group').removeClass('has-error');
                $(element).parents('.form-legend').removeClass('has-error');
            },
            submitHandler: function (form) {
                var response = grecaptcha.getResponse();
                if (response.length == 0) { //recaptcha failed validation
                    return false;
                } else {
                    return true;
                }
            }
        });*/

        targetForm.find('input, textarea').focus(function () {
            $(this).parents('.form-group').addClass('focused');
        });

        targetForm.find('input, textarea').blur(function () {
            var inputValue = $(this).val();
            if (inputValue == "") {
                $(this).removeClass('filled');
                $(this).parents('.form-group').removeClass('focused');
            } else {
                $(this).addClass('filled');
            }
        });

        targetForm.find('select').change(function () {
            if ($(this).val() != '') {
                $(this).addClass('filled');
                $(this).parents('.form-group').addClass('focused');
            } else {
                $(this).removeClass('filled');
                $(this).parents('.form-group').removeClass('focused');
            }
        });

        targetForm.find('button[type="reset"]').click(function () {
            //formValidator.resetForm();
            targetForm.find('.filled').removeClass('filled');
            targetForm.find('.focused').removeClass('focused');
            targetForm.find('.has-error').removeClass('has-error');
            targetForm[0].reset();
        })
    });

    $('.nav-tabs .nav-item[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $($(e.relatedTarget)[0].hash).find('form').find('button[type="reset"]').trigger('click');
    });

    $('.popup-iframe').magnificPopup({
        disableOn: 767,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    $('.content-lang-tab').each(function () {
        var _this = $(this);
        _this.find('.btn-switch-lang').click(function () {
            _this.find('.btn-switch-lang').removeClass('active');
            $(this).tab('show');
        })
    })

    $('.selectpicker').selectpicker({
        noneResultsText: $('.selectpicker').data("msg")
    });

    $("#header .field-lang .dropdown-lang-menu .dropdown-list .btn-light, #header .menu #menuCountry .dropdown-list .btn").on("click", function () {
        $("#header .bootstrap-select .dropdown-menu .inner").hide();
    });
    $(".dropdown-lang-menu .bs-searchbox input, .dropdown-menu .bs-searchbox input").on("keyup", function () {
        if ($(this).val() != '') {
            $("#header .bootstrap-select .dropdown-menu .inner").show();
        } else {
            $("#header .bootstrap-select .dropdown-menu .inner").hide();
        }
    });
});

$(window).on('resize', function () {
    if ($(window).innerWidth() > 1400) {
        if ($('#header .icon-search-trigger .icon-trigger').hasClass('actived')) {
            $('#header .icon-search-trigger .icon-trigger, #header .icon-menu-trigger .menu-hamburger').removeClass('actived');
            $('#header .field-search').removeAttr('style');
        }
        if ($('html, body').hasClass('mm-actived')) {
            $('html, body').removeClass('mm-actived');
        }
    }
    setTimeout(function () {
        regionImage();
    }, 150);
});

function initAnimation() {
    var controller = new ScrollMagic.Controller();
    $('.ani').each(function (index, element) {
        var scene = new ScrollMagic.Scene({
            triggerElement: element,
            duration: 0,
            offset: 0,
            triggerHook: 0.9
        })
            .addTo(controller)
            .on('enter', function (e) {
                var $obj = $(e.target.triggerElement());
                var type = 'fadeInUp';
                var delay = 0.2;
                var dur = 0.6;

                if ($obj.attr('data-ani') != undefined && $obj.attr('data-ani') != '') {
                    type = $obj.attr('data-ani');
                }
                if ($obj.attr('data-ani-delay') != undefined && $obj.attr('data-ani-delay') != "") {
                    delay = parseFloat($obj.attr('data-ani-delay'));
                    if (delay == -1) {
                        delay = Math.random() * 0.3;
                    }
                }

                if (!$obj.hasClass('animated')) {
                    if (type == 'fadeInUp') {
						gsap.fromTo($obj, { opacity: 0, y: 60 }, {duration: dur, delay: delay, opacity: 1, y: 0, ease: Power2.easeOut});
                    } else if (type == 'fadeInUpSmall') {
						gsap.fromTo($obj, { opacity: 0, y: 30 }, {duration: dur, delay: delay, opacity: 1, y: 0, ease: Power2.easeOut});
                    } else if (type == 'fadeIn') {
						gsap.fromTo($obj, { opacity: 0 }, {duration: dur, delay: delay, opacity: 1, ease: Power2.easeOut});
                    } else if (type == 'zoomout') {
						gsap.fromTo($obj, { opacity: 0, scale: 1.2  }, {duration: dur, delay: delay, opacity: 1, scale: 1, ease: Power2.easeOut});
                    } else if (type == 'fadeInDown') {
						gsap.fromTo($obj, { opacity: 0, y: -60 }, {duration: dur, delay: delay, opacity: 1, y: 0, ease: Power2.easeOut});
                    } else if (type == 'fadeInDownSmall') {
						gsap.fromTo($obj, { opacity: 0, y: -30 }, {duration: dur, delay: delay, opacity: 1, y: 0, ease: Power2.easeOut});
                    }
                    $obj.addClass('animated');
                }
            });
    });
    $('.ani-wrap').each(function (index, element) {
        var $wrap = $(this);
        var type = 'fadeInUp';
        var delay = 0.2;
        var dur = 0.6;
        var wait = 0.3;

        if ($wrap.attr('data-ani') != undefined && $wrap.attr('data-ani') != '') {
            type = $wrap.attr('data-ani');
        }
        if ($wrap.attr('data-ani-delay') != undefined && $wrap.attr('data-ani-delay') != "") {
            delay = parseFloat($wrap.attr('data-ani-delay'));
            if (delay == -1) {
                delay = Math.random() * 0.3;
            }
        }

        var scene = new ScrollMagic.Scene({
            triggerElement: element,
            duration: 0,
            offset: 0,
            triggerHook: 0.9
        })
            .addTo(controller)
            .on('enter', function (e) {
                if (!$wrap.hasClass('animated')) {
                    var $obj = $(e.target.triggerElement());
                    var $objs = $(e.target.triggerElement()).find('.ani-child');

                    if (!$obj.hasClass('animated')) {
                        if (type == 'fadeInUp') {
							gsap.fromTo($objs, { opacity: 0, y: 60 }, {duration: dur, delay: delay * index, opacity: 1, y: 0, ease: Power2.easeOut, stagger: wait});
                        } else if (type == 'fadeInUpSmall') {
							gsap.fromTo($objs, { opacity: 0, y: 30  }, {duration: dur, delay: delay * index, opacity: 1, y: 0, ease: Power2.easeOut, stagger: wait});
                        } else if (type == 'fadeIn') {
							gsap.fromTo($objs, { opacity: 0 }, {duration: dur, delay: delay * index, opacity: 1, ease: Power2.easeOut, stagger: wait});
                        } else if (type == 'fadeInDown') {
							gsap.fromTo($objs, { opacity: 0, y: -60 }, {duration: dur, delay: delay * index, opacity: 1, y: 0, ease: Power2.easeOut, stagger: wait});
                        } else if (type == 'fadeInDownSmall') {
							gsap.fromTo($objs, { opacity: 0, y: -30}, {duration: dur, delay: delay * index, opacity: 1, y: 0, ease: Power2.easeOut, stagger: wait});
                        }
                        $obj.addClass('animated');
                    }
                }
            });
    });
}

function initSwiper() {
    var mySwiper = new Swiper('.swiper-container', {
        speed: 600,
        spaceBetween: 15,
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });
}

function regionImage() {
    $('.region-table-wrapper .region-column').each(function () {
        var _this = $(this);
        var count = 0;
        var temp = 0;
        _this.find('.region-image').css('width', '');
        _this.find('.region-image').each(function (index) {
            temp = $(this).find(".image").length;
            if (temp > count) {
                count = temp;
            }
        });
        _this.find('.region-image').css('width', 48 * count + 30);
    });
}

//function googleReCaptchaRender() {
//    if ($('#recaptcha-element').length) {
//        grecaptcha.render('recaptcha-element', {
//            //sitekey: '6LehOcsUAAAAAOtnJ1f86l54OHmc5SO1Ww4ItZUY'
//        });
//    }
//    if ($('#recaptcha-element-set2').length) {
//        grecaptcha.render('recaptcha-element-set2', {
//            //sitekey: '6LehOcsUAAAAAOtnJ1f86l54OHmc5SO1Ww4ItZUY'
//        });
//    }
//}