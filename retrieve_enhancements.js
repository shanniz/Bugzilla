/**************************************
* 	retrieve_enhancements.js
*
* 	Author: Zeeshan A. Nizamani
*
* 	Description: The source code to retrieve 
* 	enhancement issue reports data from
*	Bugzilla using ut's REST API
*
**************************************/


var rest = require('restler');	
var fs = require('fs');


var save_to_file = function(reports_data){
	fs.writeFile("./bugsData.txt", JSON.stringify(reports_data), function(err) {
	    if(err) {
	    	console.log(err);
	        return -1;
	    }
    	console.log("The file was saved!");
	});
}

//get all the bugz for specific product
var get_product_enhancements = function(product = 'Firefox'){
	var URL = 'https://bugzilla.mozilla.org/rest/bug?severity=enhancement&product='+product+'&include_fields=id,severity,summary,status,resolution,product';
	console.log("Retrieving reports from Bugzilla for " + product);
	rest.get(URL).on('complete', function(data) {
  		console.log('Retrieved data from Bugzilla server for ' + product );
  		console.log(data);
  		save_to_file(data); 
	});		
}


//get general enhancements
var get_all_enhancements = function(){
	var URL = 'https://bugzilla.mozilla.org/rest/bug?severity=enhancement&include_fields=id,severity,summary,status,resolution,product';
	console.log("Retrieving reports from Bugzilla for all the projects");
	rest.get(URL).on('complete', function(data) {
  		console.log("Retrieved data from Bugzilla for all the projects");
  		console.log(data);
	  	//save_to_file(reports_data);
	});		
}


console.log("#### enhancement retrieval program #####");
get_product_enhancements();