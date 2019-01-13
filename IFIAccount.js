/***********************************************************************************************************
Evaluate the new account record beng added
1. If this is a case manager, make sure they are also added as a contact
***********************************************************************************************************/


function evaluateNewAccount (event, view, record) {

try {
		var proc = "evaluateNewAccount";
    console.log (proc) ;

		var accountId = record.id  ;
    var roles = record["field_37_raw"] ;
    var contactId = record["field_195_raw"][0].id ;

    if ( roles.includes('IFI Case Manager') && contactId == undefined)
        addContactToCaseManager(record) ;


}
catch (e)  {
				logerror(proc, e);
		 }
}


function addContactToCaseManager (event, view, record) {
try {
		var proc = "evaluateNewAccount";
    console.log (proc) ;

		var accountId = record.id  ;
    var roles = record["field_37_raw"] ;
    var contactId = record["field_195_raw"][0].id ;

    if ( roles.includes('IFI Case Manager') && contactId == undefined)
        addContactToCaseManager(record) ;

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
