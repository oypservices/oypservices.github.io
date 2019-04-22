
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
            "name": "Project Detail Items",
            "key": "object_46"
        },
        {
            "name": "Project Detail Item Costs",
            "key": "object_45"
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
        },
        {
            "name": "Email Templates",
            "key": "object_40"
        },
        {
          "name": "Email Template Sections",
          "key": "object_41"
        }
    ]
}

var dbProjectItemDetails = {
  "fields": [
      {
          "label": "Project Detail Item Name",
          "key": "field_455",
          "required": false,
          "type": "concatenation"
      },
      {
          "label": "Reference No.",
          "key": "field_443",
          "required": false,
          "type": "concatenation"
      },
      {
          "label": "Item Number",
          "key": "field_442",
          "required": false,
          "type": "number"
      },
      {
          "label": "Project",
          "key": "field_414",
          "required": false,
          "type": "connection",
          "relationship": {
              "object": "object_10",
              "has": "one",
              "belongs_to": "many"
          }
      },
      {
          "label": "Project Detail Group Type",
          "key": "field_437",
          "required": false,
          "type": "connection",
          "relationship": {
              "object": "object_31",
              "has": "one",
              "belongs_to": "many"
          }
      },
      {
          "label": "Included",
          "key": "field_438",
          "required": false,
          "type": "boolean"
      },
      {
          "label": "Product Group",
          "key": "field_411",
          "required": false,
          "type": "connection",
          "relationship": {
              "object": "object_12",
              "has": "one",
              "belongs_to": "many"
          }
      },
      {
          "label": "Status",
          "key": "field_416",
          "required": false,
          "type": "connection",
          "relationship": {
              "object": "object_31",
              "has": "one",
              "belongs_to": "many"
          }
      },
      {
          "label": "Line Items Total",
          "key": "field_420",
          "required": false,
          "type": "sum"
      },
      {
          "label": "Order Total",
          "key": "field_422",
          "required": false,
          "type": "equation"
      },
      {
          "label": "Auto Increment",
          "key": "field_423",
          "required": false,
          "type": "auto_increment"
      },
      {
          "label": "Site",
          "key": "field_429",
          "required": false,
          "type": "connection",
          "relationship": {
              "belongs_to": "many",
              "has": "one",
              "object": "object_16"
          }
      },
      {
          "label": "Gross Floor Area",
          "key": "field_439",
          "required": false,
          "type": "number"
      },
      {
          "label": "Display Order",
          "key": "field_451",
          "required": false,
          "type": "number"
      }
  ]
}


var dbProjectDetailItemCosts = {
    "fields": [
        {
            "label": "Project Detail Item",
            "key": "field_407",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_46"
            }
        },
        {
            "label": "Item",
            "key": "field_402",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_35"
            }
        },
        {
            "label": "Description",
            "key": "field_408",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Units",
            "key": "field_403",
            "required": false,
            "type": "number"
        },
        {
            "label": "Price",
            "key": "field_404",
            "required": false,
            "type": "currency"
        },
        {
            "label": "Subtotal",
            "key": "field_405",
            "required": false,
            "type": "currency"
        },
        {
            "label": "Comments",
            "key": "field_409",
            "required": false,
            "type": "paragraph_text"
        },
        {
            "label": "Site",
            "key": "field_406",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_16"
            }
        },
        {
            "label": "Included",
            "key": "field_452",
            "required": false,
            "type": "boolean"
        }
    ]
}

