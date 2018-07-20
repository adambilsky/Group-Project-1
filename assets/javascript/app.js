// Basic JS functions for branch "create-javasript"

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCJtgOCQ2UD_M3CTn1CfOYPjrGd9W5Mwy8",
    authDomain: "mauinc-8dc45.firebaseapp.com",
    databaseURL: "https://mauinc-8dc45.firebaseio.com/",
    projectId: "mauinc-8dc45",
    storageBucket: "",
    messagingSenderId: "256774904806"
};
firebase.initializeApp(config);

var database = firebase.database();

// An array of objects, each containing one of 
// the 10 neighborhood names and corresponding Community Area #
var CAArray = {
    "Edgewater": 54873,
    "Hyde Park": 26893,
    "Lakeview": 98212,
    "Lincoln Park": 66959,
    "Lincoln Square": 40761,
    "Logan Square": 73702,
    "Pilsen (Lower West Side)": 34410,
    "Uptown": 55137,
    "Bucktown (West Town)": 86429,
    "Wicker Park (West Town)": 86429
    }

// An event listener on the click/drop-down menu 
// to pass the Community Area value through the API 

$(".neighborhood").on("click", function () {

    // An array of neighborhood crime report objects 
    // to be dynamically filled by AJAX request
    var neighborhoodArray = [];
    
    // A dynamically-created object holding the types of crime 
    // in each reported neighborhood AND the number of each type committed in 2018.

    var crimeTypes = {};
    var CA = $(this).attr("data-value");
    var neighName = $(this).attr("data-name");
    $.ajax({
        url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?community_area=" + CA + "&year=2018",
        type: "GET",
        data: {
            "$limit": 50000,
            "$$app_token": "chp9vzClkoQ3bf0yZLoCpG21u"
        }
    }).done(function (data) {
        for (i = 0; i < data.length; i++) {
            if (parseInt(data[i].community_area) == CA) {
                var CAdata = data[i];
                neighborhoodArray.push(CAdata);
            }
        }
        console.log(neighborhoodArray);

        // This for/if loop populates an object of key-value pairs of primary crime types 

        for (i = 0; i < neighborhoodArray.length; i++) {
            if (Object.keys(crimeTypes).indexOf(neighborhoodArray[i].primary_type) < 0) {
                crimeTypes[neighborhoodArray[i].primary_type] = 1;
            }
            else {
                crimeTypes[neighborhoodArray[i].primary_type]++;
            }
        }
        // Log entire object for a particular neighborhood:  
        console.log("Following is the neighborhood crime report for " + neighName + ":");
        console.log(crimeTypes);
        
        // List the types of crime
        console.log("Following are all crime types reported out of " + data.length + " records retrieved from " + neighName + ": ");
        console.log(Object.keys(crimeTypes));

        //Grab one particular crime type and name it by index position 
        console.log("Following is the first crime type recorded in the list of records returned from " + neighName +": ");
        console.log(Object.keys(crimeTypes)[0]);
        
        //Report one particular type of crime from the neighborhood by name and list the number
        console.log("Following is the number of Assaults reported in " + neighName + ": " + crimeTypes.ASSAULT);
        console.log("Following is the number of Batteries reported in " + neighName + ": " + crimeTypes.BATTERY);
        console.log("Following is the number of Motor Vehicle Thefts reported in " + neighName + ": " + crimeTypes["MOTOR VEHICLE THEFT"]);
       
        console.log(Object.entries(crimeTypes));
        var population = parseInt(CAArray[neighName]);

        var maxCrime = function () {
            // The following determines the most frequent crime type in the report, 
            // and returns its key.

            var max = 0;
            var maxKey;
            var crimeArr = [];

            for(var key in crimeTypes) {
                if(crimeTypes[key] > max){
                    max = crimeTypes[key];
                    maxKey = key;
                }    
            }
            console.log(maxKey + ": " + max + "/" + data.length);
            var crimeRate = Math.round((max/data.length)*100).toFixed(0);
            var crimePerCapita = ((max/population)*100).toFixed(2);
            console.log("Homicides in " + neighName + ": " + crimeTypes["HOMICIDE"]);
            console.log;
            $("#crime-display-table > tbody").append("<tr><td>" + neighName + "</td><td>" + population + "</td><td>" + maxKey + "</td><td>" + crimeRate + "</td><td style = 'color: red'>" + crimeTypes["HOMICIDE"] + "</td></tr>" + "<tr><td>" + "The most frequent crime in " + neighName + " is " + maxKey + ", which occurs at a rate of " + crimePerCapita + "% per capita, and which comprised " + crimeRate + "% (" + max + "/" + data.length + ") of all crimes in 2018." + "</td></tr>");
        }
        maxCrime();
        
        // Goal: to compare the neighborhood crime data to population size
        // in order to create a more user-oriented neighborhood "snapshot"
        console.log(CAArray)
        console.log("Population of " + neighName + ": " + CAArray[neighName]);

        // database.ref().push({
        //     neighName,
        //     crimeTypes
        // });
    });
});

// database.ref().on("child_added", function (childSnapshot) {
//     console.log(childSnapshot.val());
// });
