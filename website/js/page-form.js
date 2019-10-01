$(function() {
    var $typeInput = $(':input[name="page_type"]');
    var $subtitleGroup = $(':input[name="subtitle"]').parents('.form-group');
    var $bannerimageGroup = $(':input[name="banner_image"]').parents('.form-group');

    $typeInput.on('change', function() {
        if ($typeInput.val() == 'homepage') {
            $subtitleGroup.hide();
            $bannerimageGroup.hide();
        }
        else {
            $subtitleGroup.show();
            $bannerimageGroup.show();
        }
    });

    $typeInput.trigger('change');
});
