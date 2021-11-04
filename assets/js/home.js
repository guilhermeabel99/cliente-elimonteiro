"use strict";function _defineProperty(e,i,o){return i in e?Object.defineProperty(e,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[i]=o,e}var homeApp,$window=$(window);function Home(){this.init(),this.initSlick(),this.initGallery(),this.initAccordion()}Home.prototype.init=function(){$("#diferenciais .icons-container").on("init",function(e,i){var o=0,t=$("#diferenciais .icons-container .icon"),i=i.$slides[0];!1==0<$(i).find(".showing").length&&setTimeout(function(){t.each(function(){o<$(this).height()&&(o=$(this).height())}),t.height(o)},1e3)}),$(window).on("scroll",function(){main.isOnScreen("#inscreva-se")?$(".mobile-button").addClass("inscreva-se-session"):$(".mobile-button").hasClass("inscreva-se-session")&&$(".mobile-button").removeClass("inscreva-se-session")})},Home.prototype.initSlick=function(){var e=$("#diferenciais .icons-container"),i=$("#resultados .gallery"),o=$("#depoimentos .gallery"),t=$("#depoimentos .testimonials-slide");e.slick({arrows:!1,dots:!0,infinite:!1,autoplay:!0,autoplaySpeed:2e3,responsive:[{breakpoint:9999,settings:"unslick"},{breakpoint:950,settings:{slidesToShow:2,slidesToScroll:2}}]}),i.slick({arrows:!0,dots:!1,infinite:!1,slidesToShow:5,slidesToScroll:1,autoplay:!0,autoplaySpeed:2e3,prevArrow:"#resultados .navigation .prev-arrow",nextArrow:"#resultados .navigation .next-arrow",responsive:[{breakpoint:950,settings:{slidesToShow:2,slidesToScroll:2}}]}),o.slick((_defineProperty(o={arrows:!0,dots:!0,infinite:!1,slidesToShow:5,slidesToScroll:5,autoplay:!0,autoplaySpeed:2e3},"infinite",!0),_defineProperty(o,"prevArrow","#depoimentos .navigation.video-navigation .prev-arrow"),_defineProperty(o,"nextArrow","#depoimentos .navigation.video-navigation .next-arrow"),_defineProperty(o,"responsive",[{breakpoint:950,settings:{slidesToShow:3,slidesToScroll:3}}]),o)),t.slick((_defineProperty(t={arrows:!1,dots:!0,infinite:!1,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:5e3},"infinite",!0),_defineProperty(t,"adaptiveHeight",!0),t))},Home.prototype.initAccordion=function(){var e=$(".accordion[data-to-content]");setTimeout(function(){$(e[0]).trigger("click")},50),$(e).on("click",function(){$(this).hasClass("active")?($("[data-content]").hide(300),$("[data-to-content]").removeClass("active").css("transform","rotate(0deg)")):($("[data-content]").hide(300),$("[data-to-content]").removeClass("active").find("svg").css("transform","rotate(0deg)"),$(this).toggleClass("active").find("svg").css("transform","rotate(90deg)"),$('div[data-content="'.concat($(this).data("to-content"),'"]')).toggle(300))})},Home.prototype.initGallery=function(){$("#playAboutVideo").magnificPopup({type:"inline",preloader:!1,modal:!0}),$(".video-item").magnificPopup({type:"inline",preloader:!1,modal:!0}),$(document).on("click",".videoPopup",function(e){e.preventDefault(),($(e.target).hasClass("white-popup-block")||$(e.target).hasClass(".popup-modal-dismiss"))&&($.magnificPopup.close(),$(".videoPopup").each(function(){$(this).find("video")[0].pause()}))}),$("#resultados .gallery").magnificPopup({delegate:"a.img",type:"image",tLoading:"Loading image #%curr%...",gallery:{enabled:!0,navigateByImgClick:!0},image:{tError:'<a href="%url%">A imagem #%curr%</a> Não pode ser carregada.',titleSrc:function(e){return e.el.attr("title")}},callbacks:{open:function(){var e=$(".mfp-arrow-left"),i=$(".mfp-arrow-right"),o=(o=$("#resultados .navigation").html()).split(">"),t="".concat(o[0],">"),o="".concat(o[1],">");e.html(t),i.html(o),$(".mfp-arrow img").addClass("mfp-prevent-close")}}}),$("#depoimentos .video-gallery-item").click(function(e){e.preventDefault();e=$(this).attr("href");$("#videoTestimonial").find("video").attr("src",e),setTimeout(function(){$.magnificPopup.open({items:{src:"#videoTestimonial"},type:"inline"})},100)})},$(document).ready(function(){homeApp=new Home});