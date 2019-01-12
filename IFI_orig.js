
function hideShowContactNoteFields(view, val) {

	    // If this value in the form doesn't equal "SpecificValue" then prevent the form from submitting
    if (val == "Monthly Report") {
    	console.log (val);

    	$('#kn-input-' +  dbContactNotes.ContactNotedate).show();
    	$('#kn-input-' +  dbContactNotes.CaseManager).show();
    	$('#kn-input-' +  dbContactNotes.Client).show();
    	$('#kn-input-' +  dbContactNotes.NoteType).show();

    	$('#kn-input-' +  dbContactNotes.MeetingStatus).hide();
    	$('#kn-input-' +  dbContactNotes.ContactDateStart).show();
    	$('#kn-input-' +  dbContactNotes.ContactDateEnd).show();
    	$('#kn-input-' +  dbContactNotes.VisitLocation).hide();
    	$('#kn-input-' +  dbContactNotes.ReasonforContact).hide();
    	$('#kn-input-' +  dbContactNotes.ClientIRP).show();
    	$('#kn-input-' +  dbContactNotes.IRPGoals).show();
    	$('#kn-input-' +  dbContactNotes.ClientGoalInterventions).hide();
    	$('#kn-input-' +  dbContactNotes.PersonsPresent).hide();
    	$('#kn-input-' +  dbContactNotes.ClientResponses).show();
    	$('#kn-input-' +  dbContactNotes.PlanforNextVisit).show();
    	$('#kn-input-' +  dbContactNotes.OtherComment).hide();
    	$('#kn-input-' +  dbContactNotes.MedicationChanges).hide();
    	$('#kn-input-' +  dbContactNotes.CaseManagerSignature).show();
    	return true;
        }

    else if (val == "Appointment") {
    	console.log (val);
    	$('#kn-input-' +  dbContactNotes.ContactNotedate).show();
    	$('#kn-input-' +  dbContactNotes.CaseManager).show();
    	$('#kn-input-' +  dbContactNotes.Client).show();
    	$('#kn-input-' +  dbContactNotes.NoteType).show();

    	$('#kn-input-' +  dbContactNotes.MeetingStatus).hide();
    	$('#kn-input-' +  dbContactNotes.ContactDateStart).show();
    	$('#kn-input-' +  dbContactNotes.ContactDateEnd).show();
    	$('#kn-input-' +  dbContactNotes.VisitLocation).show();
    	$('#kn-input-' +  dbContactNotes.ReasonforContact).hide();
    	$('#kn-input-' +  dbContactNotes.ClientIRP).hide();
    	$('#kn-input-' +  dbContactNotes.IRPGoals).hide();
    	$('#kn-input-' +  dbContactNotes.ClientGoalInterventions).hide();
    	$('#kn-input-' +  dbContactNotes.PersonsPresent).hide();
    	$('#kn-input-' +  dbContactNotes.ClientResponses).hide();
    	$('#kn-input-' +  dbContactNotes.PlanforNextVisit).hide();
    	$('#kn-input-' +  dbContactNotes.OtherComment).hide();
    	$('#kn-input-' +  dbContactNotes.MedicationChanges).hide();
    	$('#kn-input-' +  dbContactNotes.CaseManagerSignature).hide();
    	return true;
        }

   else {
    	$('#kn-input-' +  dbContactNotes.ContactNotedate).show();
    	$('#kn-input-' +  dbContactNotes.CaseManager).show();
    	$('#kn-input-' +  dbContactNotes.Client).show();
    	$('#kn-input-' +  dbContactNotes.NoteType).show();

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
    	$('#kn-input-' +  dbContactNotes.PlanforNextVisit).show();
    	$('#kn-input-' +  dbContactNotes.OtherComment).show();
    	$('#kn-input-' +  dbContactNotes.MedicationChanges).show();
    	$('#kn-input-' +  dbContactNotes.CaseManagerSignature).show();
    	return true;
    }


}
$(document).on('knack-view-render.' + vw_contact_note_add, function(event, view, data) {

	var view_name =  view.key ;
	var fld_note_type =  view.key + '-field_236';

	$('#' + fld_note_type).on('change',function(e){
	  console.log (e);
	  console.log ($('#' + fld_note_type).val());
	  hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
	});

});

