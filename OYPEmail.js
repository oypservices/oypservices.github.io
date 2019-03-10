
/***********************************************************************************************************
***********************************************************************************************************/

function submitEmail (event, view, record)  {

try {

    logMsg("submitEmail") ;

    var viewName = view["key"] ;
    var objEmail = Knack.models[viewName].toJSON();

    console.log (record) ;
    console.dir (objEmail);
    logObject (objEmail) ;

    var emailId = objEmail.id;
    console.log (emailId);
  //  var productGroupId = objOrders[productGroupFieldKey][0].id ;
  //  console.log (productGroupId) ;

    //line tems will be added manually.
  //  if ( objOrders[dfltProductFieldKey] == "No" )
  //      window.location.href =  hrefAddOrderLinePage ;


    var plist = [] ;
    var msg = {} ;

    msg.to = {};
    msg.from = "info@oypcrm.com" ;

    msg.subject = record[getFieldKey(dbEmails, "Subject") ] ;

    var pTo = 	setEmailAddress(msg, "to", record[getFieldKey(dbEmails, "To") + "_raw"]) ;
    plist.push (pTo);

    var pCc = 	setEmailAddress(msg, "cc", record[getFieldKey(dbEmails, "CC")+ "_raw"]) ;
    plist.push (pCc);

    var pBcc = 	setEmailAddress(msg, "bcc", record[getFieldKey(dbEmails, "BCC")+ "_raw"]) ;
    plist.push (pBcc);

    if (record[getFieldKey(dbEmails, "Body") ].length > 0)
      msg.html = record[getFieldKey(dbEmails, "Body") ] ;

    var templateId = record[getFieldKey(dbEmails, "Email Template") + "_raw"] ;
    if (templateId.length > 0) {
      templateId = templateId[0].id

      var pTemplate =  getEmailTemplate(templateId, msg) ;
      plist.push (pTemplate);

      var pTemplateSects =  getEmailTemplateSections(templateId, msg) ;
      plist.push (pTemplateSects);
    }

     Promise.all(plist)
         .then(result => {
             console.log('Promise.all', result);
             console.log(result) ;
             OYPAPISendMail(headers, result[1])  ;
             return 'copyGoalRecords successful';
         })
         .catch(err => {
             console.error('Promise.all error', err);
           //	resolve ('copyGoalRecords successful');
         });

}
catch (e)  {
				logerror( e);
		 }
}


/****************************************************************************************************************
Set a database row by its id
********************************************************************************************************************/

function getEmailTemplate(templateId, msg)
{
		return new Promise ((resolve, reject) => {

        var proc = "getEmailTemplate" ;
        console.log (proc);

        getDBOjectById(headers, getObjectKey("Email Templates"), templateId )
            .then ( result => {

              if (result != undefined) {
                msg.template_id = result[getFieldKey(dbEmailTemplates, "Sendgrid Template")];
                console.dir (msg) ;
                resolve (msg) ;
              }
            })
   })

}

/****************************************************************************************************************
Set a database row by its id
********************************************************************************************************************/

function getEmailTemplateSections(templateId, msg)
{
		return new Promise ((resolve, reject) => {

        var proc = "getEmailTemplateSections" ;
        var plist = [] ;

        console.log (proc);

        var apidata = {
                "method": "get",
                "format" : "raw" ,
                "knackobj": getObjectKey("Email Template Sections"),
                "appid": app_id,
                "filters" : { "match": "and",
                     "rules" : [ {
                               "field":   getFieldKey(dbEmailTemplateSections, "Email Template"),
                              "operator" : "contains",
                              "value" : templateId
                             }]
                       }
              };

         OYPKnackAPICall (headers,  apidata)
          .then (result => {

                msg.dynamic_template_data = {};
                for (var n = 0; n < result.records.length ; n++) {
                   var record = result.records[n];
                   var sectionName = record[getFieldKey(dbEmailTemplateSections, "Email Template Sections Name")];
                   var apiMailPath = record[getFieldKey(dbEmailTemplateSections, "Email Section")];
                   var apiMailPathSub = record[getFieldKey(dbEmailTemplateSections, "JSON Path")];
                   var apiApplicationData = record[getFieldKey(dbEmailTemplateSections, "APIData")];
                   var apiApplicationData = JSON.parse (apiApplicationData);

                   if (apiMailPath == "dynamic_template_data") {

                      var pData = setDynamicTemplateData(record, msg, apiMailPathSub, apiApplicationData );
                      plist.push (pData);
                   }
                }
          }) ;

        Promise.all(plist)
            .then(result => {
                console.log('Promise.all', result);
                console.log(result) ;
                resolve (msg) ;
            })
            .catch(err => {
                console.error('Promise.all error', err);

            });

   })

}



/****************************************************************************************************************
Set a database row by its id
********************************************************************************************************************/

function setEmailAddress(msg, component, field)
{
		return new Promise ((resolve, reject) => {

        var proc = "setEmailAddress" ;
        console.log (proc);
        var addr = [];

        for (var n = 0; n < field.length ; n++)
        {
          getDBOjectById(headers, "object_1", field[n].id )
            .then ( result => {
              addr.push ( { "email": result["field_26"].email,
                            "name" : result["field_194"]}) ;
              resolve (result) ;
            })
        }

        msg[component] = addr;

        console.dir (msg) ;
        resolve(msg) ;

   })

}


/****************************************************************************************************************
Set a dynamic_template_data
********************************************************************************************************************/

function setDynamicTemplateData(record, msg, component, apiApplicationData)
{
		return new Promise ((resolve, reject) => {

      var proc = "setDynamicTemplateData" ;
      console.log (proc);

      var apidata = apiApplicationData;
      apidata.appid = app_id;

      console.dir(apidata) ;

      OYPKnackAPICall (headers,  apidata)
      . then ( resultActivities => {

            msg.dynamic_template_data[component] = resultActivities.records ;

            if (msg.dynamic_template_data.subject == undefined)
                msg.dynamic_template_data.subject = msg.subject;

            resolve(msg);
      })


  })

}
