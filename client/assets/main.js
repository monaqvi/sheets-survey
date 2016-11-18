$(function() {
  var dropdown = 'select',
      input = 'textarea, input';

// First validate non-tabordion answers
  var required = $('form > fieldset[required]');

  // Validate required dropdowns
  required.children(dropdown).filter(invalidDropdown);

  // Validate required inputs
  required.children(input).filter(invalidInput);

// Now validate tabordion answers

  // If never checked, disable all other checkboxes
  var tabordion = $('form > .tabordion input[type = checkbox]');

  tabordion.filter('#never').click(function() {
    tabordion.not('#never')
      .prop('disabled', this.checked)
      .prop('checked', false);
  });

  // Make sure at least one checkbox is selected
  var active_tabordion = tabordion.filter(':checked');

  // Validate required dropdowns within checked tabordion
  var required_tabordion = active_tabordion.siblings().children('fieldset[required]');

  // Validate required dropdowns
  required.children(dropdown).filter(invalidDropdown);

  // Validate required inputs
  required.children(input).filter(invalidInput);

  $('#submit').click(function() {
    console.log('validate and save!');
  });

  function invalidDropdown(i, e) {
    return e.value === 'select';
  }

  function invalidInput(i, e) {
    return e.value === '';
  }

});