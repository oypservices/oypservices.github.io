
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
    var productGroupId = objOrders[productGroupFieldKey][0].id ;
    console.log (productGroupId) ;

    //line tems will be added manually.
    if ( objOrders[dfltProductFieldKey] == "No" )
        window.location.href =  hrefAddOrderLinePage ;


		var apidata = {
						"method": "get",
						"format" : "raw" ,
						"knackobj": getObjectKey("Activities"),
						"appid": app_id,
						"filters" : { "match": "and",
								 "rules" : [ {
													 "field":   getFieldKey(dbActivities, "Complete Date") ,
													 "operator":"is after",
													 "value": "02/28/2019"
												 },
												 {
													 "field": getFieldKey(dbActivities, "Complete Date"),
													 "operator":"is today or before"
												 }]
									 }
					};

		OYPKnackAPICall (headers,  apidata)

  		.then (resultActivities => {
              console.dir (resultActivities);
               return resultActivities   })

//  	  .then ( result => {
//  						window.location.href =  hrefAddOrderLinePage ;   } );

}
catch (e)  {
				logerror( e);
		 }
}
