function addDefaultClientTeam (event, view, recordClient) {
try {

    var viewName = view["key"] ;
    var clientId = Knack.models[viewName].toJSON().id ;


    var resource = 'knackobject';
    var getapidata =  {
      "method": "get",
      "knackobj": dbObjects.ClientTeam,
      "appid": app_id ,
      "filters": [ {
          "field":dbClientTeamMembers.Client ,
          "operator":"is",
          "value": clientId
        }
      ]
    }

    console.dir (getapidata);

    OYPServicesAPIPost( resource, headers, getapidata )
      .then (resultCientTeam=> {InspectClientTeamRoles(resultCientTeam, viewName) } ) ;

    }
  catch (e)
    {
      console.error(e);
      console.error(e.stack) ;
    }



}

/*********************************************************************************
Inspect the roles on the client team to determine if new default contacts need
to be added
**********************************************************************************/

function InspectClientTeamRoles(resultCientTeam, viewName) {

  try
    {

      var prevTherapistContactId = -1;

      var cmClientAssign = [] ;

      var prevCMContactId = -1;
      var prevCMClientTeamId = -1;

      var bTherapistRole = false;
      var bProgramDirectRole = false ;
      var bCaseManagerRole = false ;
      var bRehabSpecRole = false ;

      var clientId = Knack.models[viewName].toJSON().id ;


      console.log (clientId) ;
      console.log (viewName) ;
    	console.dir (resultCientTeam);

      console.dir (resultCientTeam.records.length);
      for (var i = 0; i < resultCientTeam.records.length; i++) {

        role = resultCientTeam.records[i][dbClientTeamMembers.Role] ;
        console.log (role) ;

        if (role == "Therapist")
            bTherapistRole = true;

        if (role == "Program Director")
           bProgramDirectRole = true ;

         if (role == "Case Manager")
         {
           bCaseManagerRole = true ;
           var teamAssign = {} ;
           teamAssign.ContactId = resultCientTeam.records[i][dbClientTeamMembers.Contact_raw][0].id ;
           teamAssign.ClientTeamId = resultCientTeam.records[i].id ;
           teamAssign.InactiveDate = resultCientTeam.records[i][dbClientTeamMembers.AssignmentInactiveDate] ;
           teamAssign.Role = role ;
           cmClientAssign.push (teamAssign) ;

         }

         if (role == "Rehabilitation Specialist")
            bRehabSpecRole = true ;
      }

      if (!bProgramDirectRole) {
          teamMember = {
                "Name" : 'Shavon Neal' ,
                "Name_raw" : { "first": "Shavon", "last" : "Neal"} ,
                "Role" : "Program Director" ,
                "clientId" : clientId  } ;

          contactid = findContact (teamMember) ;
          console.log (contactid);
        }

        if (!bTherapistRole) {
              teamMember = {
                    "Name" : Knack.models[viewName].toJSON()[dbClients.ReferredBy] ,
                    "Name_raw" : Knack.models[viewName].toJSON()[dbClients.ReferredBy_raw] ,
                    "Role" : "Therapist" ,
                    "clientId" : clientId ,
                    "Phone" : Knack.models[viewName].toJSON()[dbClients.ReferrerPhone]  } ;


              contactid = findContact (teamMember) ;
              console.log (contactid);
        }


        if (!bRehabSpecRole) {
            teamMember = {
                  "Name" : 'LaVon MacGruder' ,
                  "Name_raw" : { "first": "LaVon", "last" : "MacGruder"} ,
                  "Role" : "Rehabilitation Specialist" ,
                  "clientId" : clientId };

             contactid = findContact (teamMember) ;
             console.log (contactid);

        }

        if (bCaseManagerRole) {

          /* Case Manager Role does exist. check to see if it changed and if the change is temporary */

            teamMember = {
                    "Name" : "",
                    "Name_raw" : { "first": "", "last" : ""} ,
                    "Accountid" : Knack.models[viewName].toJSON()[dbClients.CaseManager + "_raw"] ,
                    "IsCaseManagerAssignmentTemporary" : Knack.models[viewName].toJSON()[dbClients.IsCaseManagerAssignmentTemporary],
                    "prevAssign" : cmClientAssign,
                    "Role" : "Case Manager" ,
                    "clientId" : clientId  } ;

            console.log (JSON.stringify(teamMember)) ;

            contactid = findContactByAccountid (teamMember) ;
            console.log (contactid);
       }

        if (!bCaseManagerRole) {

          /* Case Manager Role does not currently exist */
            teamMember = {
                    "Name" : "",
                    "Name_raw" : { "first": "", "last" : ""} ,
                    "Accountid" : Knack.models[viewName].toJSON()[dbClients.CaseManager + "_raw"] ,
                    "IsCaseManagerAssignmentTemporary" : Knack.models[viewName].toJSON()[dbClients.IsCaseManagerAssignmentTemporary],
                    "Role" : "Case Manager" ,
                    "clientId" : clientId  } ;

            console.log (JSON.stringify(teamMember)) ;

            contactid = findContactByAccountid (teamMember) ;
            console.log (contactid);
       }

  }
catch (e)
  {
    console.error(e);
    console.error(e.stack) ;
  }

}

