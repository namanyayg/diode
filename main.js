$(function() {
  var kneeVoltage = 0.7
    , breakdownVoltage = 10

  var maxWidth = parseFloat($('.diode').width())
    , unitWidth = maxWidth/(breakdownVoltage + kneeVoltage)
    , depWidth = unitWidth * kneeVoltage;

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
    if ( voltage >= kneeVoltage ) {
      changeWidth(0);
      currentFlows(true);
    }
    else if ( voltage >= 0 ) {
      changeWidth( (kneeVoltage - voltage)/kneeVoltage * depWidth )
      currentFlows(false);
    }
    else if ( voltage > -breakdownVoltage ) {
      changeWidth( (voltage/-breakdownVoltage * (maxWidth - depWidth)) + depWidth )
      currentFlows(false);
    }
    else { // voltage <= breakdownVoltage
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

  changeWidth(depWidth)
});