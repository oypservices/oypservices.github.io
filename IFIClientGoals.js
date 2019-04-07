
/****************************************************************************************************
	Force an IRP update for calculation purposes
****************************************************************************************************/
function updateIRPName (event, view, record) {

	return new Promise ((resolve, reject) => {

	   var proc = "updateIRPName" ;
		 console.log ( proc) ;

		 var IRPId = record.id ;
		 var IRPName = record.field_413 ;
		 var IRP = {"field_199":IRPName} ;

//		 IRP[dbIRPs.IRPCreateDate] = getToday();
//		 IRP[dbIRPs.IRPStatus] = "Update" ;


		 var apidata = {
						"method": "put",
						"knackobj": dbObjects.ClientIRPs,
						"appid": app_id,
						"id" : IRPId ,
						"record" : IRP
					};

			OYPKnackAPICall (headers,  apidata)
			    .then ( result => {
							console.dir (result);
							resolve (result) ;
					}	)

	})
}


/***********************************************************************************************************
copying an IRP is a multistep process
1. Copy the IRP records
2. Copy the dbGoals
3. Copy the interventions linked to the dbGoals
4. Sync the interventions nested with the goal record itself
***********************************************************************************************************/


function copyIRP (event, view, record) {

try {
		var proc = "copyIRP";


		var IRPId = record.id  ;
		console.log (IRPId);

		var apidata = {
						"method": "get",
						"format" : "raw" ,
						"knackobj": dbObjects.ClientIRPs,
						"appid": app_id,
						"id" : IRPId
					};

		OYPKnackAPICall (headers,  apidata)
		.then (resultIRP => { return copyIRPRecord(resultIRP) ; })
		.then (resultNewIRP => { return copyGoalRecords(IRPId, resultNewIRP); })
		.then ( result => {
						window.location.href =  $(".kn-back-link a").attr("href");   } );

}
catch (e)  {
				logerror(proc, e);
		 }
}




/****************************************************************************************************
	Create a new IRP record based on the existing
****************************************************************************************************/
function copyIRPRecord (IRP) {

	return new Promise ((resolve, reject) => {

	   var proc = "copyIRPRecord" ;
		 console.log ( proc) ;
		 console.log (IRP) ;

		 delete (IRP.id) ;
		 delete (IRP[dbIRPs.IRPCreateDate] ) ;
		 delete (IRP[dbIRPs.CaseManagerSignature]) ;
		 delete (IRP[dbIRPs.CaseManagerSignatureDate]) ;
		 delete (IRP[dbIRPs.ClientSignature]) ;
		 delete (IRP[dbIRPs.ClientSignatureDate]) ;

		 IRP[dbIRPs.IRPCreateDate] = getToday();
		 IRP[dbIRPs.IRPStatus] = "Update" ;
		 IRP[dbIRPs.IRPDocumentStatus] = "Draft";

		 var client = IRP["field_448"];
		 var IRPName = client + ' IRP As of ' + IRP[dbIRPs.IRPCreateDate] ;
		 IRP["field_199"] = IRPName ;

		 var apidata = {
						"method": "post",
						"knackobj": dbObjects.ClientIRPs,
						"appid": app_id,
						"record" : IRP
					};

			OYPKnackAPICall (headers,  apidata)
			    .then ( result => {
							console.dir (result);
							resolve (result) ;
					}	)

	})
}



/********************************************************************************************************************
Copy the Goal records
*********************************************************************************************************************/

