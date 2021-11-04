var homeApp;
var $window = $(window);

function Home() {
    this.init();
    this.initSlick();
    this.initGallery();
    this.initAccordion();
};

Home.prototype.init = function () {
    let self = this,
        $differentials = $('#diferenciais .icons-container');

    $differentials.on('init', function(event, slick) {
        var slideHeight = 0,
            differentialItem = $('#diferenciais .icons-container .icon');
        let thisSlide = slick.$slides[0];

        let showElement = ($(thisSlide).find(".showing").length > 0) ? true : false;

        if (showElement === false) {
            setTimeout(() => {
                differentialItem.each(function () {
                    if(slideHeight < $(this).height()){
                        slideHeight = $(this).height();
                    }
                })
                differentialItem.height(slideHeight);
            }, 1000);
        }
    });

    $(window).on( 'scroll', function(){
        if(main.isOnScreen('#inscreva-se')){
            $('.mobile-button').addClass('inscreva-se-session');
        } else {
            if($('.mobile-button').hasClass('inscreva-se-session')){
                $('.mobile-button').removeClass('inscreva-se-session');
            }
        }
    });
}


Home.prototype.initSlick = function () {
    let $differentials = $('#diferenciais .icons-container'),
        $gallery = $('#resultados .gallery'),
        $testimonials = $('#depoimentos .gallery'),
        $testimonialsText = $('#depoimentos .testimonials-slide');

    $differentials.slick({
        arrows: false,
        dots: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 9999,
                settings: "unslick",
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    });

    $gallery.slick({
        arrows: true,
        dots: false,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '#resultados .navigation .prev-arrow',
        nextArrow: '#resultados .navigation .next-arrow',
        responsive: [
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    });

    $testimonials.slick({
        arrows: true,
        dots: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        prevArrow: '#depoimentos .navigation.video-navigation .prev-arrow',
        nextArrow: '#depoimentos .navigation.video-navigation .next-arrow',
        responsive: [
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            }
        ]
    });

    $testimonialsText.slick({
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        adaptiveHeight: true
    });
}

Home.prototype.initAccordion = function () {
    let accordionButton = $(".accordion[data-to-content]");
    setTimeout(() => {
        $(accordionButton[0]).trigger("click");
    }, 50);

    $(accordionButton).on("click",function () {
        if(!$(this).hasClass("active")){
            $('[data-content]').hide(300);
            $('[data-to-content]').removeClass('active').find('svg').css("transform", "rotate(0deg)");
            $(this).toggleClass('active').find('svg').css("transform", "rotate(90deg)");
            $(`div[data-content="${$(this).data("to-content")}"]`).toggle(300);
        }else{
            $('[data-content]').hide(300);
            $('[data-to-content]').removeClass('active').css("transform", "rotate(0deg)");
        }
    });
}
Home.prototype.initGallery = function () {
	$('#playAboutVideo').magnificPopup({
		type: 'inline',
		preloader: false,
		modal: true
	});
	$('.video-item').magnificPopup({
		type: 'inline',
		preloader: false,
		modal: true
	});
	$(document).on('click', '.videoPopup', function (e) {
		e.preventDefault();
        if($(e.target).hasClass('white-popup-block') || $(e.target).hasClass('.popup-modal-dismiss')){
		    $.magnificPopup.close();
            $('.videoPopup').each(function(){
                $(this).find('video')[0].pause();
            })
        }
	});
	$('#resultados .gallery').magnificPopup({
        delegate: 'a.img',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
		},
		image: {
			tError: '<a href="%url%">A imagem #%curr%</a> Não pode ser carregada.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		},
        callbacks: {
            open: function() {
                let mfpLeft = $('.mfp-arrow-left'),
                    mfpRight = $('.mfp-arrow-right'),
                    btns = $('#resultados .navigation').html(),
                    btnLeft,
                    btnRight;

                    btns = btns.split('>');
                    btnLeft = `${btns[0]}>`;
                    btnRight = `${btns[1]}>`;

                mfpLeft.html(btnLeft);
                mfpRight.html(btnRight);

                $('.mfp-arrow img').addClass('mfp-prevent-close');
            },
        },
	});

    $('#depoimentos .video-gallery-item').click(function(e){
        e.preventDefault();
        let link = $(this).attr('href');
        $('#videoTestimonial').find('video').attr('src', link);

        setTimeout(() => {
            $.magnificPopup.open({
                items: {
                    src: '#videoTestimonial'
                },
                type: 'inline'
            });
        }, 100);
    })
}

$(document).ready(function () {
    homeApp = new Home();
});