
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
    msg.template_id = "d-dbd4fd2a6cbf42c6837e8198ca9564b0";

    if (record[getFieldKey(dbEmails, "Body") ].length > 0)
      msg.html = record[getFieldKey(dbEmails, "Body") ] ;
      
    msg.dynamic_template_data = {};

    msg.subject = record[getFieldKey(dbEmails, "Subject") ] ;

    var pTo = 	setEmailAddress(msg, "to", record[getFieldKey(dbEmails, "To") + "_raw"]) ;
    plist.push (pTo);

    var pCc = 	setEmailAddress(msg, "cc", record[getFieldKey(dbEmails, "CC")+ "_raw"]) ;
    plist.push (pCc);

    var pBcc = 	setEmailAddress(msg, "bcc", record[getFieldKey(dbEmails, "BCC")+ "_raw"]) ;
    plist.push (pBcc);

    var pData = setDynamicTemplateData(msg, "accomplishments");
    plist.push (pData);

    var pDatat = setDynamicTemplateData(msg, "tasks");
    plist.push (pDatat);

    var pDatar = setDynamicTemplateData(msg, "risks");
    plist.push (pDatar);

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

function getEmailTemplate(templateId)
{
		return new Promise ((resolve, reject) => {

        var proc = "getEmailTemplate" ;
        console.log (proc);

  //      getDBOjectById(headers, "object_1", templateId )
  //        .then ( result => {
  //                  console.dir (result);
  //                  resolve (result) ; })

        for (var n = 0; n < field.length ; n++)
        {
          getDBOjectById(headers, "object_1", templateId )
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

function setDynamicTemplateData(msg, component)
{
		return new Promise ((resolve, reject) => {


      var proc = "setDynamicTemplateData" ;
      console.log (proc);

      var apidata = {
  						"method": "get",
  						"format" : "raw" ,
  						"knackobj": getObjectKey("Activities"),
  						"appid": app_id,
  						"filters" : { "match": "and",
  								 "rules" : [ {
  													 "field":   getFieldKey(dbActivities, "Complete Date") ,
  													 "operator":"is during the previous",
  													 "value": "week"
  												 } ]
  									 }
  					};

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
