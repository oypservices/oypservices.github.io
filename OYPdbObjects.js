
/*******************************************************************************************************
 logStatusChanges every time the client record is updated, if needed
*******************************************************************************************************/
function hideFormFields(view, dbObject, filterfield,  key) {

    try {

        console.dir (dbObject);
        logObject(dbObject) ;
         var conditionalFields = dbObject.conditionalDisplayFields ;
         logObject (conditionalFields);

         if ( conditionalFields == undefined ) {
             logMsg (dbObject["name"] + " conditionalFields property not defined ") ;
             return ;
         }

         var bfound = false ;


         //find the right list based on the field
         for (var n = 0 ; n < conditionalFields.length; n++ ) {
             if (conditionalFields[n].key == filterfield ) {
                conditionalFields = conditionalFields[n].fieldlist ;
                bfound = true ;
                break ;
              }
         }

         //set all list to not visible, so that the selected list can be processed last
          var nSelIndex = -1 ;
          for (var n =0; n < conditionalFields.length; n++ ) {

              var bShow = false
              if ( conditionalFields[n].key == key )
                 nSelIndex = n ;

              logMsg(bShow) ;

                // If this value in the form doesn't equal "SpecificValue" then prevent the form from submitting
              var fields = conditionalFields[n].fields ;
              if (fields == undefined)
                 break ;

              for (var i =0; i < fields.length ; i++)  {
                var fldId = getFieldKey(dbObject, fields[i] ) ;
                if (fldId != undefined)
                   $('#kn-input-' +  fldId).hide();
              }
            }

         //Show the sleccted fields
         if ( nSelIndex > -1)
         {
             fields = conditionalFields[nSelIndex].fields ;
             for (var i =0; i < fields.length ; i++)  {
               var fldId = getFieldKey(dbObject, fields[i] ) ;
               if (fldId != undefined)
                  $('#kn-input-' +  fldId).show();
             }
         }

        }
     catch (e) {
            logerror (e);
          }
}

/*******************************************************************************************************
Database Objects Helper Functions
*******************************************************************************************************/
function getObjectKey(name ) {

    try {

        var tables = dbTables["tables"];
        console.dir (tables) ;

        if ( tables == undefined ){
            logMsg (dbTables["objects"] + " Fields property not defined") ;
            return ;
        }

        for (var i =0; i < tables.length ; i++)
        {
          if (tables[i].name == name)
             return tables[i].key ;
        }

       logMsg (dbTables["objects"] + " field not found - " + name) ;
       return "" ;

  }
  catch (e) {
      logerror (e);
    }
}



/*******************************************************************************************************
Database Objects Helper Functions
*******************************************************************************************************/
function getFieldKey(dbObject, label ) {

    try {

        console.dir (dbObject);
        logObject(dbObject) ;
        var fields = dbObject["fields"];
        console.dir (fields) ;
        if ( fields == undefined ){
            logMsg (dbObject["name"] + " Fields property not defined") ;
            return ;
        }

        for (var i =0; i < fields.length ; i++)
        {
          if (fields[i].label == label)
             return fields[i].key ;
        }

       logMsg (dbObject["name"]+ " field not found - " + label) ;
       return "" ;

  }
  catch (e) {
      logerror (e);
    }
}



/*******************************************************************************************************
Database Objects -- https://api.knack.com/v1/objects/
*******************************************************************************************************/

