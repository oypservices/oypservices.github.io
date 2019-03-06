
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
		OYPKnackAPICall (headers,  apidata)

  		.then (resultActivities => {

              var dynamic_template_data = { "dynamic_template_data" :
                                            {"accomplishments" : resultActivities.records } } ;
              console.dir(dynamic_template_data) ;
              var msg = {} ;
              msg.to = ['brian@oypservices.com' ];
              msg.subject = ' Project Status Report (test)';
        //      msg.html = "Status has changed to " + clientStatus ;
              msg.from = "info@oypcrm.com" ;
              msg.dynamic_template_data = dynamic_template_data ;
              msg.template_id = "d-dbd4fd2a6cbf42c6837e8198ca9564b0";
              OYPAPISendMail(headers, msg) ;



              console.dir (resultActivities);

               return resultActivities   })

//  	  .then ( result => {
//  						window.location.href =  hrefAddOrderLinePage ;   } );

}
catch (e)  {
				logerror( e);
		 }
}
