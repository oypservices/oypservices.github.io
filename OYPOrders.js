/***********************************************************************************************************
***********************************************************************************************************/


function addDefaultOrderLines (event, view, record)  {

try {

    logMsg("Started") ;

    var viewName = view["key"] ;
    var objOrders = Knack.models[viewName].toJSON();
    var productGroupFieldKey = getFieldKey(dbOrders, "Product Group") + "_raw" ;
    var dfltProductFieldKey = getFieldKey(dbOrders, "Add Default Products") ;
    var hrefAddOrderLinePage = $(".kn-back-link a").attr("href") ;

    console.dir (objOrders);
    logObject (objOrders) ;

    var orderId = objOrders.id;
    console.log (orderId);
    var productGroupId = objOrders[productGroupFieldKey][0].id ;
    console.log (productGroupId) ;

    //line tems will be added manually.
    if ( objOrders[dfltProductFieldKey] == "No" )
        window.location.href =  hrefAddOrderLinePage ;


		var apidata = {
						"method": "get",
						"format" : "raw" ,
						"knackobj": getObjectKey("Product Groups"),
						"appid": app_id,
						"id" : productGroupId
					};

		OYPKnackAPICall (headers,  apidata)

  		.then (resultProductGroups => {
              return createOrderLineItems(orderId, resultProductGroups) ;    })

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

function createOrderLineItems(orderId, resultProductGroups)  {

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
