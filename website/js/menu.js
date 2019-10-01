$(function() {
  $('.header--menu-toggle, .header--menu-close').on('click', function(e){
    e.preventDefault();
    $('.header--nav-wrapper').toggleClass('open');
  });

  $('.header--user-menu-toggle, .header--user-menu-close').on('click', function(e){
    e.preventDefault();
    $('.header--user-nav-wrapper').toggleClass('open');
  });

  if(window.location.hash && $('.header--user-authenticated').length ) {
    $('html, body').animate({
        scrollTop: $("#top").offset().top
    }, 500);
  }

  $('.mobile-menu--nav-item-submenu-toggle').on('click', function(e){
    e.preventDefault();
    $(this).closest('.mobile-menu--nav-li').find('.mobile-menu--nav-submenu').toggleClass('open');
    var subMenuHeight = $(this).closest('.mobile-menu--nav-li').find('.mobile-menu--nav-submenu').outerHeight();
    $('#footer--menu').css('min-height', subMenuHeight);
  });

  $('.mobile-menu--nav-submenu-back').on('click', function(e){
    e.preventDefault();
    $(this).closest('.mobile-menu--nav-submenu').toggleClass('open');
    $('#footer--menu').css('min-height', '0');
  });


//'#header:not(.not-sticky), .partner-portal--header--container, 
  var elements = $('.surface--nav');
  Stickyfill.add(elements);
});
