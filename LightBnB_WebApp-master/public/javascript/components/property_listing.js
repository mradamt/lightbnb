$(() => {
  window.propertyListing = {};
  
  const newReservationForm = `
    <form id="reservation-form" class="reservation-form">
      <label for="start_date">Date</label>
      <input type="date" name="start_date">
      <input type="integer" id="num_nights" name="num_nights" min="1" max="365">
      <div class="reservation-form__field-wrapper">
          <button>Reserve property</button>
          <a id="reservation-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `;

  function createListing(property, isReservation, isReservable) {

    return `
    <article class="property-listing">
        <section class="property-listing__preview-image">
          <img src="${property.thumbnail_photo_url}" alt="house">
        </section>
        <section class="property-listing__details">
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
            <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
            <li>parking_spaces: ${property.parking_spaces}</li>
          </ul>
          ${isReservable ? newReservationForm : ``}
          ${isReservation ? 
            `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>` 
            : ``}
          <footer class="property-listing__footer">
            <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
          </footer>
        </section>
      </article>
    `
  }
  
  window.propertyListing.createListing = createListing;
  
  //window.propertyListing.$newReservationForm = newReservationForm;
  $newReservationForm.on('submit', function(event) {
    //$('#reservation-form').on('submit',function(event) {
    event.preventDefault();
    alert("hello");

    const data = $(this).serialize();
    makeReservation(data)
      .then(json => {
        console.log('json being sent to makereservation():::', json);
        if (!json.user) {
          views_manager.show('error', 'Failed to make reservation');
          return;
        }
        console.log(json.user);
        header.update(json.user);
        views_manager.show('listings');
      });
  });

});