$(document).on('knack-view-render.' + vw_contact_note_edit, function(event, view, data) {

	var view_name =  view.key ;
	var fld_note_type =  view.key + '-field_236';

	$('#' + fld_note_type).on('change',function(e){
	  console.log (e);
	  console.log ($('#' + fld_note_type).val());
	  hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
	});
});


/*$("#view_272-field_236").onchange({
        select: function (event, ui) {
            alert("the select event has fired!");
        }
    }
); */

function setClientStatusText() {
  //Client Edit Page - The Client Status Menu link text will change depending on both the role of the logged in user
  //and the current status of the client.


try {

    var mnuRequestAuth = "#view_220 .kn-link-1" ;
    var mnuProcessAuth = "#view_220 .kn-link-2" ;
    var mnuStartIntake = "#view_220 .kn-link-3" ;
    var mnuIntake = "#view_220 .kn-link-4" ;
    var mnuReAuth = "#view_220 .kn-link-5" ;
    var mnuOverride = "#view_220 .kn-link-6" ;
    var mnuDischarge = "#view_220 .kn-link-7" ;

    //ensures I am on the right form
    if ( $(mnuRequestAuth).length == 0 ) {
      console.log ("Status Menu Item does not exist in this case");
      return ;
    }

    //Initially hide the Status link Menu
    $(mnuRequestAuth).hide();
    $(mnuProcessAuth).hide();
    $(mnuStartIntake).hide();
    $(mnuIntake).hide();
    $(mnuReAuth).hide();
    $(mnuOverride).hide();
    $(mnuDischarge).hide();

  //  var clientStatusMenuItemSpan = clientStatusMenuItem + " span";
    var fld_client_status =   '#kn-input-field_75 > span';


    if ( Knack.getUserRoles(roles.IFIAdmin) || Knack.getUserRoles(roles.Admin)  ) {
      $(mnuOverride).show();
      $(mnuDischarge).show();
      switch ($(fld_client_status).text()){

        case "Referral":
        case "Referral - Need More Information":
        case "Authorization - Need More Information":
              $(mnuRequestAuth).show();
              break;
        case "Authorization Approved" :
             $(mnuStartIntake).show();
             break;
        case "Approval Pending":
//             $(clientStatusMenuItemSpan).text("Set Authorization Decision");
//             $(clientStatusMenuItem).show();
             break;
        case "Approval Requested":
//             $(clientStatusMenuItemSpan).text("Set Authorization Decision");
             break;
//        case "Intake" :
        case "ReAuthorization Required":
        case "ReAuthorization - PA Review In Progress":
            $(mnuReAuth).show();
           break;
        default:
            break ;

      }
    }

    // Beacon Status Roles
    if ( Knack.getUserRoles(roles.Beacon) || Knack.getUserRoles(roles.Admin)  ) {
      switch ($(fld_client_status).text()){
        case "Approval Requested":
        case "Authorization Pending":
        case "Authorization Approved":
        case "Authorization Denied":
            $(mnuProcessAuth).show();
             break;

        default:
            break ;

      }
    }

    // Case Manager Status Roles
    if ( Knack.getUserRoles(roles.IFICM) || Knack.getUserRoles(roles.Admin)  ) {
      switch ($(fld_client_status).text()){
        case "Intake":
             $(mnuIntake).show();
             break;

        default:
            break ;

      }
    }

}
catch (e)  {
    console.error(e);
    console.error(e.stack) ;
 }

}




//Menu View on the Edit Detail Page
//$(document).on('knack-view-render.view_11', function (event, view, record) {
//});

function addDefaultIntakeDocument (clientID, documentCategory) {

  var filters = [
    // Filter for records with a value for this field in the last three months
    {
      "field": dbDocuments.DocumentCategory,
      "operator":"is",
      "value": documentCategory
    }
  ];

  //Retrieve the standard list of intake documents
  var this_url = api_url + sc_api_client_docs + '/views/' + vw_intact_docs_dflt_list + '/records' + '?filters=' + encodeURIComponent(JSON.stringify(filters));

  $.ajax({
        url: this_url ,
        type: 'GET',
        headers: headers,
        success: function (response) {

          console.dir (response);

          if ( response.records.length == 0)   {
            console.log ("Documents Category Not Found: " + documentCategory) ;
          }

          for (var i = 0; i < response.records.length ; i++) {

            var data = {
                        "field_185" :  clientID ,
                        "field_178" : response.records[i][dbDocuments.DocumentName],
                        "field_295_raw"  : response.records[i][dbDocuments.File + "_raw"] ,
                        "field_295_raw.field_key" : "field_295" ,
                        "field_296_raw.url"  : response.records[i][dbDocuments.File + "_raw.url"] ,
//"field_296_raw"  : response.records[i][dbDocuments.DocumentLink + "_raw"]
                       } ;

            console.dir (data) ;

            $.ajax({
              url: 'https://api.knack.com/v1/scenes/scene_188/views/view_319/records/',
              type: 'POST',
              headers: headers,
              data: JSON.stringify(data),
              success: function (response) {
                console.log('Intake Documents added!!!');
              }
            }); //end ajax

          } // end for DftlIntakeList


        }  //end success function
      }); //end ajax

      return ;
}


