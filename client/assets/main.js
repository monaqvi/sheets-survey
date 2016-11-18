$(function() {

  $('#submit').click(function() {
    var invalid = validateForm();

    $('.invalid').removeClass('invalid');
    $(invalid).parent().addClass('invalid');
  });

  function validateForm() {
    var invalid = [];

  // First validate non-tabordion answers
    var required = $('form > fieldset[required]');

    var invalid = validateNode(required);

  // Now validate tabordion answers

    // If never checked, disable all other checkboxes
    var tabordion = $('form > .tabordion input[type = checkbox]');

    tabordion.filter('#never').click(function() {
      tabordion.not('#never')
        .prop('disabled', this.checked)
        .prop('checked', false);
    });

    // Make sure at least one checkbox is selected
    var activeTabordion = tabordion.filter(':checked');

    // Validate required dropdowns within checked tabordion
    var requiredTabordion = activeTabordion.siblings().children('fieldset[required]');

    var invalidTabordion = validateNode(requiredTabordion);

    console.log($(invalid).parent());

    return (activeTabordion.length ? [] : tabordion.toArray())
            .concat(invalid)
            .concat(invalidTabordion);

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