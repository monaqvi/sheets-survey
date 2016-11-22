$(function() {
  // Handle tabordion separately from rest of form
  var tabordion = $('form > .tabordion input[type = checkbox]'),
      nonTabordion = $('form > fieldset').not('.tabordion');

  var never = tabordion.filter('#never'),
      others = tabordion.not('#never');

  var allInputs = 'input, select, textarea';

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

  // Programatically add tabordion labels
  (function() {
    var labels = [
      'communicate',
      'anonymous',
      'pay_up_to',
      // 'in_mind'
    ];

    var labelsForOther = [
      'detail',
    ].concat(labels);

    // Go through each checkbox
    others.each(function() {
      var group = $(this);
      var id = group.prop('id');

      group.siblings().children('fieldset').children(allInputs).each(function(i) {
        var self = $(this);
        self.addClass('tabordion_sub')
        if (id === 'other') {
          self.attr('id', id + '__' + labelsForOther[i])
        } else {
          self.attr('id', id + '__' + labels[i])
        }
      });
    });
  })();

  // Make rate required if person wants to be an expert
  $('#expert').change(function(e) {
    var rate = $('#expert_hourly_rate').parent();
    var bool = e.target.value === 'Y';
    rate.attr('required', bool);;
  });

  // Validate on submission
  $('#submit').click(function() {
    var invalid = validateForm();

    $('.invalid').removeClass('invalid');
    $('#invalid').removeAttr('id');

    if (invalid.length !== 0) {
      $(invalid).parent().addClass('invalid');
      // Important to add to parent to not overwrite individual field ids
      $(invalid[0]).parent().attr('id', 'invalid');
    } else {
      var save = {};

      // Erase tabordion_sub data if never was subsequently clicked
      if ($('#never').is(':checked')) {
        $('.tabordion_sub').each(function() { $(this).prop('value', ''); })
      }

      $(allInputs).each(function() {
        var self = $(this);
        var label = self.prop('id');
        if (self.prop('type') === 'checkbox') {
          save[label] = Boolean(self.prop('checked')) ? 'Y' : 'N';
        } else {
          save[self.prop('id')] = self.prop('value');
        }
      });

      $.ajax({
        method: 'POST',
        url: "/app/save",
        data: save,
        success: function(res) {
          console.log(res);
          window.location.href = '/thankyou/';
        }
      });
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
          text = 'textarea, input[type = text]';
          number = 'input[type = number]';


      // Validate required dropdowns
      var invalidDropdowns = node.children(dropdown).filter(invalidDropdown);

      // Validate required text inputs
      var invalidTexts = node.children(text).filter(invalidText);

      // Validate required number inputs
      var invalidNumbers = node.children(number).filter(invalidNumber);

      return invalidDropdowns.toArray()
              .concat(invalidTexts.toArray())
              .concat(invalidNumbers.toArray());
    }

    function invalidDropdown(i, e) {
      return e.value === '';
    }

    function invalidText(i, e) {
      return e.value === '';
    }

    function invalidNumber(i, e) {
      var num = parseFloat(e.value);
      return isNaN(num) || num < 0;
    }
  }
});