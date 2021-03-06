var Alexa = require('alexa-sdk');

// Data
var constants = require('../constants/constants');

var diagnosticReportsStateHandlers = Alexa.CreateStateHandler(constants.states.DIAGNOSTIC, {
  
  'DiagnosticReportType': function () {

    var diagnosticReportType = this.event.request.intent.slots.DiagnosticType.value;
    console.log("Diagnostic type spoken: ", diagnosticReportType);

    var diagnosticTypes =["X-ray", "x ray", "xray", "ultrasound", "CT scan"];
    

    if (diagnosticTypes.indexOf(diagnosticReportType) > -1) {
      this.emit(":ask", 'Diagnostic reports are currently under development and not available.  Would you like a blood test result instead?')
    }
    else {
      this.emit(":ask", 'I\'m sorry, but I do not recognize that diagnostic report. You can say x-ray, ultrasound or c t scan.')
    }
  },

  'AMAZON.YesIntent': function () {
    this.handler.state = constants.states.BLOOD;
    this.emit(":ask", "What type of blood test would you like? You can say blood gas, hematology or lights.", 'You can say blood gas, hematology or lights.');

  },

  'AMAZON.NoIntent': function () {
     this.emit(':tell', `Thank you for using this skill. Goodbye`);
   
  },
  'AMAZON.StopIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', `Goodbye.`);
  },
  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', `Goodbye.`);
  },
  'SessionEndedRequest': function () {
    // Force State Save When User Times Out
    this.emit(':saveState', true);
  },
  'AMAZON.HelpIntent' : function () {
    this.emit(':ask', `Welcome to the lab results skill. Use this skill to obtain a patient\'s blood work or diagnostic reports.`,  `First, tell me the patient number.`);
  },
  'Unhandled' : function () {
    this.emitWithState('AMAZON.HelpIntent');
  }

});


module.exports = diagnosticReportsStateHandlers;


