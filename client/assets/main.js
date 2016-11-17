$(function() {
// First validate non-tabordion answers

  // Validate required dropdowns
  $('form > fieldset[required] > select').filter(function(i, e) {
    return e.value === 'select'
  });

  // Validate required inputs
  $('form > fieldset[required] > input').filter(function(i, e) {
    return e.value === ''
  });

// Now validate tabordion answers

  // If never checked, disable all other checkboxes
  $('form > .tabordion .checkbox > input#never').click(function() {
    $('form > .tabordion .checkbox > input').not('#never')
      .prop('disabled', this.checked)
      .prop('checked', false);
  });

  // Make sure at least one checkbox is selected

  $('#submit').click(function() {
    console.log('validate and save!');
  });
});