// Add Default Intake Documents
$(document).on('knack-record-update.view_323', function (event, view, record) {

  var user = Knack.getUserToken();
  var headers = { "Authorization": user, "X-Knack-Application-ID": app_id, "Content-Type":"application/json"};

  var clientID = Knack.models[vw_client_dtls_intact_docs].toJSON().id;

  Knack.showSpinner();

  console.log ( $("#view_323-field_75 option:selected").text() );
  if ($("#view_323-field_75 option:selected").text() == "Intake") {

    addDefaultIntakeDocument (clientID, "Intake");

  } // if ClientStatus == intake

  Knack.hideSpinner();



});






function findContact (teamMember) {


  var contactid = "" ;

  var filters = [
    // Filter for records with a value for this field in the last three months
    {
      "field":dbContacts.Name,
      "operator":"contains",
      "value": teamMember.Name
    }
  ];


  var this_url = api_url + sc_contact_scene + '/views/' + vw_contact_list + '/records' + '?filters=' + encodeURIComponent(JSON.stringify(filters));


  // Search to see if a contact exist by this name
  $.ajax({
        url: this_url ,
        type: 'GET',
        headers: headers,
        success: function (response) {

          console.log (JSON.stringify (response));
          if ( response.records.length == 1 )
          {
            contactid = response.records[0].id ;
            console.log (contactid) ;
            addClientTeamMember (contactid, teamMember.Role, teamMember.clientId);
          }
          else if ( response.records.length == 0)
          {
            console.log ("contact not found " + JSON.stringify( teamMember.Name)) ;
            var newContact = { "field_102": teamMember.Name_raw
                                } ;



            console.log ( JSON.stringify(newContact)) ;

            $.ajax({
                  url: urlContactAdd ,
                  type: 'POST',
                  headers: headers,
                  data: JSON.stringify(newContact),
                  success: function (response2) {

                    console.log (JSON.stringify(response2) );
                    console.log('Contact Added!!!');
                    contactid = response2.record.id ;
                    console.log (contactid) ;
                    addClientTeamMember (contactid, teamMember.Role, teamMember.clientId);

                  }

            }); //end ajax



          }


        }
      }); //end ajax


      return contactid;
}



function findContactByAccountid (teamMember) {


  var contactid = "" ;

  if (teamMember.Accountid === undefined) {
    console.log ("AccountID Field is undefined") ;
    return ;
  }

  if (teamMember.Accountid[0].id === undefined) {
    console.log ("AccountID Field is not selected") ;
    return ;
  }



  var this_url = urlAccountAdd + '/' + teamMember.Accountid[0].id;  //Case Manager is a drop down, therefore index is needed to access the selected value[s]
  console.log ("Case Manager Lookup: " + this_url) ;



  // Search to see if a contact exist by this name
  $.ajax({
        url: this_url ,
        type: 'GET',
        headers: headers,
        success: function (response) {

          console.log ( JSON.stringify(response)) ;
          contactid = response[dbAccounts.Contact_raw][0].id ;
            console.log (contactid) ;
            addClientTeamMember (contactid, teamMember.Role, teamMember.clientId);
          }

      }); //end ajax


      return contactid;
}



// Add Standard Contacts

function addContact(teamMember) {
  return 'unknown';
}


