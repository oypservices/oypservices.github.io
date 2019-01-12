
var api_url = 'https://api.knack.com/v1/scenes/';
var api_urlpg = 'https://api.knack.com/v1/pages/';
var app_id = Knack.app.id;
var user = Knack.getUserToken();
var headers = { "Authorization": user, "X-Knack-Application-ID": app_id, "Content-Type":"application/json"};
var OYPAPIHeaders = { "X-Knack-Application-ID": app_id, "Content-Type":"application/json"};


//Views
var vw_notes	= [ 'view_54', 'view_13','view_133' ] ;




//standard URLs
/*
var urlClientTeamAdd = api_url + sc_contact_scene + '/views/' + vw_client_team_add + '/records/';
var urlContactAdd = api_url + sc_contact_scene + '/views/' + vw_contact_add + '/records';
var urlClientTeamList = api_url + sc_contact_scene + '/views/' + vw_client_team_list + '/records';
var urlAccountAdd = api_url + sc_contact_scene + '/views/' + vw_account_add + '/records';
var urlInterventionUpdate = api_url + sc_contact_scene + '/views/' + vw_goal_intervention_goalupdate + '/records';
var urlGoalUpdate = api_url + sc_contact_scene + '/views/' + vw_goal_update + '/records';
var urlInterventionList = api_url + sc_contact_scene + '/views/' + vw_goal_intervention_list + '/records';
*/
