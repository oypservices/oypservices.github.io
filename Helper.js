//Helper Js. Adding this block for documentation and to force commit;


function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

/* Parser */

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};
/*********************************************************************************************************
* Get Todays Date
**********************************************************************************************************/

function getToday()
{
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
			    dd = '0'+dd
			}

			if(mm<10) {
			    mm = '0'+mm
			}

			today = mm + '/' + dd + '/' + yyyy;
		  return today;
}


/****************************************************************************************************************
	Call to the Knack API.  Wrapper around gateway Call
********************************************************************************************************************/

function OYPKnackAPICall (headers, apidata)
{
		return new Promise ((resolve, reject) => {

					console.dir (apidata);
					var resource = 'knackobject';

					console.dir (apidata);

 					OYPServicesAPIPost( resource, headers, apidata )
					    .then (result => {
								console.dir (result) ;
							  console.log('OYPKnackAPICall ' + apidata.method + ' ' + apidata.knackobj + ' suceeded.' );
							 resolve ( result ) ;
						 } 	);
		 })
}

/****************************************************************************************************************
	General AWS call
********************************************************************************************************************/
function  OYPServicesAPIPost( resource, headers, data )
{
		return new Promise ((resolve, reject) => {

			var this_url = 'https://x247dlqfx2.execute-api.us-east-1.amazonaws.com/v1/'  + resource ;

		  console.log (this_url) ;
			console.dir (data) ;

			// Search to see if a contact exist by this name

			if (typeof data == "string") {
				data = JSON.parse(data);
			}

			//console.log(typeof data);

			$.ajax({
						url: this_url ,
						type: 'POST',
						headers: headers,
						data:  JSON.stringify(data) ,
						crossDomain: true,
						datatype: 'json',
						json: true,
						success: function (response) {


						if (response != undefined)
						{
					  	console.dir (response) ;
							if (response.body != undefined)
								response = response.body ;
						}

					resolve(response) ;

						} ,
				error: function (responseData, textStatus, errorThrown) {
						console.log('OYPServicesAPIPost failed.');
						console.log (responseData);
						console.log (textStatus) ;
						console.log (errorThrown);
						reject(errorThrown);
				}// end response function

			}); //end ajax

		}); // end promise

} ;

/****************************************************************************************************************
 API JSON Transforrm
********************************************************************************************************************/

function OYPAPIJSONTransform(template, date) {

	console.dir (message);
	var objTransform = {data: {}, template:{}};
	objTransform.data.models = Knack.models['view_209'].data.models;
	objTransform.template = message.records[0].field_178 ;

 var resource = 'jsontransform';
 OYPServicesAPIPost( resource, headers, objTransform )
 	.then (result=> {CallAPISendMail(result) } ) ;

}
/****************************************************************************************************************
	API Send Mail
********************************************************************************************************************/

function OYPAPISendMail(headers, message) {

	return new Promise ((resolve, reject) => {

  			var resource = 'sendmail';
				console.log ('sendmail');


				message = {
  "to": "brian@oypservices.com",
  "subject": "Its working....Email sent successfully",
  "templateId": "d-dbd4fd2a6cbf42c6837e8198ca9564b0",
  "html": "data",
  "dynamic_template_data": {
    "total": "$ 239.85",
    "items": [
      {
        "text": "Nike Sneakers",
        "image": "https://marketing-image-production.s3.amazonaws.com/uploads/8dda1131320a6d978b515cc04ed479df259a458d5d45d58b6b381cae0bf9588113e80ef912f69e8c4cc1ef1a0297e8eefdb7b270064cc046b79a44e21b811802.png",
        "price": "$ 79.95"
      },
      {
        "text": "Old Line Sneakers",
        "image": "https://marketing-image-production.s3.amazonaws.com/uploads/3629f54390ead663d4eb7c53702e492de63299d7c5f7239efdc693b09b9b28c82c924225dcd8dcb65732d5ca7b7b753c5f17e056405bbd4596e4e63a96ae5018.png",
        "price": "$ 79.95"
      },
      {
        "text": "Blue Line Sneakers",
        "image": "https://marketing-image-production.s3.amazonaws.com/uploads/00731ed18eff0ad5da890d876c456c3124a4e44cb48196533e9b95fb2b959b7194c2dc7637b788341d1ff4f88d1dc88e23f7e3704726d313c57f350911dd2bd0.png",
        "price": "$ 79.95"
      }
    ],
    "emailsubject": "New API Gateway Subject",
    "receipt": true,
    "name": "Sample Name",
    "address01": "1234 Fake St.",
    "address02": "Apt. 123",
    "city": "Place",
    "state": "CO",
    "zip": "80202"
  }
}

			  OYPServicesAPIPost( resource, headers, message )
					.then (result => { resolve(result) ;})
					.catch (err => {reject (err); })

 }) ;

}

/****************************************************************************************************************
	Wait funcdtion
********************************************************************************************************************/


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