function addClientTeamMember (contactid, role, clientId) {

  console.log ('Ready to add contact ' + contactid + ' for client ' + clientId + ' as a ' + role );

  var data = { field_105: contactid,
              field_106: role ,
              field_196: clientId } ;


  if (contactid === undefined) {
    console.log ("Cannot added Client Team Member contactid is undefined") ;
    return ;
  }

   if (clientId === undefined) {
    console.log ("Cannot added Client Team Member clientId is undefined") ;
    return ;
  }

 if (role === undefined) {
    console.log ("Cannot added Client Team Member role is undefined") ;
    return ;
  }

  $.ajax({
    url: urlClientTeamAdd ,
    type: 'POST',
    headers: headers,
    data: JSON.stringify(data),
    success: function (response) {
      console.log ( JSON.stringify (response) );
      console.log('Client Team Member Added!!!');
    }
  }); //end ajax



  return true;

}
/**********************************************************************************************
//Client Add / Edit Logic
*************************************************************************************************/
$(document).on('knack-record-update.any' , function (event, view, record) {
  console.log (JSON.stringify(view)) ;
  if (view.source.object == "object_1" ) {
      addDefaultClientTeam (event, view, record);
  }

});

$(document).on('knack-record-create.any' , function (event, view, record) {
  console.log (JSON.stringify(view)) ;
  if (view.source.object == "object_1" ) {
      addDefaultClientTeam (event, view, record);
  }
});

function CallAPIJSONTransform(response) {

	console.dir (response);
  console.dir (response.total_records);
  var i;
  for (i = 0; i < response.total_records -1; i++) {


    role = response.records[i][dbClientTeamMembers.Role] ;
    console.log (role) ;


    if (role == "Therapist")
        bTherapistRole = true;

    if (role == "Program Director")
       bProgramDirectRole = true ;


     if (role == "Case Manager")
       bCaseManagerRole = true ;

     if (role == "Rehabilitation Specialist")
        bRehabSpecRole = true ;


  }
	//var objTransform = {data: {}, template:{}};
	//objTransform.data.models = Knack.models['view_209'].data.models;
	//objTransform.template = message.records[0].field_178 ;


// var resource = 'jsontransform';
// OYPServicesAPIPost( resource, headers, objTransform )
// 	.then (result=> {CallAPISendMail(result) } ) ;

}


function getClientTeamAPITest(filters ) {

  //Get the template from the api table
  var getapidata =
  {
    "method": "get",
    "knackobj": "object_16",
    "appid": app_id ,
    "filters": filters
  }

  console.dir (getapidata);
  var resource = 'knackobject';
  OYPServicesAPIPost( resource, headers, getapidata )
    .then (result=> {CallAPIJSONTransform(result) } ) ;
}

function addDefaultClientTeam (event, view, record) {
  try
  {

      var bTherapistRole = false;
      var bProgramDirectRole = false ;
      var bCaseManagerRole = false ;
      var bRehabSpecRole = false ;
      var viewName = view["key"] ;
      var clientId = Knack.models[viewName].toJSON().id ;

      var filters = [
        // Filter for records with a value for this field in the last three months
        {
          "field":dbClientTeamMembers.Client ,
          "operator":"is",
          "value": clientId
        }
      ];

      var this_url = urlClientTeamList + '?filters=' + encodeURIComponent(JSON.stringify(filters));
      console.log ("client team add");
      console.log (this_url);
      console.log (headers);
      getClientTeamAPITest(filters ) ;

      // Search to see if a contact exist by this name
      $.ajax({
            url: this_url ,
            type: 'GET',
            headers: headers,
           error: function(xhr, status, error){
                 var errorMessage = xhr.status + ': ' + xhr.statusText
                 console.log('addDefaultClientTeam Error - ' + errorMessage);
            },
            success: function (response) {

    		     console.log (JSON.stringify(response));

              var i;
              for (i = 0; i < response.records.length; i++) {


                role = response.records[i][dbClientTeamMembers.Role] ;
                console.log (role) ;


                if (role == "Therapist")
                    bTherapistRole = true;

                if (role == "Program Director")
                   bProgramDirectRole = true ;


                 if (role == "Case Manager")
                   bCaseManagerRole = true ;

                 if (role == "Rehabilitation Specialist")
                    bRehabSpecRole = true ;


              }


              if (!bProgramDirectRole) {
                  teamMember = {
                        "Name" : 'Shavon Neal' ,
                        "Name_raw" : { "first": "Shavon", "last" : "Neal"} ,
                        "Role" : "Program Director" ,
                        "clientId" : clientId  } ;

      			contactid = findContact (teamMember) ;
    			  console.log (contactid);

              }

              if (!bTherapistRole)
              {
                    teamMember = {
                          "Name" : Knack.models[viewName].toJSON()[dbClients.ReferredBy] ,
                          "Name_raw" : Knack.models[viewName].toJSON()[dbClients.ReferredBy_raw] ,
                          "Role" : "Therapist" ,
                          "clientId" : clientId ,
                          "Phone" : Knack.models[viewName].toJSON()[dbClients.ReferrerPhone]  } ;


      			contactid = findContact (teamMember) ;
    			console.log (contactid);

              }



              if (!bRehabSpecRole) {
                  teamMember = {
                        "Name" : 'LaVon MacGruder' ,
                        "Name_raw" : { "first": "LaVon", "last" : "MacGruder"} ,
                        "Role" : "Rehabilitation Specialist" ,
                        "clientId" : clientId };

      			contactid = findContact (teamMember) ;
    			console.log (contactid);

              }

      		  if (!bCaseManagerRole) {

                  teamMember = {
                          "Name" : "",
                          "Name_raw" : { "first": "", "last" : ""} ,
                          "Accountid" : Knack.models[viewName].toJSON()[dbClients.CaseManager + "_raw"] ,
                          "Role" : "Case Manager" ,
                          "clientId" : clientId  } ;
                console.log (JSON.stringify(teamMember)) ;

      			contactid = findContactByAccountid (teamMember) ;
    			console.log (contactid);
   			 }



            } //end response
          }); //end ajax


  }
  catch (e)
    {
  console.error(e);
  console.error(e.stack) ;

}


};

