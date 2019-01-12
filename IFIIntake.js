
/***********************************************************************************8
 Add the defualt set of intake documments to the client
*************************************************************************************/

function SetDefaultIntakeDocuments (clientID, documentCategory) {

  try {

    var minor = "Intake - All Adults";
    if ( documentCategory != 'Adult' )
       minor = "Intake - All Minors" ;

    console.log (documentCategory) ;


    var resource = 'knackobject';
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

    OYPServicesAPIPost( resource, headers, getapidata )
      .then (resultDocumeents=> { addDocumentstoClient (resultDocumeents, clientID)  } ) ;

  }
  catch (e) {
      logerror ("SetDefaultIntakeDocuments", e);
    }
}


/**************************************************************************************
Add each of the default intake document
***************************************************************************************/

function addDocumentstoClient (resultDocuments, clientID)
{
    try {

        console.log ("addDocumentstoclient") ;
        console.dir(resultDocuments) ;
        var resource = 'knackobject';

        if (resultDocuments.records.length > 0 )
        {

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

               OYPServicesAPIPost( resource, headers, postapidata )
                             .then (resultDocAdded=> {
                               console.dir (resultDocAdded) ;
                               console.log('Client Intake Document Added!!!');
                             }) ;
           }

        }
        else {
          console.log ("No Intake Documents found") ;
        }



    } catch (e) {
      logerror ("addDocumentstoClient", e);
    }

    finally {
      return ;
    }

}
