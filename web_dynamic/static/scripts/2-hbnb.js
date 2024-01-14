$(() => {
    $.ajax({
        url: 'http://localhost:5001/api/v1/status/',
        type: 'GET',
        success: (data) => {
            if (data.status === 'OK') {
                $('DIV#api_status').addClass('available');
            } else {
                $('DIV#api_status').removeClass('available');
            }
        }
    });

    const amen = {};
    $('.amenities .popover li input').on('change', function (event) {
        const { id, name } = event.target.dataset;
        event.target.checked ? amen[name] = id : delete amen[name];
        $('.amenities h4').text(Object.keys(amen).sort().join(', '));
    });
});

$(() => {

});
