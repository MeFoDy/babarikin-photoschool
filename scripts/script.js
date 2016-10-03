$(function() {
    // Init popups
    $("#nd-terms").iziModal({
        width: '1000px',
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
        transitionOut: 'fadeOutDown'
    });
    $("#nd-free-lesson-form, #nd-courses-form, #nd-call-form").iziModal({
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
        transitionOut: 'fadeOutDown'
    });
    var iziForms = [{
        trigger: '.nd-terms__trigger',
        target: '#nd-terms'
    }, {
        trigger: '.nd-free-lesson-form__trigger',
        target: '#nd-free-lesson-form'
    }, {
        trigger: '.nd-courses-form__trigger',
        target: '#nd-courses-form'
    }, {
        trigger: '.nd-call-form__trigger',
        target: '#nd-call-form'
    }];
    iziForms.forEach(function(iziForm) {
        $(document).on('click', iziForm.trigger, function(event) {
            event.preventDefault();
            $(iziForm.target).iziModal('open');
        });
    });

    // Youtube video block
    $(document).on('click', '.nd-video__icon', function(event) {
        var height = $('.nd-video').outerHeight();
        $('.nd-video')
            .css({
                'max-height': height
            })
            .html(
                '<iframe width="640" height="360" ' +
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
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $(scrollupSelector).fadeIn();
        } else {
            $(scrollupSelector).fadeOut();
        }
    });

    $(scrollupSelector).click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, smoothScrollTime);
        return false;
    });

    // Smooth scroll to :target links
    $(document).on('click', 'a[href*="#"]:not([href="#"])', function(event) {
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

    // Mini photo slider
    $(document).on('click', '.nd-slider__mini', function(event) {
        if (!$(this).hasClass('active')) {
            var src = $(this).find('img').attr('src');
            $(".nd-slider__main-photo").fadeTo(300, 0.2, function() {
                $(this).find('img').attr('src', src);
            }).fadeTo(300, 1);
        }
        $('.nd-slider__mini').removeClass('active');
        $(this).addClass('active');
        return false;
    });
    $(document).on('click', '.nd-slider__prev', function(event) {
        var $prev = $('.nd-slider__mini.active').prev();
        if (!$prev.hasClass('nd-slider__mini')) {
            $prev = $('.nd-slider__next').prev();
        }
        $prev.trigger('click');
    });
    $(document).on('click', '.nd-slider__next', function(event) {
        var $next = $('.nd-slider__mini.active').next();
        if (!$next.hasClass('nd-slider__mini')) {
            $next = $('.nd-slider__prev').next();
        }
        $next.trigger('click');
    });

    // Mini reviews slider
    $(document).on('click', '.nd-reviews__next', function(event) {
        var $current = $('.nd-reviews__review.active');
        var $next = $current.next();
        if (!$next.hasClass('nd-reviews__review')) {
            $next = $('.nd-reviews__prev').next();
        }
        $current.fadeTo(300, 0.2, function() {
            $current.removeClass('active');
            $next.addClass('active').fadeTo(300, 1);
        });
    });
    $(document).on('click', '.nd-reviews__prev', function(event) {
        var $current = $('.nd-reviews__review.active');
        var $prev = $current.prev();
        if (!$prev.hasClass('nd-reviews__review')) {
            $prev = $('.nd-reviews__next').prev();
        }
        $current.fadeTo(300, 0.2, function() {
            $current.removeClass('active');
            $prev.addClass('active').fadeTo(300, 1);
        });
    });
    $(document).on('click', '.nd-reviews__progress__item', function(event) {
        var $current = $('.nd-reviews__review.active');
        var $next = $($('.nd-reviews__review').get($(this).index()));
        $current.fadeTo(300, 0.2, function() {
            $current.removeClass('active');
            $next.addClass('active').fadeTo(300, 1);
        });
    });
});


var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('google-map'), {
        center: {
            lat: 53.8892491,
            lng: 27.5756478
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
            lat: 53.8892491,
            lng: 27.5756478
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
        '<p>ул. Октябрьская, 16А</p>' +
        '<p>Фотостудия «Дива» – <a href="http://divastudio.by/shema-proezda" target="_blank">схема проезда</a></p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}