/*******************************************************************************************
Standard error logging function.
********************************************************************************************/

function logerror (e) {

    var source = logerror.caller.name ;
    console.log ("Error in " + source + ": " + e ) ;
    console.log (e.stack) ;

  return
}

/*******************************************************************************************
Standard message logging.
********************************************************************************************/

function logMsg (msg) {

    var source = logMsg.caller.name ;
    console.log (source + ": " + msg ) ;

  return
}

/*******************************************************************************************
Standard message logging.
********************************************************************************************/

function logObject (msg) {

    var source = logObject.caller.name ;
    console.dir (source + ": " + msg ) ;

  return
}

/**********************************************************************************************
//Event handler for created records
*************************************************************************************************/

$(document).on('knack-record-create.any' , function (event, view, record) {
  console.dir (view) ;

  switch (view.source.object) {

    case dbContacttoContactLinks.key:
      addContactRelationships (event, view, record);
      break;

   case getObjectKey("Orders") :
      addDefaultOrderLines (event, view, record) ;
      break ;

    default:
      break ;
  }

});

/**********************************************************************************************
//Event handler for view render
*************************************************************************************************/

$(document).on('knack-view-render.any' , function(event, view, data) {

  try {
	var view_name =  view.key ;

	console.log(view_name) ;
  switch (view.source.object) {
			case dbContacts.key :

        hideFormFieldEvent (view, dbContacts, "Contact Type" ) ;
				break;

     case dbActivities.key :
        hideFormFieldEvent (view, dbActivities,"Activity Associated With") ;
        hideFormFieldEvent (view, dbActivities, "Activity Type" ) ;
        hideFormFieldEvent (view, dbActivities, "Activity Sub Type" ) ;
        break ;




			default :
			  break ;

	}


  }   catch (e) {
            logerror (e);
    }

});


/*******************************************************************************************
Setup the events that will be triggered to hide fields
********************************************************************************************/

function hideFormFieldEvent (view, dbObject, field ) {

try {

    var ddField = '#' + view.key + '-' +  getFieldKey(dbObject, field) ;
    logMsg (ddField) ;

    if($(ddField).length == 0)
      return ;

    if (getFieldKey(dbObject, field)  != undefined)   {   //needs to be addressed, cause it will never be undefined TODO

          //add onchange event to the  drop down box
          $(ddField).on('change',function(e){
            logerror (e);
            logMsg ( dbObject.key + " " + field + " = " + $(ddField + ' option:selected').text() );
            hideFormFields (  view, dbObject, field, $(ddField +  ' option:selected').text() );
          });

          logMsg (  $(ddField +  ' option:selected').text() ) ;
          hideFormFields  (  view, dbObject, field,  $(ddField +  ' option:selected').text() );
     }

     return;

      }
   catch (e) {
          logerror (e);
  }
}





function CallAPIJSONTransform(message) {

	console.dir (message);
	var objTransform = {data: {}, template:{}};
	objTransform.data.models = Knack.models['view_209'].data.models;
	objTransform.template = message.records[0].field_178 ;



 var resource = 'jsontransform';
 OYPServicesAPIPost( resource, headers, objTransform )
 	.then (result=> {CallAPISendMail(result) } ) ;

}

function CallAPISendMail(message) {

	var resource = 'sendmail';
	console.log ('sendmail');
  OYPServicesAPIPost( resource, OYPAPIHeaders, message ) ;

}

// Change "scene_1" to the scene you want to listen for
$(document).on('knack-scene-render.scene_120', function(event, scene) {
  // Do something after the scene renders
  console.log('view 209');

  //Get the template from the api table
	var getapidata =
	{
	  "method": "get",
	  "knackobj": "object_19",
		"appid": "5b0c347966775f2a64354e2a",
	  "appidtest": Knack.app.id,
	  "filters": [
	    {
	      "field": "field_176",
	      "operator": "is",
	      "value": "Send Status Report"
	    }
	  ]
	}

	console.dir (getapidata);
	var resource = 'knackobject';
  OYPServicesAPIPost( resource, headers, getapidata )
  	.then (result=> {CallAPIJSONTransform(result) } ) ;

});
