//var api_url = 'https://api.knack.com/v1/scenes/';
var api_url = 'https://api.knack.com/v1/scenes/';
var api_urlpg = 'https://api.knack.com/v1/pages/';
var app_id = Knack.app.id;
var user = Knack.getUserToken();
var headers = { "Authorization": Knack.getUserToken(), "X-Knack-Application-ID": app_id, "Content-Type":"application/json"};
var headers2 = { "Content-Type":"application/json"};

//roles
var roles = {
  "Admin" : "object_7",
  "IFIAdmin" : "object_8",
  "IFICM" : "object_9",
  "Beacon" : "object_28"
}


//Views
var vw_goal_intervention_add	= 'view_485' ;
var vw_contact_note_add = 'view_272';
var vw_contact_note_edit = 'view_527';



// API Contact List Variables

var sc_contact_scene = 'scene_248'; //'views/view_442/records ;
var sc_api_client_docs = 'scene_188';
var vw_contact_list = 'view_442';
var vw_contact_add = 'view_446';
var vw_client_team_add = 'view_445';
var vw_client_team_list = 'view_449';
var vw_account_add = 'view_453';

var vw_client_referral_add = 'view_135' ;
var vw_client_edit = 'view_11';

var vw_goal_intervention_goalupdate = 'view_486' ;
var vw_goal_update = 'view_518'
var vw_irp_final = 'view_500' ;
var vw_goal_intervention_list = 'view_520' ;


// Contacts = Object_14
// 	Name = field 102



//---Insert Default Intake Document Records

var vw_client_dtls_intact_docs = 'view_323';
var vw_intact_docs_dflt_list = 'view_593';
var vw_intact_docs_add = 'view_319';

/* Intact Docs Fields List

178	= Client Intake Name
185 = Client
179 = Contact
180 = Document Template
181 = Intake Status
182 = Date Sent
185 = Date Received
187 = Image of File Received

*/

var teamMember = {};


var dbObjects = {
  "Contacts" : "object_14",
  "ClientTeam" :  "object_16",
  "Accounts" : "object_6",
  "Documents" :"object_19",
  "ClientIntakeDocuments" : "object_24",
  "Clients" : "object_1",
  "ClientStatusHistory" : "object_35",
  "ContactNotes" : "object_4",
  "ClientGoals" : "object_2",
  "ClientGoalInterventions" :  "object_25",
  "ClientIRPs" : "object_26" ,
  "Account" : "object_6" ,
  "ClientTeamMemberRoles" : "object_39",
  "AlertRules" : "object_38",
  "ClientEvents" : "object_40",
  "ClientContactReview" : "object_21",
  "ClientHistory": "object_43"
}



var dbClientTeamMemberRoles = {
  "role" : "field_365"
}

// Database Model

var dbClientEvents = {
  "Client" : "field_385",
  "AlertRule" : "field_380",
 "DateCreated" : "field_381",
 "NotificationDate" : "field_397",
 "TargetCompletionDate" : "field_382",
 "Status" : "field_384",
 "TaskClosedDate" : "field_383",
 "CaseManager" : "field_386",
 "Notes" : "field_387",
  "EmailTemplate" : "field_407"
}


var dbAlertRules = {
  "AlertRuleName" : "field_362",
  "Frequency" : "field_390",
  "CalendarColor" :"field_389",
  "Filters" : "field_378",
  "Notify" : "field_391",
  "tblObject":"field_394",
  "DateField" : "field_398",
  "NotificationDateInDays" : "field_395" ,
  "TargetCompletionDateInDays" : "field_399",
  "EmailTemplate" : "field_406",
  "ClientField" :"field_410"
}

var dbClients = {
  "ClientName":"field_2",
"CaseManager":"field_139",
"IsCaseManagerAssignmentTemporary" :"field_353",
"ReferredByTitle":"field_192",
"ReferredBy":"field_118",
"ReferredBy_raw":"field_118_raw",
"ReferrerPhone":"field_120",
"GuardianName":"field_122",
"ClientStatus":"field_75",
"ClientStatus_raw":"field_75_raw",
"ClientStatusNote":"field_328",
"BeaconStartDate":"field_277",
"BeaconEndDate":"field_278",
"AgeGroup" : "field_289",
"IntakeDocumentCount" : "field_374",
"BeaconCollaborationSummary" : "field_456",
"Address" : "field_3",
"MA" : "field_6",
"ID" : "field_243",
"Gender" : "field_7",
"DOB" : "field_167",
"ClientPhone" : "field_121",
"GuardianPhoneNumber" : "field_420",
"AXISI":"field_126",
"AXISII":"field_127",
"AXISIII":"field_130",
"AXISIV":"field_129",
"AXISVGAF":"field_131",
"Medications":"field_415",
"MaritalStatus":"field_416",
"EmploymentStatus":"field_417",
"IncomeSource":"field_418"


}