var dbTables = {
    "tables": [
        {
            "name": "Contacts",
            "key": "object_1"
        },
        {
            "name": "Contact Relationship Types",
            "key": "object_20"
        },
        {
            "name": "Contact Types",
            "key": "object_21"
        },
        {
            "name": "Standard Lists",
            "key": "object_31"
        },
        {
            "name": "Contact to Project Links",
            "key": "object_23"
        },
        {
            "name": "Contact to Contact Links",
            "key": "object_25"
        },
        {
            "name": "Contact Staff Positions",
            "key": "object_32"
        },
        {
            "name": "Projects",
            "key": "object_10"
        },
        {
            "name": "Project Status Types",
            "key": "object_18"
        },
        {
            "name": "Projects to Project Links",
            "key": "object_29"
        },
        {
            "name": "Link Relationship Types",
            "key": "object_24"
        },
        {
            "name": "Activities",
            "key": "object_2"
        },
        {
            "name": "Activity Types",
            "key": "object_27"
        },
        {
            "name": "Activity Sub Tasks",
            "key": "object_28"
        },
        {
            "name": "Activity to Activity Links",
            "key": "object_30"
        },
        {
            "name": "Product Groups",
            "key": "object_12"
        },
        {
            "name": "Products",
            "key": "object_35"
        },
        {
            "name": "Orders",
            "key": "object_34"
        },
        {
            "name": "Order Line Items",
            "key": "object_33"
        },
        {
            "name": "Prospects",
            "key": "object_7"
        },
        {
            "name": "Site",
            "key": "object_16"
        },
        {
            "name": "API",
            "key": "object_19"
        },
        {
            "name": "Organization Roles",
            "key": "object_14"
        },
        {
            "name": "Users",
            "key": "object_5"
        },
        {
            "name": "Suppliers",
            "key": "object_11"
        },
        {
            "name": "Site Administrators",
            "key": "object_6"
        },
        {
            "name": "Administrators",
            "key": "object_15"
        },
        {
            "name": "Accounts",
            "key": "object_4"
        },
        {
            "name": "Payments",
            "key": "object_8"
        },
        {
            "name": "Document",
            "key": "object_36"
        },
        {
            "name": "Emails",
            "key": "object_39"
        }
    ]
}

var dbEmails = {
    "fields": [
        {
            "label": "Contacts",
            "key": "field_357",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_1",
                "has": "many",
                "belongs_to": "many"
            }
        },
        {
            "label": "Project",
            "key": "field_358",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_10",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Send",
            "key": "field_364",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Immediately Upon Completion",
                "Based on Schedule"
            ]
        },
        {
            "label": "Email Template Category",
            "key": "field_363",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_31",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Email Template",
            "key": "field_360",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_40"
            }
        },
        {
            "label": "Email Schedule",
            "key": "field_361",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Email Name",
            "key": "field_342",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "To",
            "key": "field_345",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "many",
                "object": "object_1"
            }
        },
        {
            "label": "CC",
            "key": "field_347",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "many",
                "object": "object_1"
            }
        },
        {
            "label": "BCC",
            "key": "field_348",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "many",
                "object": "object_1"
            }
        },
        {
            "label": "From",
            "key": "field_346",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Subject",
            "key": "field_349",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Body",
            "key": "field_350",
            "required": false,
            "type": "rich_text"
        },
        {
            "label": "Direction",
            "key": "field_344",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Received",
                "Sent"
            ]
        },
        {
            "label": "Users",
            "key": "field_352",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "many",
                "object": "object_5"
            }
        },
        {
            "label": "Site",
            "key": "field_353",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_16"
            }
        },
        {
            "label": "Created Date",
            "key": "field_343",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Sent Date",
            "key": "field_354",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Received Date",
            "key": "field_355",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Status",
            "key": "field_356",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_31",
                "has": "one",
                "belongs_to": "many"
            }
        }
    ]
}


/*******************************************************************************************************
Database Objects
*******************************************************************************************************/

