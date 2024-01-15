$(() => {
  const amenitiesSelection = {};
  const amenList = [];
  const stateSelection = {};
  const stateList = [];
  const citySelection = {};
  const cityList = [];

  // Amenity
  $('.amenities .popover li input').on('change', (event) => {
    const { id, name } = event.target.dataset;
    event.target.checked ? amenitiesSelection[name] = id : delete amenitiesSelection[name];
    event.target.checked ? amenList.push(id) : amenList.pop(id);
    $('.amenities h4').text(Object.keys(amenitiesSelection).sort().join(', '));
  });

  // City
  $('.locations .popover li ul li input').on('change', (event) => {
      const { id, name } = event.target.dataset;
      event.target.checked ? citySelection[name] = id : delete citySelection[name];
      event.target.checked ? cityList.push(id) : cityList.pop(id);
      $('.locations h4').text(Object.keys(citySelection).sort().join(', '));
  });

  // State
  $('.locations .popover li h2 input').on('change', (event) => {
      const { id, name } = event.target.dataset;
      event.target.checked ? stateSelection[name] = id : delete stateSelection[name];
      event.target.checked ? stateList.push(id) : stateList.pop(id);
      $('.locations h4').text(Object.keys(stateSelection).sort().join(', '));
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status',
    type: 'GET',
    success: (data) => {
      const apiStatusElement = $('#api_status');

      if (data.status === 'OK') {
        apiStatusElement.addClass('available');
        apiStatusElement.removeAttr('id');
      } else {
        apiStatusElement.removeClass('available');
      }
    }
  });

  function renderPlace (data) {
    const placesContainer = $('.places');
    placesContainer.empty();

    $.each(data, (index, place) => {
        const articleHTML = `
          <article>
              <div class='title_box'>
                  <h2>${place.name}</h2>
                  <div class='price_by_night'>$${place.price_by_night}</div>
              </div>
              <div class='information'>
                  <div class='max_guest'>
                      ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
                  </div>
                  <div class='number_rooms'>
                      ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
                  </div>
                  <div class='number_bathrooms'>
                      ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
                  </div>
              </div>
              <div class='description'>
                  ${place.description}
              </div>
          </article>`;

        placesContainer.prepend(articleHTML);
    });
  }

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: (data) => {
      renderPlace(data);
    }
  });

  $('button[type=button]').on('click', (event) => {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
          states: stateList,
          cities: cityList,
          amenities: amenList
      }),
      success: (data) => {
        renderPlace(data);
      }
    });
  });
});