var arrClientHistory = [
{"key":"field_458" ,"label":"Client Name" } ,
{ "key" : "field_461", "label" : "Address"},
{ "key" : "field_462", "label" : "MA"},
{ "key" : "field_463", "label" : "ID"},
{ "key" : "field_464", "label" : "Gender"},
{ "key" : "field_465", "label" : "Referred By Title"},
{ "key" : "field_466", "label" : "Referred By"},
{ "key" : "field_467", "label" : "Referral Reason"},
{ "key" : "field_468", "label" : "Referrer Phone"},
{ "key" : "field_469", "label" : "DOB"},
{ "key" : "field_472", "label" : "Client Phone"},
{ "key" : "field_473", "label" : "Guardian Name"},
{ "key" : "field_474", "label" : "Guardian Phone Number"},
{ "key" : "field_475", "label" : "AXIS I"},
{ "key" : "field_476", "label" : "AXIS II"},
{ "key" : "field_477", "label" : "AXIS III"},
{ "key" : "field_478", "label" : "AXIS IV"},
{ "key" : "field_479", "label" : "AXIS V GAF"},
{ "key" : "field_482", "label" : "Medications"},
{ "key" : "field_483", "label" : "Marital Status"},
{ "key" : "field_484", "label" : "Employment Status"},
{ "key" : "field_485", "label" : "Income Source"}

] ;

var dbClientHistory = {
  "Client":"field_486",
"UpdatedBy":"field_487",
"UpdatedDateTime":"field_488",
"FieldsUpdated":"field_490",
"ClientName":"field_458",
"ClientStatus":"field_459",
"BeaconCollaborationSummary":"field_460",
"Address":"field_461",
"MA":"field_462",
"ID":"field_463",
"Gender":"field_464",
"ReferredByTitle":"field_465",
"ReferredBy":"field_466",
"ReferralReason":"field_467",
"ReferrerPhone":"field_468",
"DOB":"field_469",
"ClientPhone":"field_472",
"GuardianName":"field_473",
"GuardianPhoneNumber":"field_474",
"AXISI":"field_475",
"AXISII":"field_476",
"AXISIII":"field_477",
"AXISIV":"field_478",
"AXISVGAF":"field_479",
"Medications":"field_482",
"MaritalStatus":"field_483",
"EmploymentStatus":"field_484",
"IncomeSource":"field_485"
}

var dbClientStatusHistory = {
  "Client":"field_336",
  "StatusDate" : "field_337" ,
  "ClientStatus":"field_331",
  "ClientStatus_raw":"field_331_raw",
  "ClientStatusNote":"field_332",
  "BeaconStartDate":"field_333",
  "BeaconEndDate":"field_334",
  "Account":"field_335"

}

var dbClientIntakeDocuments = {
  "IntakeDocumentName" : "field_178" ,
  "Client" : "field_185" ,
  "DocumentTemplate" : "field_180" ,
  "DocumentTemplateFile" : "field_295" ,
  "ReceivedDocumentFile" : "field_296" ,
  "AssessmentLink" : "field_294" ,
  "IntakeStatus" : "field_181" ,
  "DateSent" : "field_182" ,
  "DateReceived" : "field_183" ,
  "ScannedImageFile" : "field_187" ,
  "ClientTeamMember" : "field_190",
  "SortOrder" : "field_377"
}

var dbDocuments = {
  "DocumentName" : "field_132" ,
  "DocumentType" : "field_135" ,
  "File" : "field_133" ,
  "DocumentLink" : "field_293" ,
  "RichText" : "field_237" ,
  "AdministratorsOnly" : "field_136" ,
  "DocumentCategory" : "field_176" ,
  "GeneralDocument" : "field_288",
  "SortOrder" : "field_376"
}