function setSelectedIndex(s, valsearch)

{

   console.log (valsearch) ;
   console.log (s.options.length) ;
   var l = s.options.length ;

	// Loop through all the items in drop down list
	for (i = 0; i < l ; i++) {

      console.log (s.options[0].value + ' ' +  valsearch);
	  if (s.options[0].value.toUpperCase()  == valsearch.toUpperCase() ) {
			// Item is found. Set its property and exit
            console.log ( 'found it');
            s.selectedIndex = 0;
   		    s.options[0].selected = true;
           	break;
		}

      s.remove(0) ;

	}

	return;

}


function updateInterventionGoalId (GoalId)
{

  var vw_goal_intervention_goalupdate = 'view_486' ;


}


function updateInterventionGoalId (interventionRecord ) {


  alert ('Intervention Update started!!!');

  $.ajax({
    url: urlInterventionUpdate ,
    type: 'PUT',
    headers: headers,
    data: JSON.stringify(interventionRecord),
    success: function (response) {
      console.log ( JSON.stringify (response) );
      console.log('Intervention Upated!!!');
      alert ('Intervention Update Completed!!!');
    }
  }); //end ajax



  return true;

}




$(document).on('knack-form-submit.' + vw_goal_intervention_add , function(event, view, data) {

  var parser = document.createElement("a");
  var pathArray = window.location.href.split( '/' );
  var clientGoalId = '';

  alert ( vw_goal_intervention_add ) ;

   for ( var i = 0; i < pathArray.length; i++) {
     if (pathArray[i] == "edit-client-goal2")
        clientGoalId = pathArray[i+1].toString();
   }

  alert (clientGoalId);
  alert (JSON.stringify (data));
  //data.field_232 = clientGoalId;

  var goalid = { "id" : clientGoalId } ;

  data.field_232_raw = goalid;
  updateInterventionGoalId (data ) ;
  console.log (JSON.stringify (data)) ;
  alert (JSON.stringify (data));

});

$(document).on('knack-view-render.' + vw_goal_intervention_add , function(event, view, data) {

  var parser = document.createElement("a");
  var pathArray = window.location.href.split( '/' );
  var clientGoalId = '';


   for ( var i = 0; i < pathArray.length; i++) {
     if (pathArray[i] == "edit-client-goal2")
        clientGoalId = pathArray[i+1].toString();
   }


  var s =  document.getElementById("view_485-field_232");
  s.style.visibility = "hidden";
  setSelectedIndex(s, clientGoalId)

  //data.field_232_raw = goalid;
  //updateInterventionGoalId (data ) ;
  console.log (JSON.stringify (data)) ;


});


// Change "scene_1" to the scene you want to listen for
$(document).on('knack-scene-render.scene_7', function(event, scene) {
  // Do something after the scene renders

	var fld_client_status =   '#kn-input-field_75 span';
//	console.log ($(fld_client_status).text());
//	alert (  $(fld_client_status).text() );

//  console.dir (scene);
//	console.dir(event);
//	console.log(scene.views[1]) ;
});


