
/**************************************************************************************
 For each new contact to contact link, add the link to the respective contact records
***************************************************************************************/


function addContactRelationships (event, view, record)  {
try {

    var viewName = view["key"] ;
    var objContactLink = Knack.models[viewName].toJSON();
    console.dir (objContactLink);

    var linkId = objContactLink.id;


    var contactKey =  getFieldKey(dbContacttoContactLinks, "Contact") + "_raw";
    var contactLinkedKey =  getFieldKey(dbContacttoContactLinks, "Linked Contact") + "_raw";

    console.log (contactKey) ;
    console.log (contactLinkedKey) ;

    var contactId =  objContactLink[contactKey][0].id;
    console.log (contactId);

    var linkedContactid = objContactLink[contactLinkedKey][0].id  ;
    console.log  (linkedContactid) ;

    console.log (linkId) ;

    var contact =  [ contactId, linkedContactid] ;
    console.dir (contact) ;

    for (n = 0 ; n < contact.length ; n++) {
        addEachRelationship ( contact[n],  linkId) ;

    }
 }
 catch (e) {
          logerror (e);
        }
 }

/**************************************************************************************
Retrieve the contact and add the link - this proc is called for each relationship


***************************************************************************************/
function addEachRelationship(contact, linkId)
{
    try {

        var apidata = {
              "method": "get",
              "knackobj": dbContacts.key,
              "appid": app_id,
              "id" : contact
              };

        OYPKnackAPICall (headers,  apidata)
                .then (result => {

                    console.dir (result) ;
                    if ( result == undefined)
                       return ;

                    apidata.record = {};

                    var linkedContacts = [];
                    if (result.field_258_raw == undefined)
                        linkedContacts = [ linkId ]     ;
                    else  {
                      for (var n = 0; n < result.field_258_raw.length ; n++ )
                          linkedContacts.push ( result.field_258_raw[n].id ) ;

                      linkedContacts.push ( linkId ) ;
                    }

                    console.dir (linkedContacts) ;
                    apidata.record.field_258 = linkedContacts;

                    apidata.method = "put" ;
                    console.dir (apidata) ;
                    OYPKnackAPICall (headers,  apidata) ;
                });
        }
   catch (e) {
      logerror (e);
    }
}
