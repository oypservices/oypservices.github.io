/*******************************************************************************************************
 logClientDetailChange every time the client record is updated, if needed
*******************************************************************************************************/

function logClientDetailChange (event, view, recordClient) {
try {

  var viewName = view["key"] ;
  var objClient = Knack.models[viewName].toJSON();

  console.dir (objClient);

  var clientId = objClient.id ;
  var clientName = objClient[dbClients.ClientName + "_raw"];
  var UpdatedBy = Knack.getUserAttributes().id
  var FieldsUpdated = "" ;
  var Address = objClient[dbClients.Address + "_raw"] ;
  var MA = objClient[dbClients.MA] ;
  var ID = objClient[dbClients.ID] ;
  var Gender = objClient[dbClients.Gender] ;
  var ReferredByTitle = objClient[dbClients.ReferredByTitle] ;
  var ReferredBy = objClient[dbClients.ReferredBy+ "_raw"] ;
  var ReferralReason = objClient[dbClients.ReferralReason] ;
  var ReferrerPhone = objClient[dbClients.ReferrerPhone+ "_raw"] ;
  var DOB = objClient[dbClients.DOB] ;
  var ClientPhone = objClient[dbClients.ClientPhone+ "_raw"] ;
  var GuardianName = objClient[dbClients.GuardianName+ "_raw"] ;
  var GuardianPhoneNumber = objClient[dbClients.GuardianPhoneNumber+ "_raw"] ;
  var AXISI = objClient[dbClients.AXISI] ;
  var AXISII = objClient[dbClients.AXISII] ;
  var AXISIII = objClient[dbClients.AXISII] ;
  var AXISIV = objClient[dbClients.AXISIV] ;
  var AXISVGAF = objClient[dbClients.AXISVGAF] ;
  var Medications = objClient[dbClients.Medications] ;
  var MaritalStatus = objClient[dbClients.MaritalStatus] ;
  var EmploymentStatus = objClient[dbClients.EmploymentStatus] ;
  var IncomeSource = objClient[dbClients.IncomeSource] ;



  var curClientStatus  = {
    "field_486": clientId ,
    "field_487":UpdatedBy ,
    "field_490":FieldsUpdated ,
    "field_458":clientName ,
    "field_461":Address ,
    "field_462":MA,
    "field_463":ID ,
    "field_464":Gender ,
    "field_465":ReferredByTitle ,
    "field_466":ReferredBy ,
    "field_467":ReferralReason ,
    "field_468":ReferrerPhone ,
    "field_469":DOB ,
    "field_472":ClientPhone ,
    "field_473":GuardianName ,
    "field_474":GuardianPhoneNumber ,
    "field_475":AXISI ,
    "field_476":AXISII ,
    "field_477":AXISIII ,
    "field_478":AXISIV ,
    "field_479":AXISVGAF ,
    "field_482":Medications ,
    "field_483":MaritalStatus ,
    "field_484":EmploymentStatus ,
    "field_485":IncomeSource
  } ;
  console.dir (curClientStatus);

  //get the last statud history record for the clientId
  var resource = 'knackobject';
  var getapidata =  {
    "method": "get",
    "knackobj": dbObjects.ClientHistory,
    "appid": app_id ,
    "page":"1",
    "rows_per_page":"1",
    "sort_field": dbClientHistory.UpdatedDateTime,
    "sort_order":"desc",
    "filters": [ {
        "field":dbClientHistory.Client ,
        "operator":"is",
        "value": clientId
      }
    ]
  }

  console.log ("logStatusChange");
  console.dir (getapidata);

  OYPServicesAPIPost( resource, headers, getapidata )
    .then (resultCSH=> {

         console.dir (resultCSH);

          if (resultCSH.records.length == 0 )
          {
            console.log ("No Client History" + resultCSH.records.length);
            insertClientHistory (curClientStatus) ;
          }
          else {

          var bEqual = (resultCSH.records[0] === curClientStatus) ;
          console.log ("Are they equal", bEqual) ;

          var updatedFields = "" ;

          var bChange  = false ;
          for (var i = 0; i < arrClientHistory.length; i++) {
                var key = arrClientHistory[i].key ;
                var label = arrClientHistory[i].label
                var record = resultCSH.records[0] ;
                var srckey = key ;

                if (record[key + "_raw"] != undefined)
                   srckey = srckey + "_raw" ;


                if (record[srckey] === curClientStatus[key])
                    console.log ("equal") ;
                else
                   {
                     console.dir ("before: " + record[srckey]);
                     console.dir ("after:" + curClientStatus[key]) ;
                     if (bChange)
                        updatedFields = updatedFields + ", " + label ;
                     else
                        updatedFields = label ;

                     bChange = true ;
                  }
            }

            if (bChange)
               curClientStatus ["field_490"] = updatedFields ;
               insertClientHistory (curClientStatus) ;
        }
    } )
  }
catch (e)
  {
    logerror ("logStatusChange", e);
  }

}

/*******************************************************************************************************
 logStatusChanges every time the client record is updated, if needed
*******************************************************************************************************/