var dbContacts = {
    "key" : "object_1",
    "name" : "contacts",

    "conditionalDisplayFields" :
          [{ "key" : "Contact Type" , "fieldlist" : [
                    {"key" : "Person" , "fields" : ["Contact Name", "Salutation", "DateOfBirth", "O"] },
                    { "key" : "Organization" , "fields" :  ["Organization Name", "Industry"] }
                  ]},
           {"key": "Roles" , "fieldlist" : [
                    { "key" :"System" , "fields" : ["User", "Site", "Contact Name Expression"] }
                  ] }
      ] ,

    "fields": [
       {
           "label": "Contact",
           "key": "field_194",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Contact Type",
           "key": "field_201",
           "required": false,
           "type": "connection",
           "relationship": {
               "belongs_to": "many",
               "has": "one",
               "object": "object_21"
           }
       },
       {
           "label": "Contact Relationship Type",
           "key": "field_199",
           "required": false,
           "type": "connection",
           "relationship": {
               "belongs_to": "many",
               "has": "one",
               "object": "object_20"
           }
       },
       {
           "label": "Contact Name",
           "key": "field_1",
           "required": false,
           "type": "name"
       },
       {
           "label": "Organization Name",
           "key": "field_181",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Salutation",
           "key": "field_160",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Occupation",
           "key": "field_126",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Industry",
           "key": "field_182",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Lead Referral Source",
           "key": "field_56",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Date of Initial Contact",
           "key": "field_57",
           "required": false,
           "type": "date_time"
       },
       {
           "label": "Home Phone",
           "key": "field_112",
           "required": false,
           "type": "phone"
       },
       {
           "label": "Mobile Phone",
           "key": "field_113",
           "required": false,
           "type": "phone"
       },
       {
           "label": "Office Phone",
           "key": "field_25",
           "required": false,
           "type": "phone"
       },
       {
           "label": "Fax",
           "key": "field_161",
           "required": false,
           "type": "phone"
       },
       {
           "label": "Email",
           "key": "field_26",
           "required": false,
           "type": "email"
       },
       {
           "label": "Website",
           "key": "field_28",
           "required": false,
           "type": "link"
       },
       {
           "label": "LinkedIn Profile",
           "key": "field_29",
           "required": false,
           "type": "link"
       },
       {
           "label": "Facebook Profile",
           "key": "field_188",
           "required": false,
           "type": "link"
       },
       {
           "label": "Background Info",
           "key": "field_31",
           "required": false,
           "type": "paragraph_text"
       },
       {
           "label": "Contact Organization Roles",
           "key": "field_111",
           "required": false,
           "type": "connection",
           "relationship": {
               "object": "object_14",
               "has": "many",
               "belongs_to": "many"
           }
       },
       {
           "label": "Rating",
           "key": "field_43",
           "required": false,
           "type": "rating"
       },
       {
           "label": "Physical Address",
           "key": "field_184",
           "required": false,
           "type": "address"
       },
       {
           "label": "Mail Address",
           "key": "field_125",
           "required": false,
           "type": "address"
       },
       {
           "label": "Billing Address",
           "key": "field_183",
           "required": false,
           "type": "address"
       },
       {
           "label": "DateOfBirth",
           "key": "field_163",
           "required": false,
           "type": "date_time"
       },
       {
           "label": "User",
           "key": "field_191",
           "required": false,
           "type": "connection",
           "relationship": {
               "belongs_to": "many",
               "has": "one",
               "object": "object_4"
           }
       },
       {
           "label": "Site",
           "key": "field_145",
           "required": false,
           "type": "connection",
           "relationship": {
               "object": "object_16",
               "has": "one",
               "belongs_to": "many"
           }
       },
       {
           "label": "Contact Name Expression",
           "key": "field_195",
           "required": false,
           "type": "concatenation"
       }
   ]
}

/*******************************************************************************************************
Database Objects - Activities
*******************************************************************************************************/

