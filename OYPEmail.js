
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


    var msg = {} ;
    msg.to = {};
    msg.from = "info@oypcrm.com" ;
    msg.template_id = "d-dbd4fd2a6cbf42c6837e8198ca9564b0";


    setEmailAddress(msg, "to")
		  .then ( msg => { setDynamicTemplateData(msg, "accomplishments"); })
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
Set a database row by its id
********************************************************************************************************************/

function setEmailAddress(msg, component)
{
		return new Promise ((resolve, reject) => {

        var proc = "setEmailAddress" ;
        console.log (proc);
        msg[component] = ["brian@oypservices.com", "bkanthony185@gmail.com"];
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
            msg.dynamic_template_data  = {component : resultActivities.records } ;
            msg.dynamic_template_data.subject = ' Project Status Report (test)';
            resolve(msg );
      })

    resolve(msg) ;

}
