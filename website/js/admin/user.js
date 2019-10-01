(function ($) {

    $(function () {
        var selectedPartner, selectedRole;

        var $partnerSelect = $('select[name="partner"]');
        selectedPartner = $partnerSelect.val();

        var $groupSelect = $('select[name="groups"]');
        $groupSelect.find('option').each(function () {
            $(this).attr('data-role', $(this).text());
        });

        var $adminOption = $groupSelect.find('option[data-role="Administrator"]');
        var $userOption = $groupSelect.find('option[data-role="Partner"]');
        var $managerOption = $groupSelect.find('option[data-role="Partner Manager"]');

        $partnerSelect.on('change', updateSelected);
        updateSelected();


        function updateSelected() {
            selectedPartner = $partnerSelect.val();

            switch (selectedPartner) {

                case 'nike':
                    $adminOption.prop('disabled', false);
                    $managerOption.prop('disabled', false);
                    $userOption.prop('disabled', true);
                    $userOption.prop('selected', false);
                    break;

                case "":
                    $adminOption.prop('disabled', true);
                    $adminOption.prop('selected', false);
                    $managerOption.prop('disabled', true);
                    $managerOption.prop('selected', false);
                    $userOption.prop('disabled', true);
                    $userOption.prop('selected', false);
                    break;

                default:
                    $adminOption.prop('disabled', true);
                    $adminOption.prop('selected', false);
                    $managerOption.prop('disabled', true);
                    $managerOption.prop('selected', false);
                    $userOption.prop('disabled', false);
                    $userOption.prop('selected', true);
            }

        }


    })


})(jQuery);