function logStatusChange (event, view, recordClient) {
try {

    var viewName = view["key"] ;
    var objClient = Knack.models[viewName].toJSON();

    console.dir (objClient);

    var clientId = objClient.id ;

    var clientName = objClient[dbClients.ClientName];
    var clientStatus = objClient[dbClients.ClientStatus_raw][0].identifier;
    var clientStatusid = objClient[dbClients.ClientStatus_raw][0].id;
    var clientStatusNote = objClient[dbClients.ClientStatusNote] ;
    var beaconStartDate = objClient[dbClients.BeaconStartDate] ;
    var beaconEndDate = objClient[dbClients.BeaconEndDate] ;
    var beaconCollaborationSummary = objClient[dbClients.BeaconCollaborationSummary] ;

    var curClientStatus  = {
      "field_336": clientId ,
      "field_331": clientStatusid,
      "status_name" : clientStatus,
      "field_332": clientStatusNote,
      "field_333": beaconStartDate ,
      "field_334":beaconEndDate  ,
      "field_455":beaconCollaborationSummary  ,
      "field_335":Knack.getUserAttributes().id
    } ;
    console.dir (curClientStatus);

    //get the last statud history record for the clientId
    var resource = 'knackobject';
    var getapidata =  {
      "method": "get",
      "knackobj": dbObjects.ClientStatusHistory,
      "appid": app_id ,
      "page":"1",
      "rows_per_page":"1",
      "sort_field": dbClientStatusHistory.StatusDate,
      "sort_order":"desc",
      "filters": [ {
          "field":dbClientStatusHistory.Client ,
          "operator":"is",
          "value": clientId
        }
      ]
    }

    console.log ("logStatusChange");
    console.dir (getapidata);

    OYPServicesAPIPost( resource, headers, getapidata )
      .then (resultCSH=> {

           console.dir (resultCSH);

            if (resultCSH.records.length == 0 )
            {
              console.log ("No Status History" + resultCSH.records.length);
               insertClientStatusHistory (curClientStatus) ;
            }
            else if (resultCSH.records[0]["field_331_raw"][0].id != clientStatusid)
            {
               console.log ("before: " + resultCSH.records[0]["field_331_raw"][0].id );
               console.log ("after:" + clientStatusid) ;
               insertClientStatusHistory (curClientStatus) ;
            }

            if (clientStatusNote != "")
              resetClientStatusNote(clientId) ;

      } )
        .then ( result => {

          var filters = [
            {
              "field":dbContacts.Name,
              "operator":"contains",
              "value": teamMember.Name
            }
           ]

             var msg = {} ;
             msg.to = ['vanessa@oypservices.com', 'brian@oypservices.com' ];
             msg.subject = clientName + ' - IFI Client Status Change (Test)';
             msg.html = "Status has changed to " + clientStatus ;
             msg.from = "info@ifi-md.org" ;
             OYPAPISendMail(headers, msg) ;
        });

    }
  catch (e)
    {
      logerror ("logStatusChange", e);
    }

}



/**************************************************************************************
 Remove the note field if populated
***************************************************************************************/

function resetClientStatusNote (clientId)
{
    try {

        var proc = "resetClientStatusNote" ;
        console.log (proc);

        /*Update the client record, set the clientsatusnote to null */

        var resource = 'knackobject';
        var postapidata = {
              "method": "put",
              "knackobj": dbObjects.Clients ,
              "appid": app_id,
              "record":  { field_328 : "" } ,
              "id" : clientId
       };
       console.dir (postapidata);

       OYPServicesAPIPost( resource, headers, postapidata )
           .then (resultDocAdded=> {
                               console.dir (resultDocAdded) ;
                               console.log('Client Status Reset!!!');
                             }) ;

    }
     catch (e) {
      logerror (proc, e);
    }

}




/**************************************************************************************
 Insert a status history record
***************************************************************************************/

function insertClientHistory (curClientStatus)
{
    try {

        var proc = "insertClientHistory" ;
        console.log (proc);

        console.dir (curClientStatus);
        var resource = 'knackobject';
        var postapidata = {
              "method": "post",
              "knackobj": dbObjects.ClientHistory ,
              "appid": app_id,
              "record":  curClientStatus
      };
      console.dir (postapidata);
       OYPServicesAPIPost( resource, headers, postapidata )
           .then (resultDocAdded=> {
                               console.dir (resultDocAdded) ;
                               console.log('Client Status History Added!!!');
                             }) ;
        }
   catch (e) {
      logerror (proc, e);
    }
}





/**************************************************************************************
 Insert a status history record
***************************************************************************************/

function insertClientStatusHistory (curClientStatus)
{
    try {

        var proc = "insertClientStatusHistory" ;
        console.log (proc);
        console.log (curClientStatus.field_331) ;

        if (curClientStatus.status_name != "Authorization Approved") {
           //delete the dates, if this is not the beacon authorization status
            delete curClientStatus.field_333;
            delete curClientStatus.field_334;
        }


        delete curClientStatus.status_name ;

        console.dir (curClientStatus);
        var resource = 'knackobject';
        var postapidata = {
              "method": "post",
              "knackobj": dbObjects.ClientStatusHistory ,
              "appid": app_id,
              "record":  curClientStatus
      };
      console.dir (postapidata);
       OYPServicesAPIPost( resource, headers, postapidata )
           .then (resultDocAdded=> {
                               console.dir (resultDocAdded) ;
                               console.log('Client Status History Added!!!');
                             }) ;
        }
   catch (e) {
      logerror (proc, e);
    }
}