var dbActivities = {
  "key" : "object_2",
  "name" : "activities",
  "conditionalDisplayFields" :[{
          "key" :"Activity Type" , "fieldlist" :  [
          {"key" : "Task" , "fields" : ["Add Task or Meeting", "Activity Sub Type", "Due Date", "Task Status","Task Update"] },
          { "key" : "Meeting" , "fields" :  ["Add Task or Meeting", "Activity Sub Type", "Due Date", "Task Status","Task Update"] }
        ] },

        { "key" :"Activity Associated With" , "fieldlist" :  [
                {"key" : "A Project" , "fields" : ["Project"] },
                { "key" : "A Contact" , "fields" :  ["Contact"] }
              ] },

        { "key": "Roles"  , "fieldlist" : [
          { "key" :"System" , "fields" : ["User", "Site", "Contact Name Expression"] }
        ] },
    ] ,
  "fields": [
      {
          "label": "Task For",
          "key": "field_321",
          "required": false,
          "type": "concatenation"
      },
      {
          "label": "Activity Associated With",
          "key": "field_233",
          "required": false,
          "type": "multiple_choice",
          "choices": [
              "A Project",
              "A Contact",
              "Neither"
          ]
      },
      {
          "label": "Project",
          "key": "field_166",
          "required": false,
          "type": "connection",
          "relationship": {
              "object": "object_10",
              "has": "one",
              "belongs_to": "many"
          }
      },
      {
          "label": "Contact",
          "key": "field_22",
          "required": false,
          "type": "connection",
          "relationship": {
              "object": "object_1",
              "has": "one",
              "belongs_to": "many"
          }
      },
      {
          "label": "Task Number",
          "key": "field_326",
          "required": false,
          "type": "concatenation"
      },
      {
          "label": "Activity Type",
          "key": "field_150",
          "required": false,
          "type": "connection",
          "relationship": {
              "belongs_to": "many",
              "has": "one",
              "object": "object_27"
          }
      },
      {
          "label": "Activity Sub Type",
          "key": "field_42",
          "required": false,
          "type": "connection",
          "relationship": {
              "belongs_to": "many",
              "has": "one",
              "object": "object_28"
          }
      },
      {
          "label": "Add Task or Meeting",
          "key": "field_35",
          "required": false,
          "type": "boolean"
      },
      {
          "label": "Categories",
          "key": "field_340",
          "required": false,
          "type": "connection",
          "relationship": {
              "object": "object_31",
              "has": "many",
              "belongs_to": "many"
          }
      },
      {
          "label": "Task Name",
          "key": "field_235",
          "required": false,
          "type": "short_text"
      },
      {
          "label": "Notes",
          "key": "field_2",
          "required": false,
          "type": "paragraph_text"
      },
      {
          "label": "Assigned To",
          "key": "field_58",
          "required": false,
          "type": "connection",
          "relationship": {
              "belongs_to": "many",
              "has": "one",
              "object": "object_5"
          }
      },
      {
          "label": "Task/Meeting Due Date",
          "key": "field_37",
          "required": false,
          "type": "date_time"
      },
      {
          "label": "Task Status",
          "key": "field_50",
          "required": false,
          "type": "connection",
          "relationship": {
              "belongs_to": "many",
              "has": "one",
              "object": "object_31"
          }
      },
      {
          "label": "Task Update",
          "key": "field_51",
          "required": false,
          "type": "paragraph_text"
      },
      {
          "label": "Date",
          "key": "field_34",
          "required": false,
          "type": "date_time"
      },
      {
          "label": "Complete Date",
          "key": "field_341",
          "required": false,
          "type": "date_time"
      },
      {
          "label": "Item Number",
          "key": "field_325",
          "required": false,
          "type": "number"
      },
      {
          "label": "Site",
          "key": "field_146",
          "required": false,
          "type": "connection",
          "relationship": {
              "belongs_to": "many",
              "has": "one",
              "object": "object_16"
          }
      }
  ]
  };



  /*******************************************************************************************************
  Database Objects - Contact to Contact Links
  *******************************************************************************************************/

  var dbContacttoContactLinks = {
    "key" : "object_25",
    "name" : "Contact to Contact Links",
    "fields": [
        {
            "label": "Contact to Contact Name",
            "key": "field_259",
            "required": false,
            "type": "concatenation"
        },
        {
            "label": "Contact",
            "key": "field_211",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_1",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Linked Contact",
            "key": "field_212",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_1",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Link Relationship Type",
            "key": "field_213",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_24",
                "has": "one",
                "belongs_to": "many"
            }
        }
    ]
}

/*******************************************************************************************************
Database Objects - Product Groups
*******************************************************************************************************/
var dbProductGroups = {
    "fields": [
        {
            "label": "Product Number",
            "key": "field_290",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Product Name",
            "key": "field_98",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Product Description",
            "key": "field_103",
            "required": false,
            "type": "paragraph_text"
        },
        {
            "label": "Product Service Indicator",
            "key": "field_101",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Product",
                "Service"
            ]
        },
        {
            "label": "Billing Frequency",
            "key": "field_100",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Fixed",
                "Per Hour",
                "Per Day",
                "Per Month",
                "Per Year"
            ]
        },
        {
            "label": "Billing Rate",
            "key": "field_102",
            "required": false,
            "type": "number"
        },
        {
            "label": "Stripe API Code",
            "key": "field_99",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Products",
            "key": "field_297",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "many",
                "object": "object_35"
            }
        },
        {
            "label": "Site",
            "key": "field_314",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "many",
                "object": "object_16"
            }
        }
    ]
};


