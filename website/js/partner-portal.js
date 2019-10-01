
$(function () {
    var $form = $('.browse-leads-filter-form');


    if(!$form.length) {
        return;
    }

    var $searchInput = $form.find('input[type="search"]');
    var $searchButton = $form.find('.browse-leads--search-icon');
    var $sortButton = $form.find('.browse-leads--sort');
    var $exportButton = $form.find('.browse-leads--export');

    var $addFilterDropdown = $form.find('.browse-leads--add-filter-dropdown');
    var $filterDropdownMenuItems = $addFilterDropdown.find('.dropdown-menu-items');

    var $activeFilterContainer = $form.find('.browse-leads--active-filters');
    var $activeFilters = $activeFilterContainer.find('.browse-leads--active-filter');


    var $pageInput = $('#query-input-page');
    var $ortderByInput = $('#query-input-order');
    var $maxBudgetInput = $('#query-input-max_budget');
    var $minBudgetInput = $('#query-input-min_budget');
    var $surfaceInput = $('#query-input-surface');
    var $monthInput = $('#query-input-month');
    var $quarterInput = $('#query-input-quarter');
    var $yearInput = $('#query-input-year');
    var $countriesInput = $('#query-input-countries');


    $form.find('[data-filter-target]').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var filterName = $(e.target).attr('data-filter-target');
        showFilterInDropdown(filterName);
    });

    function showFilterInDropdown(filterName) {
        $filterDropdownMenuItems.addClass('hidden');
        $form.find('[data-filter="' + filterName + '"]').removeClass('hidden');
    }

    $form.find('.dropdown-menu').on('click.bs.dropdown.data-api', function (e) { e.stopPropagation() });

    $addFilterDropdown.on('hidden.bs.dropdown', resetFilterDropdown);

    function resetFilterDropdown() {
        $filterDropdownMenuItems.removeClass('hidden');
        $form.find('[data-filter]').addClass('hidden');
    }

    $('[data-filter] select').on('change', function(evt){

        $(this).closest('.dropdown').dropdown('toggle')

        var filterName = $(this).parent().data('filter');
        addFilterOption(filterName, $(this).val());

    });

    $('.browse-leads--sort-dropdown .dropdown-menu-items a').on('click', function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        $(this).closest('.dropdown').dropdown('toggle')
        var order_by = $(this).data('sort-target');
        var orderInput = $('#query-input-order');
        if(typeof orderInput.attr('name') === 'undefined') {
            orderInput.attr('name', 'order')
        }
        orderInput.val(order_by);
        submitForm();
    });


    function submitForm() {
        $('.filter-hidden-inputs input').each(function(){
            var input = $(this);
            if(input.val() === '') {
                input.removeAttr('name')
            }
        });

        if(history.pushState) {
            history.pushState(null, null, '#top');
        }
        else {
            location.hash = '#top';
        }

        $form.trigger('submit');
    }


    $('.filter-hidden-inputs input').each(function(){
        var input = $(this);


        if(input.val() === '' || typeof input.val() === 'undefined') {
            return;
        }

        var filterSelectedValues = input.val().split(',');

        var filterName = input.attr('name');
        var filterLabel = $filterDropdownMenuItems.find('a[data-filter-target="' + filterName + '"]').text();

        for(var i=0; i < filterSelectedValues.length; i++) {
            var filterValue = filterSelectedValues[i];
            var option = $form.find('[data-filter="' + filterName + '"] option[value="' + filterValue + '"]');
            var optionLabel = option.text();
            option.remove();

            var filterSelection = $(activeFilterHtml(filterName, filterLabel, filterValue, optionLabel));

            filterSelection.find('.browse-leads--active-filters--remove').parent().click(function(evt){
                var filterName = $(this).data('filter-name');
                var filterOptionValue = $(this).data('filter-value');
                removeFilterOption(filterName, filterOptionValue)

            });

            $('.browse-leads--active-filters').append(filterSelection);
        }
    });


    function activeFilterHtml(filterName, filterLabel, filterOptionValue, filterOptionLabel) {
       return '<div class="browse-leads--active-filter" data-filter-name="' + filterName + '" data-filter-value="' + filterOptionValue + '">'
       + '<div class="browse-leads--active-filters--filter">'
       +	filterLabel
       + '</div><div class="browse-leads--active-filters--value">'
       +	filterOptionLabel
       + '</div><div class="browse-leads--active-filters--remove">X</div></div>'
   }


   function addFilterOption(filterName, filterOptionValue) {
    var input = $form.find('.filter-hidden-inputs #query-input-' + filterName);
    if(typeof input.attr('name') === "undefined") {
        input.attr('name', filterName)
    }
    var options;
    if(input.val() === '' || typeof input.val() === 'undefined') {
        options = [];
    } else {
        options = input.val().split(',');
    }
    options.push(filterOptionValue);
    input.val(options.join(','));
    submitForm();
}

function removeFilterOption(filterName, filterOptionValue) {
    var input = $form.find('.filter-hidden-inputs #query-input-' + filterName);
    var options = input.val();
    if(input.val() === '' || typeof input.val() === 'undefined') {
        submitForm();
    }
    var vals = options.split(',');
    var index = vals.indexOf(str(filterOptionValue));
    if (index !== -1) {
        vals.splice(index, 1);
    }
    if(vals.length) {
        input.val(vals.join(','))
    } else {
        input.removeAttr('name')
    }

    submitForm();
}

function str(string) {
    return string + "";
}
});