var dbStandardLists = {
  "fields": [
    {
        "label": "Auto Increment",
        "key": "field_456",
        "required": false,
        "type": "auto_increment"
    },
    {
        "label": "List Name",
        "key": "field_266",
        "required": false,
        "type": "multiple_choice",
        "choices": [
            "Activity Category",
            "Activity Status",
            "Construction Phases",
            "Construction Sub Phases",
            "Email Status",
            "Email Template Category",
            "Meeting Purpose",
            "Order Status",
            "Order Type",
            "Project Pipeline Status",
            "Project Status",
            "Project Sub Type",
            "Project Type",
            "Referral Source",
            "Units of Measure"
        ]
    },
    {
        "label": "Display Code",
        "key": "field_265",
        "required": false,
        "type": "short_text"
    },
    {
        "label": "Display Name",
        "key": "field_253",
        "required": false,
        "type": "short_text"
    },
    {
        "label": "Sites",
        "key": "field_254",
        "required": false,
        "type": "connection",
        "relationship": {
            "belongs_to": "many",
            "has": "many",
            "object": "object_16"
        }
    },
    {
        "label": "System Default",
        "key": "field_255",
        "required": false,
        "type": "boolean"
    },
    {
        "label": "Sort Order",
        "key": "field_268",
        "required": false,
        "type": "number"
    },
    {
        "label": "Sort Order Expression",
        "key": "field_269",
        "required": false,
        "type": "concatenation"
    },
    {
        "label": "Related Link",
        "key": "field_339",
        "required": false,
        "type": "link"
    },
    {
        "label": "Added By User",
        "key": "field_385",
        "required": false,
        "type": "connection",
        "relationship": {
            "object": "object_4",
            "has": "one",
            "belongs_to": "many"
        }
    },
    {
        "label": "Master Standard Lists",
        "key": "field_435",
        "required": false,
        "type": "connection",
        "relationship": {
            "object": "object_31",
            "has": "many",
            "belongs_to": "many"
        }
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
};


var dbEmailTemplates = {
    "fields": [
        {
            "label": "Email Templates Name",
            "key": "field_359",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Template Category",
            "key": "field_362",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_31"
            }
        },
        {
            "label": "Sendgrid Template",
            "key": "field_365",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Site",
            "key": "field_366",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_16",
                "has": "many",
                "belongs_to": "many"
            }
        }
    ]
}


var dbEmailTemplateSections = {
    "fields": [
        {
            "label": "Email Template",
            "key": "field_368",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_40"
            }
        },
        {
            "label": "Email Template Sections Name",
            "key": "field_367",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Email Section",
            "key": "field_369",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "to",
                "from",
                "subject",
                "cc",
                "bcc",
                "body",
                "dynamic_template_data"
            ]
        },
        {
            "label": "JSON Path",
            "key": "field_371",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "APIData",
            "key": "field_370",
            "required": false,
            "type": "paragraph_text"
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



var dbProducts = {
    "fields": [
        {
            "label": "Auto Increment",
            "key": "field_459",
            "required": false,
            "type": "auto_increment"
        },
        {
            "label": "Product Display Name",
            "key": "field_462",
            "required": false,
            "type": "concatenation"
        },
        {
            "label": "Product Group",
            "key": "field_460",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_12",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Product No..",
            "key": "field_292",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Products Name",
            "key": "field_291",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Supplier Contact",
            "key": "field_301",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_1"
            }
        },
        {
            "label": "Image",
            "key": "field_293",
            "required": false,
            "type": "image"
        },
        {
            "label": "Description",
            "key": "field_294",
            "required": false,
            "type": "paragraph_text"
        },
        {
            "label": "Cost Basis",
            "key": "field_299",
            "required": false,
            "type": "currency"
        },
        {
            "label": "Price",
            "key": "field_295",
            "required": false,
            "type": "currency"
        },
        {
            "label": "Available",
            "key": "field_296",
            "required": false,
            "type": "boolean"
        },
        {
            "label": "Unit Types",
            "key": "field_298",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Each",
                "Per Day",
                "Per Hour",
                "Per Month",
                "Per User",
                "Per Week",
                "Per Year"
            ]
        },
        {
            "label": "Units of Measure",
            "key": "field_454",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_31"
            }
        },
        {
            "label": "Show On Invoice",
            "key": "field_300",
            "required": false,
            "type": "boolean"
        },
        {
            "label": "Direct Bill",
            "key": "field_302",
            "required": false,
            "type": "boolean"
        },
        {
            "label": "Site",
            "key": "field_315",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_16",
                "has": "many",
                "belongs_to": "many"
            }
        },
        {
            "label": "Image: URL",
            "key": "field_461",
            "required": false,
            "type": "short_text"
        }
    ]
}

