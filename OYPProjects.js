/***********************************************************************************************************
***********************************************************************************************************/


function addDefaultJobPhases (event, view, record)  {

try {

    logMsg("Started") ;

    var viewName = view["key"] ;
    var objProjects  = Knack.models[viewName].toJSON();
    console.dir (objProjects);
    var projectId = objProjects.id ;

    var projectTypeKey =  getFieldKey(dbProjects, "Project Type") + "_raw" ;
    var projectType = objProjects [ projectTypeKey];

    var projectSubTypeKey =  getFieldKey(dbProjects, "Project Sub Type") + "_raw"  ;
    var projectSubType = objProjects [ projectSubTypeKey];

    var hrefAddOrderLinePage = $(".kn-back-link a").attr("href") ;

    console.dir (projectType) ;

    //line tems will be added manually.
    //if ( objOrders[dfltProductFieldKey] == "No" )
    //    window.location.href =  hrefAddOrderLinePage ;

    var filters =  { "match": "and",
                 "rules" : [ {
                           "field":   getFieldKey(dbProductGroups, "Project Type"),
                          "operator" : "contains",
                          "value" :  projectType[0].id
                        }]
                   } ;

		var apidata = {
						"method": "get",
						"format" : "raw" ,
						"knackobj": getObjectKey("Product Groups"),
						"appid": app_id,
						"filters" : filters
					};

    console.dir (apidata) ;
		OYPKnackAPICall (headers,  apidata)

  		.then (resultProductGroups => {
              console.dir (resultProductGroups) ;
              return createProjectPhases(projectId, resultProductGroups  ) ;
              })

//  	  .then ( result => {
//  						window.location.href =  hrefAddOrderLinePage ;   } );

}
catch (e)  {
				logerror( e);
		 }
}

/********************************************************************************************************************
Copy the Goal records
*********************************************************************************************************************/

function createProjectPhases(projectId, resultProductGroups)  {

 	return new Promise ((resolve, reject) => {


    //already in raw format so raw not needed
  //  var productsFieldKey = getFieldKey(dbProductGroups, "Products") ;

    var plist = [];

//    console.log (productsFieldKey) ;
//    console.dir (products)


     for (var n= 0 ; n < resultProductGroups.records.length ; n++ )
     {
         var prodGroupRec = resultProductGroups.records[n] ;
         var record = {
                        "field_414" : projectId,
                        "field_465" : prodGroupRec.id ,
                        "field_442" : n + 1,
                        "field_438" : "No"
         }

         var apidata = {
    								 "method": "post",
    								 "knackobj": getObjectKey("Project Detail Items"),
    								 "appid": app_id,
    								 "record": record
    				};

         var p = 	OYPKnackAPICall (headers,  apidata)	;     //write the line item
         plist.push (p);
         p.then (
           var pT = createProjectTakeoffDefaults(p.id, prodGroupRec) ;
           plist.push (pT) ;
         )

     }

     Promise.all(plist)
          .then(result => {
              console.log('Promise.all', result);
              resolve ('createProjectPhases successful');
          })
          .catch(err => {
              console.error('createProjectPhases Promise.all error', err);
            //	resolve ('copyGoalRecords successful');
          });

	})
}

/********************************************************************************************************************
Default Project Takeoff Records
*********************************************************************************************************************/

function addDefaultJobTakeoffs (projectDetailItemId, prodGroupRec)  {
 	return new Promise ((resolve, reject) => {

    logMsg("addDefaultJobTakeoffs") ;

    var filters =  { "match": "and",
                 "rules" : [ {
                           "field":   getFieldKey(dbProducts, "Product Group"),
                          "operator" : "contains",
                          "value" :  prodGroupRec.id
                        }]
                   } ;

		var apidata = {
						"method": "get",
						"format" : "raw" ,
						"knackobj": getObjectKey("Products"),
						"appid": app_id,
						"filters" : filters
					};

    console.dir (apidata) ;
		OYPKnackAPICall (headers,  apidata)

  		.then (resultProducts => {
              console.dir (resultProducts) ;
              resolve ( createProjectTakeoffItems(projectDetailItemId, resultProducts  )  );
              })
  })
}


function createProjectTakeoffItems(projectDetailItemId, resultProducts)  {

 	return new Promise ((resolve, reject) => {

    var plist = [];

     for (var n= 0 ; n < resultProducts.records.length ; n++ )
     {
         var productRec = resultProducts.records[n] ;
         var record = {

                        "field_401" : projectDetailItemId,
                        "field_402" : [productRec.id] ,
                        "field_452" : "No"
         }


         var apidata = {
    								 "method": "post",
    								 "knackobj": getObjectKey("Project Detail Item Costs"),
    								 "appid": app_id,
    								 "record": record
    				};

         var p = 	OYPKnackAPICall (headers,  apidata)	;     //write the line item
         plist.push (p);

     }

     Promise.all(plist)
          .then(result => {
              console.log('Promise.all', result);
              resolve ('createProjectTakeoffs successful');
          })
          .catch(err => {
              console.error('createProjectTakeoffs Promise.all error', err);
            //	resolve ('copyGoalRecords successful');
          });

	})
}
