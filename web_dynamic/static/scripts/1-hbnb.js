$(() => {
  const amen = {};
  $('.amenities .popover li input').on('change', function (event) {
    const { id, name } = event.target.dataset;
    event.target.checked ? amen[name] = id : delete amen[name];
    $('.amenities h4').text(Object.keys(amen).sort().join(', '));
  });
});
