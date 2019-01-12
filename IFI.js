
/*******************************************************************************************
Standard error logging function.
********************************************************************************************/

function logerror (source, e) {

    console.log ("Error in " + source + ": " + e ) ;
    console.log (e.stack) ;

  return
}


/*******************************************************************************************
Contact Note Add View Render
********************************************************************************************/
$(document).on('knack-view-render.' + vw_contact_note_add, function(event, view, data) {

  try
  {
     var proc = 'knack-view-render.' + vw_contact_note_add ;

    	var view_name =  view.key ;
    	var fld_note_type =  view.key + '-field_236';

    	$('#' + fld_note_type).on('change',function(e){
    	  console.log (e);
    	  console.log ($('#' + fld_note_type).val());
    	  hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
    	});

      var noteType = Knack.models[view_name].toJSON()["field_236_raw"];
      console.log (noteType) ;
      hideShowContactNoteFields (  view, noteType);
  }
  catch (e)  {
      logerror(proc, e);
   }

});

/*******************************************************************************************
Contact Note Add View Render
********************************************************************************************/
$(document).on('knack-view-render.' + vw_contact_note_edit, function(event, view, data) {

  try
  {
     var proc = 'knack-view-render.' + vw_contact_note_edit ;

    	var view_name =  view.key ;
    	var fld_note_type =  view.key + '-field_236';



    	$('#' + fld_note_type).on('change',function(e){
    	  console.log (e);
    	  console.log ($('#' + fld_note_type).val());
    	  hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
    	});


  }
  catch (e)  {
      logerror(proc, e);
   }

});



function setClientStatusText() {
  //Client Edit Page - The Client Status Menu link text will change depending on both the role of the logged in user
  //and the current status of the client.


try {

    var mnuRequestAuth = "#view_220 .kn-link-1" ;
    var mnuProcessAuth = "#view_220 .kn-link-2" ;
    var mnuStartIntake = "#view_220 .kn-link-3" ;
    var mnuIntake = "#view_220 .kn-link-4"
    var mnuCompIntake = "#view_220 .kn-link-5" ;
    var mnuReAuth = "#view_220 .kn-link-6" ;
    var mnuDischarge = "#view_220 .kn-link-7" ;
    var mnuOverride = "#view_220 .kn-link-8" ;


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
    $(mnuCompIntake).hide();
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
        case "Intake Complete":
           $(mnuCompIntake).show();
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




// Add Default Intake Documents
$(document).on('knack-record-update.view_323', function (event, view, record) {

  var user = Knack.getUserToken();
  var headers = { "Authorization": user, "X-Knack-Application-ID": app_id, "Content-Type":"application/json"};

  var clientID = Knack.models[vw_client_dtls_intact_docs].toJSON().id;
  var AgeGroup = Knack.models[vw_client_dtls_intact_docs].toJSON()["field_289"];

  Knack.showSpinner();

  console.log ( $("#view_323-field_75 option:selected").text() );
  if ($("#view_323-field_75 option:selected").text() == "Intake") {

    SetDefaultIntakeDocuments (clientID, AgeGroup);

  } // if ClientStatus == intake

  Knack.hideSpinner();



});




/**********************************************************************************************
//Event handler for record updates
*************************************************************************************************/
$(document).on('knack-record-update.any' , function (event, view, record) {
  console.dir (view) ;

  switch (view.source.object) {

    case dbObjects.Clients:
      addDefaultClientTeam (event, view, record);
      logStatusChange (event, view, record) ;
      break;

   case dbObjects.ContactNotes:
      evaluateContactNotes (event, view, record) ;
      break ;

    default:
      break ;
  }


});

/**********************************************************************************************
//Event handler for created records
*************************************************************************************************/

$(document).on('knack-record-create.any' , function (event, view, record) {
  console.log (JSON.stringify(view)) ;

  switch (view.source.object) {

    case dbObjects.Clients:
      addDefaultClientTeam (event, view, record);
      break;

   case dbObjects.ContactNotes:
      evaluateContactNotes (event, view, record) ;

    default:
      break ;
  }

});


/*********************************************************************************************************************
**********************************************************************************************************************/


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



/*********************************************************************************************************************
Knack Record Update for VW IRP Final
**********************************************************************************************************************/
// On Knack Record Update, redirect to URL. I know this already exists in Knack, but in my case
// I wanted to direct the recently updated record to another view.


$(document).on('knack-record-update.' + vw_irp_final, function (event, view, record) {

	var viewName = view["key"] ;
	var clientId =  Knack.models[viewName].toJSON()["field_200_raw"][0].id;

	console.log (JSON.stringify(view));
	console.log (clientId);


	var parser = document.createElement("a");
  var pathArray = window.location.href.split( '#' );
  var url = pathArray[0] + '#clients/edit-client2/' + clientId + '/irp/' + clientId + '/edit-client-irp/' + record.id
	console.log (url);
	window.location.href = url;

});



/*********************************************************************************************************************
Does this view contain an source object for evaluation
**********************************************************************************************************************/
function evaluateView(proc, view)
{
  try {

    proc = 'evaluateView :' + proc;


    var view_name =  view.key ;
    console.log (proc) ;
    console.log(view_name) ;
    console.dir (view) ;

    if (view.source == undefined)
    {
       console.log (view_name + " source undefined") ;
       return false ;
    }
    else
       return true ;

  }
  catch (e) {
    logerror(proc, e) ;
  }

}

/*********************************************************************************************************************
Submit Any Form
**********************************************************************************************************************/

$(document).on('knack-form-submit.any' , function(event, view, data) {

 try {

   var view_name =  view.key ;
   var proc = 'knack-form-submit.any:' + view_name ;
   if (!evaluateView (proc, view) )
      return ;

   switch (view.source.object) {
    case dbObjects.ClientGoalInterventions:
      break;

   case dbObjects.ClientGoals:
         break;

    case dbObjects.ClientIRPs :
      if (view.key == "view_702")
        copyIRP (event, view, data)  ;

      break ;

    default:
       break ;
  }
 }
  catch (e)  {
          logerror(proc, e);
       }
});

$(document).on('knack-view-render.any' , function(event, view, data) {

  try {

	     var view_name =  view.key ;
       var proc = 'knack-view-render.any:' + view_name ;
       console.log(view_name) ;
       if (!evaluateView (proc, view) )
          return ;


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

          var noteType =  $('#'+ fld_note_type).val() ;
          console.log (noteType) ;
          hideShowContactNoteFields (  view, noteType);

          return ;
        }

     }

  catch (e)  {
      logerror(proc, e);
   }

});
