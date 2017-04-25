$(function () {
    // Lightbox options
    lightbox.option({
        albumLabel: "Фото %1 из %2",
        wrapAround: true,
        disableScrolling: true
    });

    // Load user settings
    // 159&nbsp;рублей
    var ws = window.statSettings;
    var rubleForms = ["рубль", "рубля", "рублей"];
    $('.price__intensive-new').html(ws.intensivePrice + "&nbsp;" + getNumEnding(ws.intensivePrice, rubleForms));
    $('.price__intensive-old').html(ws.intensiveOldPrice + "&nbsp;" + getNumEnding(ws.intensiveOldPrice, rubleForms));
    $('.price__intensive-economy').html(ws.intensiveEconomy);
    $('.price__intensive-date').html(ws.intensiveEndDate);

    $('.price__base-new').html(ws.basePrice + "&nbsp;" + getNumEnding(ws.basePrice, rubleForms));
    $('.price__base-old').html(ws.baseOldPrice + "&nbsp;" + getNumEnding(ws.baseOldPrice, rubleForms));
    $('.price__base-economy').html(ws.baseEconomy);
    $('.price__base-date').html(ws.baseEndDate);

    $('.price__standart-new').html(ws.standartPrice + "&nbsp;" + getNumEnding(ws.standartPrice, rubleForms));
    $('.price__standart-old').html(ws.standartOldPrice + "&nbsp;" + getNumEnding(ws.standartOldPrice, rubleForms));
    $('.price__standart-economy').html(ws.standartEconomy);
    $('.price__standart-date').html(ws.standartEndDate);

    $('.price__premium-new').html(ws.premiumPrice + "&nbsp;" + getNumEnding(ws.premiumPrice, rubleForms));

    //Fixed navigation
    var $menu = $(".nd-header");
    var headerHeight = $menu.height();
    $(window).on("scroll load resize", function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > headerHeight) {
            $menu.addClass("nd-header--fixed");
        } else if (scrollTop <= headerHeight) {
            $menu.removeClass("nd-header--fixed");
        }
    });

    // Smooth scroll to :target links
    var smoothScrollTime = 700;
    $(document).on('click', 'a[href*="#"]:not([href="#"])', function (event) {
        event.preventDefault();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, smoothScrollTime);
                return true;
            }
        }
    });

    // Phones toggle
    $('.nd-header__phones__arrow').click(function () {
        $(this).toggleClass('active');
        $('.nd-header__phones__dropdown').toggleClass('active');
    });
    var isPhonesBlockAnimationInProgress = false;
    $(window).on("scroll load resize", function () {
        if (!isPhonesBlockAnimationInProgress) {
            isPhonesBlockAnimationInProgress = true;
            $('.nd-header__phones__arrow').removeClass('active');
            $('.nd-header__phones__dropdown').fadeOut(600, function () {
                $(this).removeClass('active').removeAttr("style");
                isPhonesBlockAnimationInProgress = false;
            });
        }
    });

    $('.nd-flex-composite-grid__item').click(function () {
        var isActive = $(this).hasClass("active");
        $('.nd-flex-composite-grid__item').removeClass("active");
        if (!isActive) {
            $(this).addClass("active");
        }
    });

    $('.nd-reviews__author').click(function () {
        $('.nd-reviews__author').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        var $active = $($('.nd-review__body').get(index));
        $('.nd-review__body.active').animate({
            opacity: 0
        }, 200, function () {
            $('.nd-review__body').removeClass("active").removeAttr("style");
            $active
                .css({
                    opacity: 0,
                    display: "block"
                })
                .animate({
                    opacity: 1
                }, 200, function () {
                    $active.addClass("active");
                });
        });
    });

    // Swiper Portfolio initialization
    var galleryTop = new Swiper('.gallery-top', {
        autoplay: 4000,
        spaceBetween: 10,
        grabCursor: true,
        autoplayDisableOnInteraction: false
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: true,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        grabCursor: true,
        autoplayDisableOnInteraction: false,
        nextButton: '.swiper-button-next-thumbs',
        prevButton: '.swiper-button-prev-thumbs'
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;

    // Swiper Employees initialization
    var employeesSwiper = new Swiper('.nd-team__swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        grabCursor: true,
        loop: true,
        nextButton: '.nd-team__next',
        prevButton: '.nd-team__prev',
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            760: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });

    // Init popups
    var openedPopups = [];
    var isInOpening = false;
    var baseModalSettings = {
        width: '750px',
        padding: 0,
        radius: 0,
        navigateCaption: false,
        navigateArrows: false,
        history: false,
        bodyOverflow: false,
        closeOnEscape: true,
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        timeout: false,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown',
        focusInput: false,
        onOpening: function (modal) {
            isInOpening = true;
            openedPopups.forEach(function (popup) {
                popup.close();
            });
            isInOpening = false;
            openedPopups.push(modal);
        },
        onClosing: function () {
            if (isInOpening) {
                return;
            }
            openedPopups.pop();
            if (openedPopups.length) {
                var previousPopup = openedPopups.pop();
                previousPopup.open();
            }
            gaTrack('/');
            yaHit('/');
        }
    };
    $("#nd-terms").iziModal($.extend({}, baseModalSettings, {
        width: '1000px',
        openFullscreen: true
    }));
    $("#nd-more").iziModal($.extend({}, baseModalSettings, {
        width: '900px'
    }));
    $(["#nd-free-gift-form",
        "#nd-courses-form",
        "#nd-price-courses-form",
        "#nd-call-form",
        "#nd-success-gift-form",
        "#nd-menu-form",
        "#nd-gift-form",
        "#nd-course-standart"
    ].join(", ")).iziModal(baseModalSettings);
    var iziForms = [{
        trigger: '.nd-terms__trigger',
        target: '#nd-terms'
    }, {
        trigger: '.nd-courses-form__trigger',
        target: '#nd-courses-form'
    }, {
        target: '#nd-price-courses-form'
    }, {
        trigger: '.nd-call-form__trigger',
        target: '#nd-call-form'
    }, {
        trigger: '.nd-menu-form__trigger',
        target: '#nd-menu-form'
    }, {
        trigger: '.nd-more__trigger',
        target: '#nd-more'
    }, {
        target: "#nd-free-gift-form"
    }, {
        target: "#nd-success-gift-form"
    }, {
        target: "#nd-gift-form"
    }, {
        trigger: '.nd-course-standart__trigger',
        target: "#nd-course-standart"
    }];
    iziForms.forEach(function (iziForm) {
        if (iziForm.trigger) {
            $(document).on('click', iziForm.trigger, function (event) {
                event.preventDefault();
                $(iziForm.target).iziModal('open');
            });
        }
    });

    // Courses table buttons
    $(document).on('click', '.nd-price__btn', function () {
        var $button = $(this);
        var courseName = $button.attr("data-course");
        var $form = $("#nd-price-courses-form");
        $form.find('.nd-price-course-name').text(courseName);
        $form.find('button.nd-submit').attr("data-theme", "Заявка на " + courseName);
        $form.iziModal("open");
    });

    // Auto open free gift popup after delay
    (function openGiftFormAfterDelay(delay) {
        setTimeout(function () {
            var someFormIsOpened = iziForms.some(function (iziForm) {
                var state = $(iziForm.target).iziModal('getState');
                return state == "opened" || state == "opening";
            });
            if (!someFormIsOpened) {
                $("#nd-free-gift-form").iziModal("open");
            } else {
                openGiftFormAfterDelay(5000);
            }
        }, delay);
    })(60000);

    $(document).on('click', '.nd-menu-form__list__item', function (event) {
        $('#nd-menu-form').iziModal('close');
    });

    $(document).on('click', '.nd-success-popup__btn', function (event) {
        event.preventDefault();
        $('#nd-success-gift-form').iziModal('close');
        $('#nd-gift-form').iziModal('open');
    });

    $(document).on('click', '.shots__btn', function (event) {
        var $button = $(this);
        var $container = $button.parent('.nd-contact-form');
        var name = $container.find('input[id$="__name"]').val();
        if (name) {
            $('input[id$="__name"]').val(name);
        }
        var email = $container.find('input[id$="__email"]').val();
        if (email) {
            $button.attr('disabled', 'disabled');
            storeToLocalstorage(name, null, email);
            $.post("./backend/subscribeShots.php", {
                email: email,
                name: name
            }).done(function (data) {
                $button.removeAttr('disabled');
            });
        }
    });

    $(document).on('click', '.gift__btn', function (event) {
        var $container = $(this).parent('.nd-contact-form');
        var email = $container.find('input[id$="__email"]').val();
        if (email) {
            $('#nd-gift-form').iziModal('close');
            storeToLocalstorage(null, null, email);
            $.post("./backend/subscribe.php", {
                email: email
            }).done(function (data) {
                // do nothing
            });
        }
    });

    // Add phone mask
    $("input[id*=phone]").mask("+375 (99) 999-99-99");

    // Submit button handler
    $(document).on('click', '.nd-submit', function (event) {
        if ($(this).hasClass('gift__btn') || $(this).hasClass('shots__btn')) {
            return;
        }
        var $button = $(this);
        var $container = $button.parent('.nd-contact-form');
        var phone = $container.find('input[id$="__phone"]').val();
        var name = $container.find('input[id$="__name"]').val();
        var theme = $button.attr('data-theme');
        if (name) {
            $('input[id$="__name"]').val(name);
        }
        if (phone) {
            $('input[id$="__phone"]').val(phone);
            submitForm(theme || 'Заявка на обратный звонок', name, phone);
        }

        function submitForm(theme, name, phone) {
            $button.attr('disabled', 'disabled');
            storeToLocalstorage(name, phone);
            $.post("./backend/submit.php", {
                theme: theme,
                name: name,
                phone: phone
            }).done(function (data) {
                $button.removeAttr('disabled');
                if (data == "OK") {
                    iziForms.forEach(function (iziForm) {
                        $(iziForm.target).iziModal('close');
                    });
                    $('#nd-success-gift-form').iziModal('open');
                    gaTrack('/success.html');
                    yaHit('/success.html');
                    fbq('track', 'success', {
                        name: name,
                        phone: phone
                    });
                }
            });
        }
    });

    // Youtube video block
    $(document).on('click', '.nd-video__icon', function (event) {
        var height = $('.nd-video').outerHeight();
        $('.nd-video')
            .css({
                'max-height': height
            })
            .html(
                '<iframe width="640" height="445" ' +
                'src="https://www.youtube.com/embed/videoseries?list=PLJJ6y-ag9R6GIoPlpR1tqCu_leyD4APk8&autoplay=1" ' +
                'frameborder="0" allowfullscreen></iframe>'
            )
            .removeClass('nd-video')
            .addClass('nd-video__embedded');
        $(window).trigger('resize');
    });

    // Scrollup button
    var scrollupSelector = '.nd-scrollup';
    var smoothScrollTime = 700;
    $(window).on("scroll load resize", function () {
        if ($(this).scrollTop() > 200) {
            $(scrollupSelector).fadeIn();
        } else {
            $(scrollupSelector).fadeOut();
        }
    });
    $(scrollupSelector).click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, smoothScrollTime);
        return false;
    });

    $(".current-year").text(new Date().getFullYear());

    loadFromLocalstorage();
});

