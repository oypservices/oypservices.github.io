/**********************************************************************************************
 evaluate intake document action, determine based on update to client record, whether or not default
 intake documents need to be added.
 *********************************************************************************************/

function evaluateDefaultIntakeDocuments (event, view, record) {
//	return new Promise ((resolve, reject) => {

      var proc = "evaluateDefaultIntakeDocuments" ;
      console.log(proc) ;

      // view_323 - Intake Doc Add
      // view_734 - Intake Docu Reset

      if (view.key != "view_323" && view.Key != "view_734")
         resolve ("Success") ;

      var clientID = record.id;
      var ageGroup = record[dbClients.AgeGroup];
      var docCount = record[dbClients.IntakeDocumentCount];
      var status = record[dbClients.ClientStatus_raw][0].identifier ;


       console.log (status );
       console.log (clientID ) ;
       console.log (ageGroup) ;
       console.log (docCount) ;

       if (status == "Intake") {
         console.log ("Perform Document Intake Generation") ;
         DeleteClientIntakeDocuments (clientD, docCount)
            .then (result => { return result ; } ) ;

        //  . then ( results => { return SetDefaultIntakeDocuments (clientID, ageGroup) ; } )
        //  . then ( results2 => { resolve (results2) ; } )

       } // if ClientStatus == intake

       //resolve ("No Action") ;
       return ;
//
  })
}

/***********************************************************************************8
 Add the defualt set of intake documments to the client
*************************************************************************************/

function DeleteClientIntakeDocuments (clientID, docCount ) {
  return new Promise ((resolve, reject) => {

/* This is a logical delete by moving the relationship to the client.  These records will be
   cleaned up later in the backend
*/

    console.log (clientID) ;
    console.log (docCount) ;
    console.log ("DeleteClientIntakeDocuments") ;


     if ( docCount == 0 )
        resolve (0) ;
     else
        resolve (docCount) ;
/*
     // Default Docs
      var getapidata =  {
        "method": "get",
        "knackobj": dbObjects.ClientIntakeDocuments ,
        "appid": app_id ,
        "filters": [ {
                    "field": dbClientIntakeDocuments.Client,
                    "operator":"is",
                    "value": clientID
                  } ]
      }

      console.dir (getapidata);

      OYPKnackAPICall( headers, getapidata )
        .then (resultDocumeents=> {
                resolve (deleteEachClientIntakeDoc (resultDocumeents, clientID) ) ;
                } )
        .catch(err => {
           console.log('Promise.all error', err);
           reject ( err) ;
        });
  */
   })

}

/**************************************************************************************
Logically delete each of the default intake document record for the client
***************************************************************************************/

function deleteEachClientIntakeDoc (resultDocuments, clientID ){
  return new Promise ((resolve, reject) => {

        console.log ("deleteEachClientIntakeDoc") ;
        console.dir(resultDocuments) ;

        var plist = [] ;
        if (resultDocuments.records.length == 0 ) {
          console.log ("No Intake Documents found to Delete") ;
          resolve ("No Intake Documents found to Delete") ;
        }


        for (var i = 0; i < resultDocuments.records.length ; i++) {
            var postapidata = {
                  "method": "put",
                  "knackobj": dbObjects.ClientIntakeDocuments ,
                  "appid": app_id,
                  "id" : resultsDocument.id ,
                  "record":  {
                    "field_185" :  "" ,
                    "field_178" : resultDocuments.records[i][dbDocuments.DocumentName],
                    "field_295"  : resultDocuments.records[i][dbDocuments.File + "_raw"].id,
                    "field_375" : [ clientID ]  //Deleted Client field
                  //  "field_295_raw.field_key" : "field_295" ,
                  //  "field_296_raw.url"  : resultDocuments.records[i][dbDocuments.File + "_raw.url"]
                  }
                };

             console.dir (postapidata) ;

             var p = OYPKnackAPICall(  headers, postapidata ) ;
             plist.push (p) ;

         }

         Promise.all(plist)
             .then(result => {
                 console.log('Promise.all', result);
                 resolve ('Client Intake Document Added!!!');
             })
             .catch(err => {
                 console.error('Promise.all error', err);
             });
    })
}


/***********************************************************************************8
 Add the defualt set of intake documments to the client
*************************************************************************************/

function SetDefaultIntakeDocuments (clientID, documentCategory ){
  return new Promise ((resolve, reject) => {


      console.log ("SetDefaultIntakeDocuments" ) ;
      var minor = "Intake - All Adults";
      if ( documentCategory != 'Adult' )
         minor = "Intake - All Minors" ;

      console.log (documentCategory) ;


      // Default Docs
      var getapidata =  {
        "method": "get",
        "knackobj": dbObjects.Documents,
        "appid": app_id ,
        "filters": { "match": "or",
          "rules" : [ {
                    "field": dbDocuments.DocumentCategory,
                    "operator":"is",
                    "value": "Intake - Everyone"
                  },
                  { "field": dbDocuments.DocumentCategory,
                  "operator":"is",
                  "value": "Intake - " + documentCategory
                },
                { "field": dbDocuments.DocumentCategory,
                "operator":"is",
                "value": minor
                }
               ]
            }
      }

      console.dir (getapidata);

      OYPKnackAPICall( headers, getapidata )
        .then (resultDocumeents=> { addDocumentstoClient (resultDocumeents, clientID, docCount )  } ) ;
   })
}


/**************************************************************************************
Add each of the default intake document
***************************************************************************************/

function addDocumentstoClient (resultDocuments, clientID ){
  return new Promise ((resolve, reject) => {

        console.log ("addDocumentstoclient") ;
        console.dir(resultDocuments) ;

        var plist = [] ;
        if (resultDocuments.records.length == 0 ) {
          console.log ("No Intake Documents found") ;
          resolve ("No Intake Documents found") ;
        }


        for (var i = 0; i < resultDocuments.records.length ; i++) {
            var postapidata = {
                  "method": "post",
                  "knackobj": dbObjects.ClientIntakeDocuments ,
                  "appid": app_id,
                  "record":  {
                    "field_185" :  clientID ,
                    "field_178" : resultDocuments.records[i][dbDocuments.DocumentName],
                    "field_295"  : resultDocuments.records[i][dbDocuments.File + "_raw"].id
                  //  "field_295_raw.field_key" : "field_295" ,
                  //  "field_296_raw.url"  : resultDocuments.records[i][dbDocuments.File + "_raw.url"]
                  }
                };

             console.dir (postapidata) ;

             var p = OYPKnackAPICall(  headers, postapidata ) ;
             plist.push (p) ;

         }

         Promise.all(plist)
             .then(result => {
                 console.log('Promise.all', result);
                 resolve ('Client Intake Document Added!!!');
             })
             .catch(err => {
                 console.error('Promise.all error', err);
             });
    })
}
