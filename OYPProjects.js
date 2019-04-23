/***********************************************************************************************************
***********************************************************************************************************/


function addDefaultJobPhases (event, view, record)  {

try {

    logMsg("Started") ;

    var viewName = view["key"] ;
    var objProjects  = Knack.models[viewName].toJSON();
    console.dir (objProjects);
    var projectId = objProjects.id ;

    var projectTypeKey = objProjects [ getFieldKey(dbProjects, "Project Type") + "_raw" ];
    var projectType = objProjects [ projectTypeKey];

    var projectSubTypeKey =  objProjects [getFieldKey(dbProjects, "Project Sub Type") + "_raw" ] ;
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
                        "field_411" : prodGroupRec.id ,
                        "field_442" : n + 1
         }


         var apidata = {
    								 "method": "post",
    								 "knackobj": getObjectKey("Project Detail Items"),
    								 "appid": app_id,
    								 "record": record
    				};

         var p = 	OYPKnackAPICall (headers,  apidata)	;     //write the line item
         plist.push (p);

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