function copyGoalRecords (IRPId, resultNewIRP) {

	return new Promise ((resolve, reject) => {

	   var proc = "copyGoalRecords" ;
		 console.log ( proc) ;

		 var newIRPId = resultNewIRP.id ;

		 // get the list of goals
		 var apidata = {
								 "method": "get",
								 "format" : "raw" ,
								 "knackobj": dbObjects.ClientGoals,
								 "appid": app_id,
								 "filters": [ {
										 "field" : dbGoals.ClientIRP ,
										 "operator":"is",
										 "value": IRPId
									 } ]
				};

      var thisGoalId = "" ;

			OYPKnackAPICall (headers,  apidata)				//get the list of goals
			    .then ( result => {

						console.dir (result);

						var plist = [] ;
						for (var n = 0; n < result.records.length; n++ )
						{

									var record = result.records[n];
									var currentGoalId = record.id;
							//		thisGoalId = result.records[n].id ;
			   	  			delete (record[dbGoals.ClientIRP]);
			 	  				record[dbGoals.ClientIRP] = newIRPId;

								 var p = 	postGoalRecord (currentGoalId, record) ;
								 plist.push (p);

						//			   .then (  result=> { console.dir  (result) ;
							//			 										 resolve (result) ; }) ;


							}

							Promise.all(plist)
									.then(result => {
									    console.log('Promise.all', result);
											resolve ('copyGoalRecords successful');
									})
									.catch(err => {
									    console.error('Promise.all error', err);
										//	resolve ('copyGoalRecords successful');
									});




						})
	})
}

	function postGoalRecord (currentGoalId, record) 	{

		return new Promise ((resolve, reject) => {

			console.log (currentGoalId);
			delete (record.id) ;

			var postapidata = {
						"method": "post",
						"knackobj": dbObjects.ClientGoals,
						"appid": app_id,
						"record" : record
					};

			OYPKnackAPICall (headers,  postapidata ) //post the new goal
				 .then ( resultNewGoal => {
								console.log (currentGoalId);
							resolve ( getInterventionRecords (currentGoalId, resultNewGoal) );
						 } ) ;


  });

}

 /*******************************************************************************************************************
  get intervention records
	*******************************************************************************************************************/

	function getInterventionRecords (goalId, resultNewGoal) 	{

		return new Promise ((resolve, reject) => {
			var proc = "getInterventionRecords" ;
		 console.log ( proc) ;
		 	 console.log (goalId) ;
			 console.dir (resultNewGoal) ;

		 var newGoalId = resultNewGoal.id ;

		 // get the list of goals
		 var apidata = {
								 "method": "get",
								 "format" : "raw" ,
								 "knackobj": dbObjects.ClientGoalInterventions,
								 "appid": app_id,
								 "filters": [ {
										 "field" : dbInterventions.ClientGoals ,
										 "operator":"is",
										 "value": goalId
									 } ]
				};

			OYPKnackAPICall (headers,  apidata)
					.then ( result => {

											 var plist = [];

									     for (n = 0 ; n < result.records.length; n++) {
												   var p = copySingleInterventionRecord (newGoalId, result.records[n]) ;
													 plist.push (p) ;
												//	 	   . then (result => {
												//				 					 console.dir (result);
												//			 					   resolve (result ); }) ;
											 }

											 Promise.all(plist)
													 .then(result => {
															 console.log('Promise.all intervention', result);
															 resolve ('copyGoalRecords successful');
													 })
													 .catch(err => {
															 console.error('Promise.all intervention error', err);
														 //	resolve ('copyGoalRecords successful');
													 });

										 })
								})
}

/***********************************************************************************************************
Copy Signle Intervention Record
***********************************************************************************************************/
function copySingleInterventionRecord (newGoalId, recordINV ) {

	return new Promise ((resolve, reject) => {
		var proc = "copySingleInterventionRecord" ;
 	 console.log ( proc) ;

 	   if (recordINV == undefined )
		 	   return ;

 		 delete (recordINV.id) ;
 		 recordINV[dbInterventions.ClientGoals ] = newGoalId;

 		 	var postapidata = {
 						"method": "post",
 						"knackobj": dbObjects.ClientGoalInterventions,
 						"appid": app_id,
 						"record" : recordINV
 				};

			console.dir (postapidata);
 			OYPKnackAPICall (headers,  postapidata)
						.then ( result => {  console.dir (result) ;
															   resolve ( result) ; })

 				})
}

/*******************************************************************************************************
 logStatusChanges every time the client record is updated, if needed
*******************************************************************************************************/




function checkIRPSignatures (event, view, recordClient) {
try {

    console.log ("checkIRPSignatures");
    var viewName = view["key"] ;
    var objIRP = Knack.models[viewName].toJSON();

    console.dir (objIRP);

		var irpID = objIRP.id;
    var clientId = objIRP[dbIRPs.Client + "_raw"][0].id;
    var clientName = objIRP[dbIRPs.Client + "_raw"][0].identifier;
		var clientIRPName = objIRP[dbIRPs.ClientIRPName] ;
		var irpDocumentStatus = objIRP[dbIRPs.IRPDocumentStatus] ;

		if (irpDocumentStatus != "Signatures Needed")
			 return ;

		getRecordById (dbObjects.Clients, clientId) //get the client record
			.then (resultClient => {
								console.dir (resultClient);
								var caseManager = resultClient[dbClients.CaseManager][0] ;
								if (caseManager != undefined)
									 return getRecordById (dbObjects.Accounts, caseManager.id )  //get the case manager account record

						})
			.then ( resultAccount => {

						  if (resultAccount == undefined)
								 return ;

							console.dir (resultAccount);
							var caseManagerEmail = resultAccount [dbAccounts.Email] ;
							if (caseManagerEmail.email == undefined)
								 return ;


							url = "https://www.oypapp.com/ifi-staff-portal.html#clients/edit-client2/{{clientId}}/new-page/{{clientId}}/view-client-irp/{{irpId}}/";
							url = url.replace("{{clientId}}", clientId) ;
							url = url.replace("{{irpId}}", irpID) ;

							var msg = {} ;
              msg.to = ['vanessa@oypservices.com', 'brian@oypservices.com' ];
              msg.subject = clientName + ' - IRP Signatures Need for (Test) ' + clientName;
              msg.html = "Client and Case Manager Signatures are needed for IRP -  " ;
							msg.html = msg.html + "<a href='" + url + "'>" + clientIRPName + "</a>" ;
			//				msg.html = msg.html + "<br/><br/> https://www.oypapp.com/ifi-staff-portal.html" ;
							msg.html = msg.html + "<br/><br/> " + caseManagerEmail.email ;
              msg.from = "info@ifi-md.org" ;

              OYPAPISendMail(headers, msg) ;

			})


    }
  catch (e)
    {
      logerror ("checkIRPSignatures", e);
    }

}