/*******************************************************************************************************
Database Objects - Product Groups
*******************************************************************************************************/
var dbProductGroups = {
    "fields": [
        {
            "label": "Number",
            "key": "field_458",
            "required": false,
            "type": "auto_increment"
        },
        {
            "label": "Product Number",
            "key": "field_290",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Project Type",
            "key": "field_453",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_31",
                "has": "many",
                "belongs_to": "many"
            }
        },
        {
            "label": "Project Sub Type",
            "key": "field_463",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_31",
                "has": "many",
                "belongs_to": "many"
            }
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
                "Per Month",
                "Fixed",
                "Per Hour",
                "Per Day",
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
            "label": "Site",
            "key": "field_314",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_16",
                "has": "many",
                "belongs_to": "many"
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
          "label": "Project Number",
          "key": "field_328",
          "required": false,
          "type": "concatenation"
      },
      {
          "label": "Project/Job Name",
          "key": "field_90",
          "required": false,
          "type": "short_text"
      },
      {
          "label": "Prospect(s) / Customer(s)",
          "key": "field_322",
          "required": false,
          "type": "connection",
          "relationship": {
              "belongs_to": "many",
              "has": "many",
              "object": "object_1"
          }
      },
      {
          "label": "Description",
          "key": "field_96",
          "required": false,
          "type": "paragraph_text"
      },
      {
          "label": "Project Status",
          "key": "field_124",
          "required": false,
          "type": "connection",
          "relationship": {
              "belongs_to": "many",
              "has": "one",
              "object": "object_18"
          }
      },
      {
          "label": "Project Type",
          "key": "field_225",
          "required": false,
          "type": "connection",
          "relationship": {
              "object": "object_31",
              "has": "one",
              "belongs_to": "many"
          }
      },
      {
          "label": "Project Sub Type",
          "key": "field_436",
          "required": false,
          "type": "connection",
          "relationship": {
              "object": "object_31",
              "has": "one",
              "belongs_to": "many"
          }
      },
      {
          "label": "This Is A Sub Project",
          "key": "field_219",
          "required": false,
          "type": "boolean"
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
              "belongs_to": "many",
              "has": "many",
              "object": "object_4"
          }
      },
      {
          "label": "Site",
          "key": "field_149",
          "required": false,
          "type": "connection",
          "relationship": {
              "object": "object_16",
              "has": "one",
              "belongs_to": "many"
          }
      },
      {
          "label": "Number of Child Projects",
          "key": "field_241",
          "required": false,
          "type": "count"
      },
      {
          "label": "Number of Parent Projects",
          "key": "field_242",
          "required": false,
          "type": "count"
      },
      {
          "label": "Number of Contacts",
          "key": "field_243",
          "required": false,
          "type": "count"
      },
      {
          "label": "Project Start Date",
          "key": "field_307",
          "required": false,
          "type": "date_time"
      },
      {
          "label": "Project End Date",
          "key": "field_308",
          "required": false,
          "type": "date_time"
      },
      {
          "label": "Client is in the Business Of",
          "key": "field_311",
          "required": false,
          "type": "paragraph_text"
      },
      {
          "label": "Services to be Provided",
          "key": "field_312",
          "required": false,
          "type": "paragraph_text"
      },
      {
          "label": "Item Number",
          "key": "field_327",
          "required": false,
          "type": "number"
      },
      {
          "label": "Pending Task Counts",
          "key": "field_333",
          "required": false,
          "type": "count"
      },
      {
          "label": "Is Project Inactive",
          "key": "field_334",
          "required": false,
          "type": "boolean"
      },
      {
          "label": "Project Detail Count",
          "key": "field_441",
          "required": false,
          "type": "count"
      },
      {
          "label": "Account Added By",
          "key": "field_450",
          "required": false,
          "type": "connection",
          "relationship": {
              "belongs_to": "many",
              "has": "one",
              "object": "object_4"
          }
      }
  ]
} ;
