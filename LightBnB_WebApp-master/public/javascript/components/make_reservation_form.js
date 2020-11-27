$(() => {

  const $newReservationForm = $(`
  <form id="reservation-form" class="reservation-form">
      <p>Reservation</p>
      <div class="reservation-form__field-wrapper">
        <input type="date" name="start_date">
      </div>

      <div class="reservation-form__field-wrapper">
        <input type="integer" id="num_nights" name="num_nights" min="1" max="365">
      </div>

      <div class="reservation-form__field-wrapper">
          <button>Reserve property</button>
          <a id="reservation-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `);

  window.$newReservationForm = $newReservationForm;

  $newReservationForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    makeReservation(data)
      .then(json => {
        console.log(json);
        if (!json.user) {
          views_manager.show('error', 'Failed to make reservation');
          return;
        }
        console.log(json.user);
        header.update(json.user);
        views_manager.show('listings');
      });
  });

  $('body').on('click', '#reservation-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });
      
});