/*******************************************************************************************************
Database Objects - Orders
*******************************************************************************************************/
var dbOrders = {
    "fields": [
        {
            "label": "Product Group",
            "key": "field_313",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_12"
            }
        },
        {
            "label": "Add Default Products",
            "key": "field_318",
            "required": false,
            "type": "boolean"
        },
        {
            "label": "Contact",
            "key": "field_288",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_1",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Project",
            "key": "field_289",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_10"
            }
        },
        {
            "label": "Status",
            "key": "field_275",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Invoice",
                "Paid",
                "Quote"
            ]
        },
        {
            "label": "Quote Date",
            "key": "field_276",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Invoice Date",
            "key": "field_277",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Payment Date",
            "key": "field_278",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Line Items Total",
            "key": "field_279",
            "required": false,
            "type": "sum"
        },
        {
            "label": "Sales Tax",
            "key": "field_280",
            "required": false,
            "type": "number"
        },
        {
            "label": "Order Total",
            "key": "field_281",
            "required": false,
            "type": "equation"
        },
        {
            "label": "Auto Increment",
            "key": "field_282",
            "required": false,
            "type": "auto_increment"
        },
        {
            "label": "Leading Zeros",
            "key": "field_283",
            "required": false,
            "type": "number"
        },
        {
            "label": "Quote Number",
            "key": "field_284",
            "required": false,
            "type": "concatenation"
        },
        {
            "label": "Invoice Number",
            "key": "field_285",
            "required": false,
            "type": "concatenation"
        },
        {
            "label": "Check Number",
            "key": "field_286",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Payment",
            "key": "field_287",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_8"
            }
        },
        {
            "label": "Contact to Project Link",
            "key": "field_303",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_23",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Site",
            "key": "field_316",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_16",
                "has": "one",
                "belongs_to": "many"
            }
        }
    ]
}

/*******************************************************************************************************
Database Objects - Projects
*******************************************************************************************************/

var dbOrderLines = {
    "fields": [
        {
            "label": "Order",
            "key": "field_270",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_34"
            }
        },
        {
            "label": "Product",
            "key": "field_271",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_35"
            }
        },
        {
            "label": "Quantity",
            "key": "field_272",
            "required": false,
            "type": "number"
        },
        {
            "label": "Subtotal",
            "key": "field_273",
            "required": false,
            "type": "currency"
        },
        {
            "label": "Site",
            "key": "field_317",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_16"
            }
        }
    ]
} ;

/*******************************************************************************************************
Database Objects - Projects
*******************************************************************************************************/

var dbProjects = {
  "key" : "object_14",
  "name" : "projects",
    "fields": [
        {
            "label": "Organization",
            "key": "field_122",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_13"
            }
        },
        {
            "label": "Contacts",
            "key": "field_121",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "many",
                "object": "object_1"
            }
        },
        {
            "label": "Name",
            "key": "field_90",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Pipeline Status",
            "key": "field_124",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Opportunity",
                "Bid",
                "Won",
                "Active",
                "Complete",
                "Archive"
            ]
        },
        {
            "label": "Project Type",
            "key": "field_117",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "First Choice",
                "Second Choice",
                "Third Choice"
            ]
        },
        {
            "label": "Description",
            "key": "field_96",
            "required": false,
            "type": "paragraph_text"
        },
        {
            "label": "Proposal Due Date",
            "key": "field_97",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Budget",
            "key": "field_114",
            "required": false,
            "type": "currency"
        },
        {
            "label": "Rating",
            "key": "field_115",
            "required": false,
            "type": "rating"
        },
        {
            "label": "Probability of Winning",
            "key": "field_175",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Unknown",
                "High",
                "Medium",
                "Low"
            ]
        },
        {
            "label": "Forecasted Close Date",
            "key": "field_136",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "User Responsible",
            "key": "field_137",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_4",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Site",
            "key": "field_149",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_16"
            }
        }
    ]
} ;
