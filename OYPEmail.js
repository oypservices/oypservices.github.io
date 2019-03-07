
/***********************************************************************************************************
***********************************************************************************************************/

function submitEmail (event, view, record)  {

try {

    logMsg("submitEmail") ;

    var viewName = view["key"] ;
    var objEmail = Knack.models[viewName].toJSON();

    console.log (record) ;

//    var productGroupFieldKey = getFieldKey(dbOrders, "Product Group") + "_raw" ;
//    var dfltProductFieldKey = getFieldKey(dbOrders, "Add Default Products") ;
//    var hrefAddOrderLinePage = $(".kn-back-link a").attr("href") ;

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
    msg.dynamic_template_data = {};

    var pTo = 	setEmailAddress(msg, "to", record[getFieldKey(dbEmails, "To")]) ;
    plist.push (pTo);

  //  var pFrom = 	setEmailAddress(msg, "from", record[getFieldKey(dbEmails, "From")]) ;
  //  plist.push (pFrom);

    var pData = setDynamicTemplateData(msg, "accomplishments");
    plist.push (pData);

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

function setEmailAddress(msg, component, field)
{
		return new Promise ((resolve, reject) => {

        var proc = "setEmailAddress" ;
        console.log (proc);
        var addr = [];

        for (var n = 0; n < field.lenth ; n++)
        {
          getDBOjectById(headers, "object_1", field[n].id )
            .then ( result => {
              addr.push ( { "email": result["field_126"],
                            "name" : result["field_194"]}) ;
              resolve (result) ;
            })
        }




        msg[component] = addr;
        //getDBOjectById(headers, "object_1", "aaaaaaa" );
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
            msg.dynamic_template_data.subject = 'Project Status Report (test)';
            resolve(msg);
      })


  })

}