/*********************************************************************************
find and add contacts to client team
**********************************************************************************/

function findContact (teamMember) {

  try {

  var contactid = "" ;
  var resource = 'knackobject';

  //Get the template from the api table
  var getapidata =
  {
    "method": "get",
    "knackobj": dbObjects.Contacts,
    "appid": app_id ,
    "filters": [
      // Filter for records with a value for this field in the last three months
      {
        "field":dbContacts.Name,
        "operator":"contains",
        "value": teamMember.Name
      }
    ]
  }

  console.dir (getapidata);

  OYPServicesAPIPost( resource, headers, getapidata )
    .then (resultContact=> {
        contactid = AddContacttoTeam(resultContact, teamMember);
        return contactid;
  }) ;

}
catch (e)
  {
    console.error(e);
    console.error(e.stack) ;
  }

}

/******************************************************************************************************
 Add the contact to the team.  May require that that contact be added as a contat first
*******************************************************************************************************/

function AddContacttoTeam (resultContact, teamMember) {

try {

   var contactid = "" ;

    switch (resultContact.records.length ){
      case 0: //contact not found
          var resource = 'knackobject';
          console.log ("contact not found " + JSON.stringify( teamMember.Name)) ;

          var postapidata = {
                "method": "post",
                "knackobj": dbObjects.Contacts ,
                "appid": app_id,
                "record":  {
                    "field_102": teamMember.Name_raw }
              };

            OYPServicesAPIPost( resource, headers, postapidata )
                  .then (resultNewContact=> {

                    console.dir(resultNewContact);
                    console.log('Contact Added!!!');
                    contactid = resultNewContact.record.id ;
                    console.log (contactid) ;
                    addClientTeamMember (contactid, teamMember.Role, teamMember.clientId);

                  } ) ;

        break;
      case 1: // contact found
        contactid = resultContact.records[0].id ;
        console.log (contactid) ;
        addClientTeamMember (contactid, teamMember.Role, teamMember.clientId);
        break ;
      default: //multiple contacts found
        console.log ("multiple contacts found, no action taken");

    }
  }
  catch (e)
    {
      console.error(e);
      console.error(e.stack) ;
    }


}


/*************************************************************************************************
  Add a Client Team Member to the specified client
***************************************************************************************************/

