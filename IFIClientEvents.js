
/*

const arr = [{
  id: 19,
  cost: 400,
  name: "Arkansas",
  height: 198,
  weight: 35
}, {
  id: 21,
  cost: 250,
  name: "Blofeld",
  height: 216,
  weight: 54
}, {
  id: 38,
  cost: 450,
  name: "Gollum",
  height: 147,
  weight: 22
}];

console.log(arr.some(item => item.name === 'Blofeld'));
console.log(arr.some(item => item.name === 'Blofeld2'));

// search for object using lodash
const objToFind1 = {
  id: 21,
  cost: 250,
  name: "Blofeld",
  height: 216,
  weight: 54
};
const objToFind2 = {
  id: 211,
  cost: 250,
  name: "Blofeld",
  height: 216,
  weight: 54
};
console.log(arr.some(item => _.isEqual(item, objToFind1)));
console.log(arr.some(item => _.isEqual(item, objToFind2)));
*/

function applyFilters ( tblObject, filters ) {

	filters = JSON.stringify(filters);
	for ( var n = 0  ; n < filters.conditions.length ; n++) {
		var cond = filters.conditions[n];

		 	 return false ;
		switch (cond.value) {
			case "=" :
				if  (tblObject[ cond.key ] != cond.value)
					return false ;
				break ;

			case "!=" :
				if  (tblObject[ cond.key ] == cond.value)
					return false ;
				break;

			default:
			   break ;
		}
	}
	return true ;
}


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

		var objToFind2 = {
		    "conditions" : [{"key" : "field_6",
				 "value" :  "abc",
				 "operation" : "="}]

		};


		var apidata = {
						"method": "get",
						"format" : "raw" ,
						"knackobj": dbObjects.AlertRules,
						"appid": app_id,
						"filters": [ {
								"field" : dbAlertRules.tblObject ,
								"operator":"is",
								"value": tblObject
							} ]
					};

		OYPKnackAPICall (headers,  apidata)
		.then (resultAlerts => {
			   return processAlerts(resultAlerts, record) ;
				 //resolve ("complete");
		})
	//	.catch (err => { reject (err)  ;})

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
		 var ClientId = record.id ;


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


 					var recordAlert = resultAlerts.records[n];
					var dateField = recordAlert[dbAlertRules.DateField] ;
					var notifyInterval = recordAlert[dbAlertRules.NotificationDateInDays] ;
					var filters = recordAlert[dbAlertRules.Filters] ;

					if ( filters != undefined) {
 						if (applyFilters (record, filters ) )
							 continue ;
					}

					var targetCompleteInterval = recordAlert[dbAlertRules.TargetCompletionDateInDays] ;
					if (targetCompleteInterval == undefined)
					    targetCompleteInterval = 0 ;

					var dateFieldValue = record[dateField] ;
					if (dateFieldValue != undefined) {
							console.log (dateFieldValue) ;

							var dateTrigger = new Date(dateFieldValue);   //Convert text to date
							var dateNotify = new Date (dateTrigger) ;
							var dateTargetComplete = new Date (dateTrigger);

							var dateNotify = dateNotify.setDate(dateNotify.getDate() + Number(notifyInterval));
							dateTargetComplete.setDate(dateTargetComplete.getDate() + Number(targetCompleteInterval));
							console.log (dateNotify) ;

							recordAlert["NotificationDate"] = dateNotify;
							recordAlert["TargetCompletionDate"] = dateTargetComplete;

							var p = postClientEventRecord (ClientId, recordAlert) ;
							plist.push(p) ;
					}


				//	var date = new Date(dateFieldValue);
			  //




 				//	record[dbGoals.ClientIRP] = newIRPId;

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

	function postClientEventRecord (ClientId, recordAlert) 	{

		return new Promise ((resolve, reject) => {

		var record = {
			"field_385" : ClientId ,
		  "field_380" : [recordAlert.id ] ,   // "AlertRule"
		  "field_397" : recordAlert["NotificationDate"] ,
		  "field_382" : recordAlert["TargetCompletionDate"] ,
//		  "field_386" : "CaseManager" ,
		  "field_407" :  recordAlert [dbAlertRules.EmailTemplate]//  "EmailTemplate"
		}

   var apiClientEvent = {
							 "method": "get",
							 "format" : "raw" ,
							 "knackobj": dbObjects.ClientEvents,
							 "appid": app_id,
							 "filters": { "match": "and",
								 "rules" : [ {
													 "field": dbClientEvents.AlertRule,
													 "operator":"is",
													 "value": recordAlert.id
												 },
												 { "field": dbClientEvents.NotificationDate,
												 "operator":"is",
												 "value": recordAlert["NotificationDate"]
											 }]
									 }
			};


			console.dir (apiClientEvent);


			OYPKnackAPICall (headers,  apiClientEvent ) //post the new goal
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
								console.dir (postapidata) ;

							  OYPKnackAPICall (headers,  postapidata )
								   .then ( resultPost => { resolve (resultPost); })
									 .catch (err => { reject (err) })

							}


							resolve ( "Client Event already exists");


						 } )
				 .catch (err => { reject (err) ; });


  });

}
