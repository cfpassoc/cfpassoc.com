(function($) {
    "use strict";
    $(document).ready(function() {
        $(document).foundation();

        var result = $('#result');
        var locationsDisplay = $('#locationsDisplay');
        var additionalMembersDisplay = $('#additionalMembersDisplay');
        var locationsCost = $('#locationsCost');
        var membersCost = $('#membersCost');

        function calculateTotal() {
            var locations = parseInt($('#locationsValue').val()) || 1;
            var additionalMembers = parseInt($('#additionalMembersValue').val()) || 0;
            var billingCycle = $('input[name="billingCycle"]:checked').val();

            // Update displays
            locationsDisplay.text(locations === 10 ? '10+' : locations);
            additionalMembersDisplay.text(additionalMembers);

            // Costs
            var baseCost = 52.50;
            var additionalLocations = Math.max(0, locations - 1);
            var chargedAdditionalLocations = Math.min(additionalLocations, 9);
            var locationsMonthly = baseCost + chargedAdditionalLocations * 5;
            var membersMonthly = additionalMembers * 10;
            var monthlyCost = locationsMonthly + membersMonthly;

            locationsCost.text('Locations Cost: $' + locationsMonthly.toFixed(2) + ' /month');
            membersCost.text('Additional Members Cost: $' + membersMonthly.toFixed(2) + ' /month');

            var totalCost = monthlyCost;
            var period = '/month';

            if (billingCycle === 'annual') {
                totalCost = monthlyCost * 12 * 0.9;
                period = '/year';
            }

            result.text('Total Cost: $' + totalCost.toFixed(2) + ' ' + period);
        }

        // Listen for slider changes (on release)
        $('.range-slider').on('change.fndtn.slider', calculateTotal);

        // Listen for real-time updates during drag (via input event on hidden field)
        $('#locationsValue, #additionalMembersValue').on('input', calculateTotal);

        // Listen for radio changes
        $('input[name="billingCycle"]').on('change', calculateTotal);

        // Initial calculation
        calculateTotal();
    });

})(Tc.$);