var dbContacts = {
  Name:"field_102",
  "Name_raw":"field_102_raw",
  "Email":"field_85",
"Gender":"field_86",
"Occupation":"field_87",
"Phone":"field_88",
"Birthday":"field_90",
"Address":"field_89",
"Notes":"field_91",
"Organizations":"field_100",
"ContactGroupType":"field_189"

} ;


var dbContactNotes = {
  "ContactNotedate":"field_452",
  "ContactDate" : "field_342" ,
  "MonthlyReportDate" :"field_451" ,
  "Client":"field_14",
  "Client_raw":"field_14_raw",
  "NoteType":"field_236",
  "MeetingStatus":"field_159",
  "ContactDateStart":"field_16",
  "ContactDateStart_raw": "field_16_raw",
  "ContactDateEnd":"field_234",
  "ContactDateEnd_raw":"field_234_raw",
  "CaseManager":"field_194",
  "CaseManager_raw":"field_194_raw",
  "VisitLocation":"field_109",
  "ReasonforContact":"field_19",
  "ClientIRP":"field_217",
  "IRPGoals":"field_15",
  "ClientGoalInterventions":"field_216",
  "ClientGoalInterventionText" : "field_371",
  "PersonsPresent":"field_110",
  "ClientResponses":"field_22",
  "PlanforNextVisit":"field_23",
  "OtherComment":"field_24",
  "MedicationChanges":"field_25",
  "CaseManagerSignature":"field_26",
  "NextVisitDate" : "field_338",
  "NextVisitDate_raw" : "field_338_raw",
  "PAReviewStatus" : "field_81",
  "PAReviewStatus_raw" : "field_81_raw",
  "ContactNoteStatus":"field_349",
  "ContactNoteStatus_raw":"field_349_raw",
  "ShowOnDashboard" : "field_158",
  "ShowOnDashboard_raw" : "field_158_raw",
  "RelatedContactNote" : "field_345" ,
  "RelatedContactNote_raw" : "field_345_raw",
  "ClientPresent" : "field_355",
  "AddlPersonsPresent":"field_364",
  "IRPNA":"field_372",
  "FinalizedDate" : "field_428" ,
  "OverrideExpireDate" : "field_427"
} ;


var dbClientTeamMembers = {
  "Contact":"field_105",
  "Contact_raw":"field_105_raw",
  "Role":"field_106",
  "Client":"field_196",
  "AssignmentInactiveDate" :"field_354",
  "ClientTeamRole" : "field_367",
  "ClientTeamRole_raw" : "field_367__raw"
};

var dbAccounts = {
  "Name" : "field_33",
  "Email" : "field_34" ,
  "Contact" : "field_195",
  "Contact_raw" : "field_195_raw"
} ;


var dbIRPs = {
  "Client" : "field_200",
  "ClientIRPName" : "field_199" ,
  "IRPCreateDate" : "field_201",
  "IRPStatus" : "field_220",
  "IRPDocumentStatus": "field_454",
  "CaseManagerSignature" : "field_225",
  "CaseManagerSignatureDate" : "field_226",
  "ClientSignature" : "field_221",
  "ClientSignatureDate" : "field_222"

} ;

var dbGoals = {
  "Interventions" : "field_233",
  "ClientIRP" : "field_214",
  "Objective" :"field_12"

} ;

var dbInterventions = {
  "ClientGoals" : "field_232",
  "ClientGoals_raw" : "field_232_raw"
};

//standard URLs

var urlClientTeamAdd = api_url + sc_contact_scene + '/views/' + vw_client_team_add + '/records/';
var urlContactAdd = api_url + sc_contact_scene + '/views/' + vw_contact_add + '/records';
var urlClientTeamList = api_url + sc_contact_scene + '/views/' + vw_client_team_list + '/records';
var urlAccountAdd = api_url + sc_contact_scene + '/views/' + vw_account_add + '/records';
var urlInterventionUpdate = api_url + sc_contact_scene + '/views/' + vw_goal_intervention_goalupdate + '/records';
var urlGoalUpdate = api_url + sc_contact_scene + '/views/' + vw_goal_update + '/records';
var urlInterventionList = api_url + sc_contact_scene + '/views/' + vw_goal_intervention_list + '/records';
