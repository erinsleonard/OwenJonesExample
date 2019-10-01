// Surfaces partner form

$(function() {

  // handle click on surface Tile
  $('.surfaces--partner-form .surfaces--link').on('click', function(e){
    e.preventDefault();

    if(!$(this).hasClass('surfaces--link--ext')) {
      var locations = String($(this).data('locations')).split(',');
      var location_select_val = $('select[name="project_location"]').val();
      if (location_select_val && $.inArray(location_select_val, locations) == -1) {
        var surfaceName = $(this).attr('data-surface'); 
        surfaceName = surfaceName.replace(/_/g, ' ');

        $("#errors").html('We’re sorry.  Nike Grind <span style="text-transform: capitalize;">' + surfaceName +  '</span> are not currently available in this location.');
        $('#messageModal').modal('show');
        return false;
      }

    }

    var surfaceID = $(this).attr('data-surface');
    $(this).toggleClass('active');
    $(this).parent().toggleClass('active');
    $('input#' + surfaceID).click();

  });

  // add active class to tiles on click
  $('.surfaces--partner-form .surfaces--ext-link-wrapper').on('click', function(e){
    $(this).parent().removeClass('active');
    $(this).parent().find('.surfaces--link').removeClass('active');
  });

  // remove active class on external link when modal is closed
  $('#externalModal .close, #externalModal').on('click', function() {
    $('.surfaces--link--ext.active').parent().removeClass('active');
    $('.surfaces--link--ext.active').removeClass('active');
  });

  // handle select menu change
  var initial_choice;
  $('select[name="project_location"]').on('focus', function() {
    initial_choice = $(this).val();
  }).change(function() {

    var $location_select = $(this);
    var disqualified_sfc = [];
    
    $('.surfaces--link').each(function() {

      if ($(this).hasClass('active')) {
        var locations = String($(this).data('locations')).split(',');
        
        if ($.inArray($location_select.val(), locations) == -1) {
          disqualified_sfc.push($(this).find('span').text());
        }

      }
    });
    
    if (disqualified_sfc.length) {
      $location_select.val(initial_choice);
      $location_select.find('option[value="' + initial_choice + '"]').prop('selected', true);
      if (disqualified_sfc.length <= 1) {
        var between_str = ' are not';
      } else {
        var between_str = ' are not';
      }
      $("#errors").html("We’re sorry.  Nike Grind " + disqualified_sfc.join(" and ") + between_str + " currently available in this location.");
      // $("#errors").html("We’re sorry. Nike Grind Playground Surfaces are not currently available in this location.");
      $('#messageModal').modal('show');
    }

  }

  );
});

var delay = 0;
var offset = 100;

document.addEventListener('invalid', function(e){
 $(e.target).addClass("invalid");
 $('html, body').animate({scrollTop: $($(".invalid")[0]).offset().top - offset }, delay);
}, true);
document.addEventListener('change', function(e){
 $(e.target).removeClass("invalid")
}, true);


// Surfaces hover
$(function() {
  $('.surfaces--item').on('mouseenter', function(e){
    $(this).addClass('hover');
  });

  $('.surfaces--item').on('mouseleave touchend', function(e){
    $(this).removeClass('hover');
  });  
});
// Remove hover class on page show for back button
window.onload=window.onpageshow= function() {
 $('.surfaces--item').removeClass('hover');
};
