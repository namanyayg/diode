$(function() {
  var depWidth = parseFloat($('.depletion').width());
  var maxWidth = parseFloat($('.diode').width());

  function changeWidth (width) {
    $('.depletion, .depletion-arrow').css({
      'width': width,
      'margin-left': -width/2
    });
  }

  function currentFlows (flow) {
    if ( flow ) 
      $('.flow').text('Flows.')
    else
      $('.flow').text('Does not flow.')
  }

  function depletionWidth (voltage) {
    if ( voltage >= 0.7 ) {
      changeWidth(0);
      currentFlows(true);
    }
    else if ( voltage >= 0 ) {
      changeWidth( (0.7 - voltage)/0.7 * depWidth )
      currentFlows(false);
    }
    else if ( voltage > -50 ) {
      changeWidth( (voltage/-50 * (maxWidth - depWidth)) + depWidth )
      currentFlows(false);
    }
    else { // voltage <= 50
      changeWidth( maxWidth )
      currentFlows(true);
    }
  }

  $('input').on('change keyup', function() {
    var voltage = parseFloat($(this).val());
    
    if ( Number.isNaN(voltage) )
      return false

    depletionWidth(voltage);

    if ( voltage >= 0 ) {
      $('.battery').removeClass('battery--reverse');
    } 
    else {
      $('.battery').addClass('battery--reverse');
    }
  });
});