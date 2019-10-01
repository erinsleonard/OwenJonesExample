function toggle_stat_fields(stat_type) {
    if (stat_type == 'value') {
        $('#id_value').closest('.form-group').show();
        $('#id_unit').closest('.form-group').show();

        $('#id_image').closest('.form-group').hide();
    } else if (stat_type == 'image') {
        $('#id_image').closest('.form-group').show();

        $('#id_value').closest('.form-group').hide();
        $('#id_unit').closest('.form-group').hide();
    }
}


$(document).ready(function() {
    var stat_type = $('#id_stat_type').val();
    toggle_stat_fields(stat_type);
    
    $('#id_stat_type').on('change', function() {
        toggle_stat_fields($(this).val());
    });
});
