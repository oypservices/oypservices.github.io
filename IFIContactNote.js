


/*******************************************************************************************************
 Add Persons Present Default to the Contact Notes
*******************************************************************************************************/


function AddPersonsPresent(view) {
  try {
     var proc = "AddPersonsPresent" ;

     var viewName = "view_653";    //client details view
     var objView = Knack.models[viewName].toJSON();
     var casemanager_raw = dbClients.CaseManager + "_raw";

     console.dir (objView) ;

     var clientName = objView[dbClients.ClientName];
     var caseManager = objView[casemanager_raw][0].identifier ;

     console.log ($('#' +  dbContactNotes.AddlPersonsPresent).text()) ;

     $(document).ready(function () {
       if ($('#' +  dbContactNotes.AddlPersonsPresent).text() == "")
          $('#' +  dbContactNotes.AddlPersonsPresent).text(
                clientName + ", " + caseManager
              ) ;
      });

  }

  catch (e)
    {
      logerror (proc, e);
    }

}



/*******************************************************************************************************
 logStatusChanges every time the client record is updated, if needed
*******************************************************************************************************/


function hideShowContactNoteFields(view, val, data) {

	    // If this value in the form doesn't equal "SpecificValue" then prevent the form from submitting
    var fldPrefix = "" ;
    var bDetails = false;

    console.dir(view) ;
    console.dir (data);


    if (view.type == "details") {
       val = data[dbContactNotes.NoteType] ;
       fldPrefix = "." ;
       bDetails = true ;
    }
    else
       fldPrefix = "#kn-input-" ;


    console.log (val);
    if (val == undefined)
       return ;

    // Change the label depending on the tops
    switch (val)
    {
      case "Monthly Report" :
          if (bDetails)
          {
            $(fldPrefix + dbContactNotes.IRPGoals).children('.kn-detail-label').children('span').text("Rehabilitatve Goal")  ;
            $(fldPrefix + dbContactNotes.PlanforNextVisit).children('.kn-detail-label').children('span').text("Plan for Next Month")  ;
            $(fldPrefix + dbContactNotes.ClientResponses).children('.kn-detail-label').children('span').text("Summary") ;

          }
          else {

            $("label[ for= " + dbContactNotes.IRPGoals + "] span:first-of-type").text("Rehabilitatve Goal")
            $("label[ for= " + dbContactNotes.PlanforNextVisit + "] span:first-of-type").text("Plan for Next Month")  ;
            $("label[ for= " + dbContactNotes.ClientResponses + "] span:first-of-type").text("Summary")  ;
          }

          break ;
      case "Contact Note" :
          if (bDetails)
              {
                $(fldPrefix + dbContactNotes.ClientIRP).children('.kn-detail-label').children('span').text("IRP Name")  ;
                $(fldPrefix + dbContactNotes.IRPGoals).children('.kn-detail-label').children('span').text("Goals Implementation")  ;
                $(fldPrefix + dbContactNotes.PlanforNextVisit).children('.kn-detail-label').children('span').text("Plan for Next Contact")  ;
                $(fldPrefix + dbContactNotes.ClientResponses).children('.kn-detail-label').children('span').text("Client Response(s)") ;
                $(fldPrefix + dbContactNotes.ClientGoalInterventions).children('.kn-detail-label').children('span').text("List IRP goal(s) worked on during this contact") ;
                $(fldPrefix + dbContactNotes.ClientGoalInterventionText).children('.kn-detail-label').children('span').text("Intervention(s) implemented in accordance with the IRP") ;

              }
              else {

                $("label[ for= " + dbContactNotes.ClientIRP + "] span:first-of-type").text("IRP Name");
                $("label[ for= " + dbContactNotes.IRPGoals + "] span:first-of-type").text("Goals Implementation");
                $("label[ for= " + dbContactNotes.PlanforNextVisit + "] span:first-of-type").text("Plan for Next Contact")  ;
                $("label[ for= " + dbContactNotes.ClientResponses + "] span:first-of-type").text("Client Response(s)")  ;
                $("label[ for= " + dbContactNotes.ClientGoalInterventions + "] span:first-of-type").text("List IRP goal(s) worked on during this contact")
                $("label[ for= " + dbContactNotes.ClientGoalInterventionText + "] span:first-of-type").text("Intervention(s) implemented in accordance with the IRP")
              }

              break ;
      default :
        break ;
    }


    //hide all

//    $(fldPrefix +  dbContactNotes.ContactNotedate).hide();
    $(fldPrefix +  dbContactNotes.CaseManager).hide();
    $(fldPrefix +  dbContactNotes.Client).hide();
//    $(fldPrefix +  dbContactNotes.NoteType).hide();
    $(fldPrefix +  dbContactNotes.ContactNoteStatus).hide();
    $(fldPrefix +  dbContactNotes.ClientIRP).hide();
    $(fldPrefix +  dbContactNotes.IRPGoals).hide();

    $(fldPrefix +  dbContactNotes.ClientResponses).hide();
    $(fldPrefix +  dbContactNotes.PlanforNextVisit).hide();
    $(fldPrefix +  dbContactNotes.CaseManagerSignature).hide();

    $(fldPrefix +  dbContactNotes.AddlPersonsPresent).hide();
    $(fldPrefix +  dbContactNotes.OtherComment).hide();

    $(fldPrefix +  dbContactNotes.ContactDateStart).hide();
    $(fldPrefix +  dbContactNotes.ReasonforContact).hide();
    $(fldPrefix +  dbContactNotes.MeetingStatus).hide();
    $(fldPrefix +  dbContactNotes.ContactDateEnd).hide();
    $(fldPrefix +  dbContactNotes.ClientPresent).hide();
    $(fldPrefix +  dbContactNotes.NextVisitDate).hide();
    $(fldPrefix +  dbContactNotes.VisitLocation).hide();

    $(fldPrefix +  dbContactNotes.ClientGoalInterventions).hide();
    $(fldPrefix +  dbContactNotes.ClientGoalInterventionText).hide();

    $(fldPrefix +  dbContactNotes.PersonsPresent).hide();

    $(fldPrefix +  dbContactNotes.MedicationChanges).hide();
    $(fldPrefix +  dbContactNotes.IRPNA).hide();
    $(fldPrefix +  dbGoals.Objective).hide();


    if (val == "Monthly Report") {

    	$(fldPrefix +  dbContactNotes.ContactNotedate).show();
    	$(fldPrefix +  dbContactNotes.CaseManager).show();
    	$(fldPrefix +  dbContactNotes.Client).show();
    	$(fldPrefix +  dbContactNotes.NoteType).show();
      $(fldPrefix +  dbContactNotes.ContactNoteStatus).show();
      $(fldPrefix +  dbContactNotes.ClientIRP).show();
      $(fldPrefix +  dbContactNotes.IRPNA).show();
      $(fldPrefix +  dbContactNotes.IRPGoals).show();

      $(fldPrefix +  dbContactNotes.ClientResponses).show();
    	$(fldPrefix +  dbContactNotes.PlanforNextVisit).show();
      $(fldPrefix +  dbContactNotes.CaseManagerSignature).show();
      $(fldPrefix +  dbGoals.Objective).show();
    	return true;
        }

    else if (val == "Appointment") {
    	console.log (val);
    	$(fldPrefix +  dbContactNotes.ContactNotedate).show();
    	$(fldPrefix +  dbContactNotes.CaseManager).show();
    	$(fldPrefix +  dbContactNotes.Client).show();
    	$(fldPrefix +  dbContactNotes.NoteType).show();
    	$(fldPrefix +  dbContactNotes.ContactDateStart).show();
    	$(fldPrefix +  dbContactNotes.ContactDateEnd).show();
    	$(fldPrefix +  dbContactNotes.VisitLocation).show();
    	$(fldPrefix +  dbContactNotes.ReasonforContact).show();
    	return true;
        }

   else if (val == "Contact Note") {
      console.log (val);
      AddPersonsPresent(view) ;
    	$(fldPrefix +  dbContactNotes.ContactNotedate).show();
    	$(fldPrefix +  dbContactNotes.CaseManager).show();
    	$(fldPrefix +  dbContactNotes.Client).show();
    	$(fldPrefix +  dbContactNotes.NoteType).show();
      $(fldPrefix +  dbContactNotes.ContactNoteStatus).show();
    	$(fldPrefix +  dbContactNotes.MeetingStatus).show();
    	$(fldPrefix +  dbContactNotes.ContactDateStart).show();
    	$(fldPrefix +  dbContactNotes.ContactDateEnd).show();
    	$(fldPrefix +  dbContactNotes.VisitLocation).show();
    	$(fldPrefix +  dbContactNotes.ReasonforContact).show();
      $(fldPrefix +  dbContactNotes.IRPNA).show();
    	$(fldPrefix +  dbContactNotes.ClientIRP).show();
    	$(fldPrefix +  dbContactNotes.IRPGoals).show();
    	$(fldPrefix +  dbContactNotes.ClientGoalInterventions).show();
      $(fldPrefix +  dbContactNotes.ClientGoalInterventionText).show();
    	$(fldPrefix +  dbContactNotes.PersonsPresent).show();
      $(fldPrefix +  dbContactNotes.AddlPersonsPresent).show();
    	$(fldPrefix +  dbContactNotes.ClientResponses).show();
      $(fldPrefix +  dbContactNotes.NextVisitDate).show();
    	$(fldPrefix +  dbContactNotes.PlanforNextVisit).show();
    	$(fldPrefix +  dbContactNotes.OtherComment).show();
    	$(fldPrefix +  dbContactNotes.MedicationChanges).show();
    	$(fldPrefix +  dbContactNotes.CaseManagerSignature).show();
      $(fldPrefix +  dbContactNotes.ClientPresent).show();
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

// Use on the Knack Standard Theme
function validateContactNote(event, view, data)
{

  try {

      var proc = "validateContactNote";
      var viewName = view.key ;
      var objView = Knack.models[viewName].toJSON();
      console.dir (event);
      console.dir (view) ;
      console.dir (data) ;

      $("#" + viewName + " .kn-button").on("click", function() {
        // If this value in the form doesn't equal "SpecificValue" then prevent the form from submitting
      //  if ($("#view_1-field_1").val() != "SpecificValue") {

      //  var contactNoteId = objView.id ;
      // var nextVisitDate = objView[dbContactNotes.ContactDateStart_raw] ;

          var fldPrefix = "#"  + viewName + "-";
          var fldContactDateStart = $(fldPrefix +  dbContactNotes.ContactDateStart).val() ;
          var fldContactDateStartTime =  $(fldPrefix +  dbContactNotes.ContactDateStart + "-time").val() ;
          contactDateStart = convertDateTime ( fldContactDateStart, fldContactDateStartTime) ;

          var fldContactDateEnd = $(fldPrefix +  dbContactNotes.ContactDateEnd).val() ;
          var fldContactDateEndTime = $(fldPrefix +  dbContactNotes.ContactDateEnd + "-time").val() ;
          contactDateEnd = convertDateTime ( fldContactDateEnd, fldContactDateEndTime) ;

          var msg = "" ;

          var diff =(contactDateEnd.getTime() - contactDateStart.getTime()) / 1000;
          diff /= 60;
          diff = Math.round(diff) ;

          if (diff < 0 )
              msg = "Contact End Date cannot be less than Contact Start Date";

          if (msg == "" && diff < 30)
              msg = "Contact Start and End duration must be 30 minutes or greater";

          if (msg != "") {

            $("#" + viewName + " > form").removechild( $("div .is-error" ));

            var $p = $( "p" ).add( "<strong>" + msg + "</strong>" );
            var $div = $("<div>", {id: "foo", "class": "kn-message is-error"});
            $div.append ( $p) ;
            $("#" + viewName + " > form").prepend ($div) ;

            return false;
          }


      })

    }
catch (e) {
  logerror (proc, e);
}
}
