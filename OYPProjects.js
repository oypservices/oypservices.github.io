/***********************************************************************************************************
***********************************************************************************************************/


function addDefaultJobPhases (event, view, record)  {

try {

    logMsg("Started") ;

    var viewName = view["key"] ;
    var objProjects  = Knack.models[viewName].toJSON();
    console.dir (objProjects);

    var projectTypeKey = objProjects [ getFieldKey(dbProjects, "Project Type") + "_raw" ];
    var projectTypeSubKey =  objProjects [getFieldKey(dbProjects, "Project Sub Type") + "_raw" ] ;
    var hrefAddOrderLinePage = $(".kn-back-link a").attr("href") ;

    console.dir (projectTypeKey) ;

    //line tems will be added manually.
    //if ( objOrders[dfltProductFieldKey] == "No" )
    //    window.location.href =  hrefAddOrderLinePage ;

    var filters = { "filters" : { "match": "and",
                 "rules" : [ {
                           "field":   getFieldKey(dbProductGroups, "Project Type"),
                          "operator" : "contains",
                          "value" : projectTypeKey[0].id
                        }]
                   } } ;



		var apidata = {
						"method": "get",
						"format" : "raw" ,
						"knackobj": getObjectKey("Product Groups"),
						"appid": app_id,
						"filters" : filters
					};

		OYPKnackAPICall (headers,  apidata)

  		.then (resultProductGroups => {
              console.dir (resultProductGroups) ;
  //            return createProjectPhases(orderId, resultProductGroups) ;
              })

  	  .then ( result => {
  						window.location.href =  hrefAddOrderLinePage ;   } );

}
catch (e)  {
				logerror( e);
		 }
}

/********************************************************************************************************************
Copy the Goal records
*********************************************************************************************************************/

function createProjectPhases(orderId, resultProductGroups)  {

 	return new Promise ((resolve, reject) => {


    //already in raw format so raw not needed
    var productsFieldKey = getFieldKey(dbProductGroups, "Products") ;
    var products = resultProductGroups[productsFieldKey] ;
    var plist = [];

    console.log (productsFieldKey) ;
    console.dir (products)


     for (var n= 0 ; n < products.length ; n++ )
     {
         var record = {
                        "field_270" : orderId,
                        "field_271" : [ products[n].id ]
         }


         var apidata = {
    								 "method": "post",
    								 "knackobj": getObjectKey("Order Line Items"),
    								 "appid": app_id,
    								 "record": record
    				};

         var p = 	OYPKnackAPICall (headers,  apidata)	;     //write the line item
         plist.push (p);

     }

     Promise.all(plist)
          .then(result => {
              console.log('Promise.all', result);
              resolve ('createOrderLineItems successful');
          })
          .catch(err => {
              console.error('createOrderLineItems Promise.all error', err);
            //	resolve ('copyGoalRecords successful');
          });

	})
}
