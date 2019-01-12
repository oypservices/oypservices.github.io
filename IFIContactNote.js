/*******************************************************************************************************
 logStatusChanges every time the client record is updated, if needed
*******************************************************************************************************/


function hideShowContactNoteFields(view, val) {

	    // If this value in the form doesn't equal "SpecificValue" then prevent the form from submitting
    if (val == "Monthly Report") {
    	console.log (val);

    	$('#kn-input-' +  dbContactNotes.ContactNotedate).show();
    	$('#kn-input-' +  dbContactNotes.CaseManager).show();
    	$('#kn-input-' +  dbContactNotes.Client).show();
    	$('#kn-input-' +  dbContactNotes.NoteType).show();
      $('#kn-input-' +  dbContactNotes.ContactNoteStatus).show();
      $('#kn-input-' +  dbContactNotes.ClientIRP).show();
      $('#kn-input-' +  dbContactNotes.IRPGoals).show();


      $('#kn-input-' +  dbContactNotes.ClientResponses).show();
    	$('#kn-input-' +  dbContactNotes.PlanforNextVisit).show();
      $('#kn-input-' +  dbContactNotes.CaseManagerSignature).show();
    	$('#kn-input-' +  dbContactNotes.OtherComment).hide();

      $('#kn-input-' +  dbContactNotes.ContactDateStart).hide();
      $('#kn-input-' +  dbContactNotes.ReasonforContact).hide();
    	$('#kn-input-' +  dbContactNotes.MeetingStatus).hide();
    	$('#kn-input-' +  dbContactNotes.ContactDateEnd).hide();
      $('#kn-input-' +  dbContactNotes.ClientPresent).hide();
      $('#kn-input-' +  dbContactNotes.NextVisitDate).hide();
    	$('#kn-input-' +  dbContactNotes.VisitLocation).hide();

    	$('#kn-input-' +  dbContactNotes.ClientGoalInterventions).hide();
    	$('#kn-input-' +  dbContactNotes.PersonsPresent).hide();

    	$('#kn-input-' +  dbContactNotes.MedicationChanges).hide();
    	return true;
        }

    else if (val == "Appointment") {
    	console.log (val);
    	$('#kn-input-' +  dbContactNotes.ContactNotedate).show();
    	$('#kn-input-' +  dbContactNotes.CaseManager).show();
    	$('#kn-input-' +  dbContactNotes.Client).show();
    	$('#kn-input-' +  dbContactNotes.NoteType).show();
      $('#kn-input-' +  dbContactNotes.ContactNoteStatus).hide();
    	$('#kn-input-' +  dbContactNotes.MeetingStatus).hide();
    	$('#kn-input-' +  dbContactNotes.ContactDateStart).show();
    	$('#kn-input-' +  dbContactNotes.ContactDateEnd).show();
    	$('#kn-input-' +  dbContactNotes.VisitLocation).show();
    	$('#kn-input-' +  dbContactNotes.ReasonforContact).hide();
    	$('#kn-input-' +  dbContactNotes.ClientIRP).hide();
    	$('#kn-input-' +  dbContactNotes.IRPGoals).hide();
    	$('#kn-input-' +  dbContactNotes.ClientGoalInterventions).hide();
      $('#kn-input-' +  dbContactNotes.ClientPresent).hide();
    	$('#kn-input-' +  dbContactNotes.PersonsPresent).hide();
    	$('#kn-input-' +  dbContactNotes.ClientResponses).hide();
      $('#kn-input-' +  dbContactNotes.NextVisitDate).hide();
    	$('#kn-input-' +  dbContactNotes.PlanforNextVisit).hide();
    	$('#kn-input-' +  dbContactNotes.OtherComment).hide();
    	$('#kn-input-' +  dbContactNotes.MedicationChanges).hide();
    	$('#kn-input-' +  dbContactNotes.CaseManagerSignature).hide();
    	return true;
        }

   else {
      console.log (val);
    	$('#kn-input-' +  dbContactNotes.ContactNotedate).show();
    	$('#kn-input-' +  dbContactNotes.CaseManager).show();
    	$('#kn-input-' +  dbContactNotes.Client).show();
    	$('#kn-input-' +  dbContactNotes.NoteType).show();
      $('#kn-input-' +  dbContactNotes.ContactNoteStatus).show();
    	$('#kn-input-' +  dbContactNotes.MeetingStatus).show();
    	$('#kn-input-' +  dbContactNotes.ContactDateStart).show();
    	$('#kn-input-' +  dbContactNotes.ContactDateEnd).show();
    	$('#kn-input-' +  dbContactNotes.VisitLocation).show();
    	$('#kn-input-' +  dbContactNotes.ReasonforContact).show();
    	$('#kn-input-' +  dbContactNotes.ClientIRP).show();
    	$('#kn-input-' +  dbContactNotes.IRPGoals).show();
    	$('#kn-input-' +  dbContactNotes.ClientGoalInterventions).show();
    	$('#kn-input-' +  dbContactNotes.PersonsPresent).show();
    	$('#kn-input-' +  dbContactNotes.ClientResponses).show();
      $('#kn-input-' +  dbContactNotes.NextVisitDate).show();
    	$('#kn-input-' +  dbContactNotes.PlanforNextVisit).show();
    	$('#kn-input-' +  dbContactNotes.OtherComment).show();
    	$('#kn-input-' +  dbContactNotes.MedicationChanges).show();
    	$('#kn-input-' +  dbContactNotes.CaseManagerSignature).show();
            $('#kn-input-' +  dbContactNotes.ClientPresent).show();
    	return true;
    }


}


