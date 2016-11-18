$(function() {
  // Handle tabordion separately from rest of form
  var tabordion = $('form > .tabordion input[type = checkbox]');
  var nonTabordion = $('form > fieldset').not('.tabordion');

  var never = tabordion.filter('#never'),
      others = tabordion.not('#never');

  // If never checked, disable all other checkboxes
  never.click(function() {
    others
      .prop('disabled', this.checked)
      .prop('checked', false);
  });

  // If other checked, disable never
  others.click(function() {
    never
      .prop('disabled', !!others.filter(':checked').length)
      .prop('checked', false);
  });

  // Validate on submission
  $('#submit').click(function() {
    var invalid = validateForm();

    $('.invalid').removeClass('invalid');
    $('#invalid').removeAttr('id');

    if (invalid.length !== 0) {
      $(invalid).parent().addClass('invalid');
      $(invalid[0]).attr('id', 'invalid');
    }
  });

  function validateForm() {
  // First validate non-tabordion answers
    var requiredNonTabordion = nonTabordion.filter('[required]');

    var invalidNonTabordion = validateNode(requiredNonTabordion);

  // Now validate tabordion answers

    // Make sure at least one checkbox is selected
    var activeTabordion = tabordion.filter(':checked');

    // Validate required dropdowns within checked tabordion
    var requiredTabordion = activeTabordion.siblings().children('fieldset[required]');

    var invalidTabordion = validateNode(requiredTabordion);

    return (activeTabordion.length ? [] : tabordion.toArray())
        .concat(invalidTabordion)
        .concat(invalidNonTabordion);

    function validateNode(node) {
      var dropdown = 'select',
          input = 'textarea, input';

      // Validate required dropdowns
      var invalidDropdowns = node.children(dropdown).filter(invalidDropdown);

      // Validate required inputs
      var invalidInputs = node.children(input).filter(invalidInput);

      return invalidDropdowns.toArray()
              .concat(invalidInputs.toArray());
    }

    function invalidDropdown(i, e) {
      return e.value === 'select';
    }

    function invalidInput(i, e) {
      return e.value === '';
    }
  }
});