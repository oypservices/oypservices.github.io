
/***********************************************************************************************************
***********************************************************************************************************/

function submitEmail (event, view, record)  {

try {

    logMsg("submitEmail") ;

    var viewName = view["key"] ;
    var objEmail = Knack.models[viewName].toJSON();
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
    var msg = {} ;
    msg.to = {};
    msg.from = "info@oypcrm.com" ;
    msg.template_id = "d-dbd4fd2a6cbf42c6837e8198ca9564b0";

    getEmailAddress(msg.to)
      .then ( msg => { return msg ;}  )
		  .then ( msg => {
            resultActivities = OYPKnackAPICall (headers,  apidata);
            msg.dynamic_template_data  = {"accomplishments" : resultActivities.records } ;
            msg.dynamic_template_data.subject = ' Project Status Report (test)';
            return msg;
       })

      .then ( msg => {
                console.log (msg) ;
                OYPAPISendMail(headers, msg) ;
         })

}
catch (e)  {
				logerror( e);
		 }
}

/****************************************************************************************************************
Get a database row by its id
********************************************************************************************************************/

function getEmailAddress(msgComponent)
{
		return new Promise ((resolve, reject) => {

        var proc = "getDBOjectById" ;
        console.log (proc);
        var addr = ["brian@oypservices.com", "bkanthony185@gmail.com"];
        msgComponent = addr ;

        //getDBOjectById(headers, "object_1", "aaaaaaa" );
        resolve(msgComponent) ;

   })

}