/*******************************************************************************************************
 logStatusChanges every time the client record is updated, if needed
*******************************************************************************************************/

function evaluateContactNotes (event, view, recordClient) {
  try {

        var proc = "evaluateContractNotes";
        console.log (proc);

        var viewName = view["key"] ;
        var objView = Knack.models[viewName].toJSON();
        console.dir (objView);
        console.dir (dbContactNotes) ;

        var contactNoteId = objView.id ;
        var nextVisitDate = objView[dbContactNotes.NextVisitDate_raw] ;
//        var  paReviewStatus = objView[dbContactNotes.PAReviewStatus_raw];
        var  contactNoteStatus = objView[dbContactNotes.ContactNoteStatus_raw] ;
//        var  showOnDashboard = objView[dbContactNotes.ShowOnDashboard_raw];
        var  clientId = objView[dbContactNotes.Client_raw][0].id;
        var  caseManagerId = objView[dbContactNotes.CaseManager_raw][0].id ;


        console.log (nextVisitDate) ;

        if (nextVisitDate != "")  {
            var nextContactVisit = {
              "field_14": clientId ,
              "field_16": nextVisitDate,
              "field_236" : "Appointment",  //Note Type
              "field_194": caseManagerId ,
              "field_345" : contactNoteId   //related note id
            } ;

            console.dir (nextContactVisit);
            getNextVisitDate(nextContactVisit) ;

        }


    }
  catch (e)
    {
      logerror (proc, e);
    }

}

/**************************************************************************************
 Check Next Visit Date to see if it already exists
***************************************************************************************/
function getNextVisitDate(nextContactVisit)
{
    try {

        var proc = "getNextVisitDate" ;
        console.log (proc);
        console.dir (nextContactVisit);

        var apidata = {
              "method": "get",
              "knackobj": dbObjects.ContactNotes,
              "appid": app_id,
             "filters": [ {
                        "field":dbContactNotes.RelatedContactNote ,
                        "operator":"is",
                        "value": nextContactVisit[dbContactNotes.RelatedContactNote]
                      } ]
              };


        OYPKnackAPICall (headers,  apidata)
                .then (result => {
                    console.dir (result) ;
                    if ( result.records.length == 0 )
                      addNextVisitDate(nextContactVisit) ;
                });


        }
   catch (e) {
      logerror (proc, e);
    }
}



/**************************************************************************************
 Add Next Visit Date if it does not already exist
***************************************************************************************/
function addNextVisitDate(nextContactVisit)
{
    try {

        var proc = "addNextVisitDate" ;
        console.log (proc);
        console.dir (nextContactVisit);

        var apidata = {
              "method": "post",
              "knackobj": dbObjects.ContactNotes,
              "appid": app_id,
              "record":  nextContactVisit
              };


        OYPKnackAPICall (headers,  apidata)
                .then (result => {
                    console.dir (result) ;
                });

        }
   catch (e) {
      logerror (proc, e);
    }
}
