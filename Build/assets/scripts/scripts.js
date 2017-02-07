/*-----------------------
  @MODULE
------------------------*/
// ww.module_prototype = (function(){
//   return {
//     init: function() {
//
//     }
//   };
// })();

if (typeof ww == 'undefined') {
  var ww = {};
}

/*-----------------------
  @MAIN
------------------------*/
ww.main = (function() {
  return {
    init: function() {
      this.register_events();
    },

    register_events: function() {
      ww.dropdown.init();
      ww.fixednav.init();
      ww.scrollspy.init();
      ww.scrollto.init();
      ww.slider.init();
      ww.tabs.init();
      ww.video.init();
    },
  };
})();

/*-----------------------
  @DROPDOWN
------------------------*/
ww.dropdown = (function(){
  return {
    init: function() {
      $(".m_dropdown").live("click", function(){
        $(this).toggleClass("active");
      });
    }
  };
})();

/*-----------------------
  @FIXED NAV
------------------------*/
ww.fixednav = (function(){
  return {
    init: function() {
      var $win = $(window),
        $body = $("body"),
        $el = $(".fix-me");

      if ($el.length) {
        var eloffset = ($el.offset().top + 5);

        $win.scroll(function() {
          if (eloffset < $win.scrollTop()) {
            $el.addClass("is-fixed");
            $body.css({"padding-top":$el.outerHeight()});
          } else {
             $el.removeClass("is-fixed");
             $body.css({"padding-top":"0"});
          }
        });
      }
    }
  };
})();

/*-----------------------
  @SCROLLSPY
------------------------*/
ww.scrollspy = (function(){
  return {
    init: function() {
      var $links = $(".scrollspy");

      $(window).live("scroll", function() {
        var scrollPos = $(window).scrollTop() + 100;

        $links.each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));

            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $links.removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
      });
    }
  }
})();

/*-----------------------
  @SCROLLTO
------------------------*/
ww.scrollto = (function(){
  return {
    init: function() {
      $(".scrollto").click(function(e) {
        e.preventDefault();

        var target = $(this).attr("href").replace("#", "");

        $("html, body").animate({
          scrollTop: $("#" + target).offset().top - 100
        }, 800)
      });
    }
  };
})();

/*-----------------------
  @MODULE
------------------------*/
ww.tabs = (function(){
  return {
    init: function() {
      $('.tab-list').each(function() {
        var $this = $(this);
        var $tab = $this.find('li.active');
        var $link = $tab.find('a');
        var $panel = $($link.attr('href'));

        $this.find('.tab-control').click(function(e) {
          e.preventDefault();
          var $link = $(this),
              id = this.hash;

          if (id && !$link.is('.active')) {
            $panel.removeClass('active');
            $tab.removeClass('active');

            $panel = $(id).addClass('active');
            $tab = $link.parent().addClass('active');
          }
        });
      });
    }
  };
})();

/*-----------------------
  @TAB SLIDER
------------------------*/
ww.slider = (function(){
  return {
    init: function() {
      $('.slider').each(function() {
        var $this = $(this);
        var $group = $this.find('.slide-group');
        var $slides = $this.find('.slide');
        var buttonArray = [];
        var currentIndex = 0;
        var button_speed = 500;
        var $prev_btn = $('.btn-prev');
        var $next_btn = $('.btn-next');

        function move(newIndex) {
          var animateLeft, slideLeft;
          var currentSlide = $('.active-slide');
          var nextSlide = currentSlide.next();

          function updateSlide() {
            if (newIndex > currentIndex) {
              slideLeft = '100%';
              animateLeft = '-100%';
            } else {
              slideLeft = '-100%';
              animateLeft = '100%';
            }

            // Position new slide to left (if less) or right (if more) of current
            $slides.eq(newIndex).css({left: slideLeft, display: 'block'});
            $(".slide").css({position:"absolute"});

            $group.animate({left: animateLeft}, function() {
              $slides.eq(currentIndex).css( {display: 'none'});
              $slides.eq(newIndex).css( {position:"absolute",left: 0}).css( {position: "static"} );
              $group.css( {left: 0} );
              currentIndex = newIndex;
            });
          }

          // If it is the current slide / animating do nothing
          if ($group.is(':animated') || currentIndex === newIndex) {
            return;
          }

          if (nextSlide.length === 0) {
            nextSlide = $('.slide').first();
            $next_btn.fadeIn(button_speed);
            $prev_btn.fadeOut(button_speed);
            updateSlide();
          } else {
            $prev_btn.fadeIn(button_speed);
            $next_btn.fadeOut(button_speed);
            updateSlide();
          }

          buttonArray[currentIndex].removeClass('active');
          buttonArray[newIndex].addClass('active');
          nextSlide.addClass('active-slide');
          currentSlide.removeClass('active-slide');
        }

        $.each($slides, function(index) {
          var $button = $('.btn-slide');
          if (index === currentIndex) {
            $button.addClass('active');
          }

          $button.live('click', function() {
            move(index);
          });

          buttonArray.push($button);
        });
      });
    }
  };
})();

/*-----------------------
  @VIDEO
------------------------*/
ww.video = (function(){
  return {
    init: function() {
      $('video').live('click', function(){
        $(this)[0].play();
      });
    }
  };
})();

/*
 * LOAD!
 */
jQuery(function() {
  ww.main.init();
});
