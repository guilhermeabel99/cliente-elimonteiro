var main,
    options,
    $window = $(window);

function Main() {
    this.init();
    this.formMasks();
    this.lazyLoad();
};

Main.prototype.init = function () {
    let self = this;

    //Menu open
    $('.nav-icon').click(function () {
        $(this).toggleClass('open');
        $('header .menu').toggleClass('showing');
        $('body').toggleClass('menu-showing');
    });
    $(document).click(function (e) {
        if($(e.target).parent().parent().hasClass('showing')){
            $('.nav-icon').toggleClass('open');
            $('header .menu').toggleClass('showing');
            $('body').toggleClass('menu-showing');
        }
    });

    //Set background by data-bg
    $('[data-bg]').each(function () {
        let bg = $(this);

        bg.css('background-image', 'url(' + $(this).data('bg') + ')').css('opacity',0);
        setTimeout(() => {
            bg.addClass('loaded').css('opacity',1);
        }, 50);
    });
}

Main.prototype.formMasks = function () {
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
        spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };
    $('.mask-phone').mask(SPMaskBehavior, spOptions);
    $('.mask-cep').mask('00000-000');
};

Main.prototype.isOnScreen = function (element) {
    let win = $(window);

    let screenTop = win.scrollTop();
    let screenBottom = screenTop + win.height();

    let elementTop = $(element).offset().top;
    let elementBottom = elementTop + $(element).height();

    return elementBottom > screenTop && elementTop < screenBottom;
}

Main.prototype.lazyLoad = function () {
    let img,
        self = this;
    $.each($("[data-src]"), function(){
        let $this = this,
            size;

        size = $(this).data("size").split("x");


        let ratio = size[0] / size[1],
            expectedResult;

        expectedResult = size[0] / ratio;
        $($this).width(size[0]);
        $($this).height(expectedResult);
    });

    function loadImages(){
        $.each($("[data-src]"), function(){
            let $this = this;
            let image = $(this).find('img'),
                size;

            size = $(this).data("size").split("x");

            if(self.isOnScreen($this) || ($(image).hasClass('no-screen'))){
                let url = $(this).data("src");

                if(image.attr("src") != url){
                    $($this).addClass('to-show');

                    setTimeout(() => {
                        image.attr("src", url).attr('width', size[0]).attr('height', size[1]);
                        $($this).removeClass("loading to-show");
                    }, 100);

                    setTimeout(() => {
                        $($this).css('opacity', 1);
                        $($this).removeAttr("style").addClass('loaded');
                    }, 200);
                }
            }
        });
    }
    loadImages();

    $(document).on("scroll", function(){
        loadImages();
    });
}

$(document).ready(function () {
    main = new Main();
});