// On Knack Record Update, redirect to URL. I know this already exists in Knack, but in my case
// I wanted to direct the recently updated record to another view.

$(document).on('knack-record-update.' + vw_irp_final, function (event, view, record) {

	var viewName = view["key"] ;
	var clientId =  Knack.models[viewName].toJSON()["field_200_raw"][0].id;

	console.log (JSON.stringify(view));
	console.log (clientId);


	var parser = document.createElement("a");
  	var pathArray = window.location.href.split( '#' );

        var url = pathArray[0] + '#clients/edit-client2/' + clientId + '/irp/' + clientId + '/edit-client-irp/' + record.id ;
	console.log (url);
	window.location.href = url;

});


function syncGoalInterventions ( inData) {
/* This functions reads the list of intervention by goal id, and nest them within the intervention field on the goal table.  This is
necessary in order to display the interventions in a view / print type scenario.
*/

	console.log (JSON.stringify (inData)) ;
  	console.log (JSON.stringify (inData));
	var goalId = inData["field_232_raw"][0].id  ;


	var filters = [
    	// Filter for records with a value for this field in the last three months
    	{
	      "field":dbInterventions.ClientGoals,
	      "operator":"contains",
	      "value": goalId
    	}
  	];

  	var this_url = urlInterventionList + '?filters=' + encodeURIComponent(JSON.stringify(filters));
	console.log (this_url) ;
  	var goal_url = urlGoalUpdate + '/' + goalId ;


  // Search to see if a contact exist by this name
  $.ajax({
        url: this_url ,
        type: 'GET',
        headers: headers,
        success: function (response) {

		console.log ( JSON.stringify(response)) ;
		var field_233 = [];
		for (var i = 0; i < response.records.length; i++) {
			//console.log (response.records[i].id) ;
		      	field_233[i] =  {"id": response.records[i].id}  ;
	        }

		//console.log (JSON.stringify(field_233)) ;
		var data = { "field_233": field_233 } ;

		 $.ajax({
			url: goal_url,
			type: 'PUT',
			headers: headers,
			data: JSON.stringify(data),
			success: function (response) {
			  console.log (JSON.stringify(response));
			  console.log('Goal Interventions Updated!!!');
			}
		      }); //end ajax
	} // end response function

      }); //end ajax

}


/* Intervention Viees - Adds and Updates */

$(document).on('knack-form-submit.view_268' , function(event, view, data) {

  	syncGoalInterventions (data ) ;
});

$(document).on('knack-form-submit.view_269' , function(event, view, data) {

  	syncGoalInterventions (data ) ;
});

$(document).on('knack-form-submit.view_510' , function(event, view, data) {

   	syncGoalInterventions (data ) ;
});

$(document).on('knack-form-submit.view_513' , function(event, view, data) {

   	syncGoalInterventions (data ) ;
});

$(document).on('knack-form-submit.view_491' , function(event, view, data) {

   	syncGoalInterventions (data ) ;
});

$(document).on('knack-form-submit.view_515' , function(event, view, data) {

   	syncGoalInterventions (data ) ;
});


$(document).on('knack-view-render.any' , function(event, view, data) {

  try {
	     var view_name =  view.key ;
       console.log(view_name) ;
       //Client Object

       if (view.source.object == "object_1" ){
         setClientStatusText() ;


         $('#field_243').keyup(function() {
             var val = this.value.replace(/\D/g, '');
             var newVal = '';
             var sizes = [3, 2, 4];

             for (var i in sizes) {
               if (val.length > sizes[i]) {
                 newVal += val.substr(0, sizes[i]) + '-';
                 val = val.substr(sizes[i]);
               }
               else
                 break;
             }

             newVal += val;
             this.value = newVal;
         });

         //FORMAT ID  FIELD
         $('#field_243').css("width", $('#' + view_name + '-field_167').width()); //ID sized same as DOB
         $('#field_6').css("width", $('#' + view_name + '-field_167').width());   //MA Number sized same as DOB

         //$( "p" ).addClass( "myClass yourClass" );



         return ;
       }

       //ContactNotes
       if (view.source.object == "object_4" ){

          var fld_note_type =  view.key + '-field_236';
         	$('#' + fld_note_type).on('change',function(e){
         	  console.log (e);
         	  console.log ($('#' + fld_note_type).val());
         	  hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
         	});
          return ;
        }








     }

  catch (e)  {
      console.error(e);
      console.error(e.stack) ;
   }

});
