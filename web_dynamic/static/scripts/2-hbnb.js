$(() => {
  const amen = {};
  $('.amenities .popover li input').on('change', function (event) {
    const { id, name } = event.target.dataset;
    event.target.checked ? amen[name] = id : delete amen[name];
    $('.amenities h4').text(Object.keys(amen).sort().join(', '));
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status',
    type: 'GET',
    success: (data) => {
      if (data.status == 'OK') {
        $('#api_status').addClass('available');
        $('#api_status').attr('id', '');
      } else {
        $('header div #api_status').removeClass('available');
      }
    }
  });
});