function addClientTeamMember (contactid, role, clientId) {

  try
  {

  console.log ('Ready to add contact ' + contactid + ' for client ' + clientId + ' as a ' + role );

  if (contactid === undefined) {
    console.log ("Cannot added Client Team Member contactid is undefined") ;
    return ;
  }

   if (clientId === undefined) {
    console.log ("Cannot added Client Team Member clientId is undefined") ;
    return ;
  }

 if (role === undefined) {
    console.log ("Cannot added Client Team Member role is undefined") ;
    return ;
  }

  var resource = 'knackobject';
  console.log ("contact not found " + JSON.stringify( teamMember.Name)) ;

  var postapidata = {
        "method": "post",
        "knackobj": dbObjects.ClientTeam ,
        "appid": app_id,
        "record":  {
            field_105: contactid,
            field_106: role ,
            field_196: clientId }
      };

    OYPServicesAPIPost( resource, headers, postapidata )
      .then (resultNewTeamMember=> {

        console.dir (resultNewTeamMember) ;
        console.log('Client Team Member Added!!!');
      }) ;

  return true;

}
catch (e)
  {
    console.error(e);
    console.error(e.stack) ;
  }



}

/*************************************************************************************************
 Case managers contact records are linked to Account Record. Retrieve the contact id from the
 account record. Then insert the client team member using that contact id.
 ************************************************************************************************/

function findContactByAccountid (teamMember) {

try {

  var contactid = "" ;
  var bContactFound = false;

  if (teamMember.Accountid === undefined) {
    console.log ("AccountID Field is undefined") ;
    return ;
  }

  if (teamMember.Accountid[0].id === undefined) {
    console.log ("AccountID Field is not selected") ;
    return ;
  }


  var resource = 'knackobject';
  var getapidata =  {
    "method": "get",
    "knackobj": dbObjects.Accounts,
    "appid": app_id ,
    "filters": [ {
        "field":"id" ,
        "operator":"is",
        "value": teamMember.Accountid[0].id
      }
    ]
  }

  console.dir (getapidata);

  OYPServicesAPIPost( resource, headers, getapidata )
    .then (resultAccount=> {

        console.dir(resultAccount) ;
        if (resultAccount.records.length == 0 ) {
            console.log ("Account Not Found") ;
            return 0;
        }

        contactid = resultAccount.records[0][dbAccounts.Contact_raw][0].id ;

        if (teamMember.IsCaseManagerAssignmentTemporary == 'Yes' ) {
          for (var n = 0 ; n < teamMember.prevAssign.length ; n++)  {
              var prevAssign = teamMember.prevAssign[n] ;
              console.dir (prevAssign) ;
              if (  contactid ==  prevAssign.ContactId ) {
                    prevAssign.InactiveDate = "" ;
                    updateTeamAssignmennt (prevAssign) ;
                    bContactFound = true ;
                    return ;
                  }


              }
        }
        else {
          for (var n = 0 ; n < teamMember.prevAssign.length; n++)  {
              var prevAssign = teamMember.prevAssign[n] ;
              console.dir (prevAssign) ;
              if (  contactid ==  prevAssign.ContactId ) {
                   bContactFound = true ;
                   prevAssign.InactiveDate = "" ;
                   updateTeamAssignmennt (prevAssign) ;
              }
              else
                if (prevAssign.InactiveDate == "")
                {
                  prevAssign.InactiveDate =  {"date" : getToday()} ;
                  updateTeamAssignmennt (prevAssign) ;
                }
           }
        }

        if (!bContactFound ) {
          console.log (contactid) ;
          addClientTeamMember (contactid, teamMember.Role, teamMember.clientId);
        }

      return contactid;

    });
}
catch (e)
  {
    console.error(e);
    console.error(e.stack) ;
  }

function updateTeamAssignmennt (prevAssign) {
  try {

      var proc = "updateTeamAssignmennt" ;
      console.log (proc);

      var postapidata = {
            "method": "put",
            "knackobj": dbObjects.ClientTeam ,
            "appid": app_id,
            "id" : prevAssign.ClientTeamId ,
            "record":  {
                field_354: prevAssign.InactiveDate }
        };


      console.dir (postapidata);

      OYPKnackAPICall( headers, postapidata ) ;

      }
    catch (e)
      {
        console.error(e);
        console.error(e.stack) ;
      }

  }


}
