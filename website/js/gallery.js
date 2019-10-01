$(function() {

  var $carousel = $('.gallery--inner').flickity({
    // options
    cellAlign: 'center',
    contain: true,
    pageDots: false,
    prevNextButtons: false,
    wrapAround: true
  });

  // previous
  $('.gallery--prev-next--prev').on( 'click', function(e) {
    e.preventDefault();
    $carousel.flickity('previous');
  });

  // next
  $('.gallery-prev-next--next').on( 'click', function(e) {
    e.preventDefault();
    $carousel.flickity('next');
  });
});