function storeToLocalstorage(name, phone, email) {
    if (supports_html5_storage()) {
        if (name) {
            localStorage.setItem('client_name', name);
        }
        if (phone) {
            localStorage.setItem('client_phone', phone);
        }
        if (email) {
            localStorage.setItem('client_email', email);
        }
    }
}

function loadFromLocalstorage() {
    if (supports_html5_storage()) {
        if (localStorage['client_name']) {
            $('input[id$="__name"]').val(localStorage['client_name']);
        }
        if (localStorage['client_phone']) {
            $('input[id$="__phone"]').val(localStorage['client_phone']);
        }
        if (localStorage['client_email']) {
            $('input[id$="__email"]').val(localStorage['client_email']);
        }
    }
}

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('google-map'), {
        center: {
            lat: 53.903467,
            lng: 27.563767
        },
        zoom: 17,
        scrollwheel: false,
        styles: [{
            "featureType": "all",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "gamma": 0.5
            }]
        }]
    });
    var marker = new google.maps.Marker({
        position: {
            lat: 53.903467,
            lng: 27.563767
        },
        map: map,
        title: 'Фотошкола Павла Бабарыкина',
        icon: 'images/png/placeholder-small.png'
    });
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Фотошкола Павла Бабарыкина</h1>' +
        '<div id="bodyContent">' +
        '<p>пр. Независимости, 25</p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}

// Source: https://habrahabr.ru/post/105428/
function getNumEnding(iNumber, aEndings) {
    var sEnding, i;
    iNumber = iNumber % 100;
    if (iNumber >= 11 && iNumber <= 19) {
        sEnding = aEndings[2];
    } else {
        i = iNumber % 10;
        switch (i) {
            case (1):
                sEnding = aEndings[0];
                break;
            case (2):
            case (3):
            case (4):
                sEnding = aEndings[1];
                break;
            default:
                sEnding = aEndings[2];
        }
    }
    return sEnding;
}
