/***********************************************************************************************************
Retrieve the alert rule based on the object.  If an upcoming alert matches a criteria, add a client event if
it does not already exist
***********************************************************************************************************/


function getAlertRules (event, view, record) {

try {
		var proc = "getAlertRules";
		console.log (proc) ;


		var tblObjectId = record.id  ;
		var tblObject = view.source.object ;

		console.log (tblObject);
		console.log (tblObjectId) ;

		var apidata = {
						"method": "get",
						"format" : "raw" , 
						"knackobj": dbObjects.AlertRules,
						"appid": app_id,
						"filters": [ {
								"field" : dbAlertRules.Object ,
								"operator":"is",
								"value": tblObject
							} ]
					};

		OYPKnackAPICall (headers,  apidata)
		.then (resultAlerts => { resolve( processAlerts(resultAlerts, record) ) ; })
		.catch (err => { reject (err)  ;})

}
catch (e)  {
				logerror(proc, e);
		 }
}



/********************************************************************************************************************
Process Alterts
*********************************************************************************************************************/

function processAlerts(resultAlerts, record) {

	return new Promise ((resolve, reject) => {

	   var proc = "processAlerts" ;
		 var plist = [] ;
		 console.log ( proc) ;


 		for (var n = 0; n < resultAlerts.records.length; n++ )
 		{

/*
				var dbAlertRules = {
				  "AlertRuleName" : "field_362",
				  "Frequency" : "field_390",
				  "CalendarColor" :"field_389",
				  "Filter" : "field_378",
				  "Notify" : "field_391",
				  "tblObject":"field_394",
				  "DateField" : "field_398",
				  "NotificationDateInDays" : "field_395" ,
				  "TargetCompletionDateInDays" : "field_399",
				  "EmailTemplate" : "field_406"
				}
*/


 					var recordAlert = result.records[n];
					var dateField = recordAlert[dbAlertRules.DateField] ;
					var notifyInterval = recordAlert[dbAlertRules.NotificationDateInDays] ;
					var targetCompleteInterval = recordAlert[dbAlertRules.TargetCompletionDateInDays] ;
					var dateFieldValue = reord[dateField].date ;

					var date = new Date(tt);
			    var dateNotify = new Date(date);

			    dateNotify.setDate(dateFieldValue.getDate() + notifyInterval);
					console.log (dateNotify) ;


 					record[dbGoals.ClientIRP] = newIRPId;

 	//			 var p = 	postClientEventRecord (ClientId, record) ;
 		//		 plist.push (p);

 			}
 /*
 			Promise.all(plist)
 					.then(result => {
 							console.log('Promise.all', result);
 							resolve ('copyGoalRecords successful');
 					})
 					.catch(err => {
 							console.error('Promise.all error', err);
 						//	resolve ('copyGoalRecords successful');
 					});
*/
					resolve ('copyGoalRecords successful');

	})
}


/********************************************************************************************************************
Create Client Event Record (if it does not already exists)
*********************************************************************************************************************/

	function postClientEventRecord (ClientId, record) 	{

		return new Promise ((resolve, reject) => {

		var record = {
			"field_385" : ClientId ,
		  "field_380" : [record.id ] ,   // "AlertRule"
		  "field_397" : record["NotificationDate"] ,
		  "field_382" : record["TargetCompletionDate"] ,
//		  "field_386" : "CaseManager" ,
		  "field_407" : record [dbAlertRules.EmailTemplate][0].id //  "EmailTemplate"
		}

   var getClientEvent =  = {
							 "method": "get",
							 "format" : "raw" ,
							 "knackobj": dbObjects.ClientEvents,
							 "appid": app_id,
							 "filters": { "match": "and",
								 "rules" : [ {
													 "field": dbClientEvents.AlertRule,
													 "operator":"is",
													 "value": record.id
												 },
												 { "field": dbClientEvents.NotificationDate,
												 "operator":"is",
												 "value": record["NotificationDate"]
											 }]
									 }
			};


			console.log (currentGoalId);
			delete (record.id) ;

			var postapidata = {
						"method": "post",
						"knackobj": dbObjects.ClientEvents,
						"appid": app_id,
						"record" : record
					};

			OYPKnackAPICall (headers,  getClientEvent ) //post the new goal
				 .then ( resultClientEvent => {
							console.log (resultClientEvent);
							if (resultClientEvent.records.length == 0)
							{
								var postapidata = {
											"method": "post",
											"knackobj": dbObjects.ClientEvents ,
											"appid": app_id,
											"record":  record
										};

							  OYPKnackAPICall (headers,  postapidata )
								   .then ( result => { resolve (result); })
									 .catch (err => { reject {err}; })

							}


							resolve ( "Client Event already exists"  ;);


						 } )
				 .catch (err => { reject (err) ; });


  });

}
