// Video overlay
$(function() {
  // Fill in iframe source
  $('.modal--trigger').on('click', function(e) {
    var videoSource = $(this).attr('data-video');
    $('#videoModal').find('iframe').attr('src', videoSource);
    $('#videoModal').modal();
  });

  // Reset iframe source on close
  $(".modal-backdrop, #videoModal .close, #videoModal .btn").on("click", function() {
    $("#videoModal iframe").attr("src", $("#videoModal iframe").attr("src"));
  });
});
