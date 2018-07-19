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
var CAArray = [
    {
        NH: "Edgewater",
        CA: 77
    },
    {
        NH: "Hyde Park",
        CA: 41
    },
    {
        NH: "Lakeview",
        CA: 6
    },
    {
        NH: "Lincoln Park",
        CA: 7
    },
    {
        NH: "Lincoln Square",
        CA: 4
    },
    {
        NH: "Logan Square",
        CA: 22
    },
    {
        NH: "Pilsen (Lower West Side)",
        CA: 31
    },
    {
        NH: "Uptown",
        CA: 3
    },
    {
        NH: "Bucktown (West Town)",
        CA: 24
    },
    {
        NH: "Wicker Park (West Town)",
        CA: 24
    }

]

// An event listener on the click/drop-down menu 
// to pass the Community Area value through the API 

$(".neighborhood").on("click", function () {

    // An array of neighborhood crime report objects 
    // to be dynamically filled by AJAX request
    var neighborhoodArray = [];
    
    // A dynamically-created object holding the types of crime 
    // in each reported neighborhood AND the number of each type committed in 2018.

    var crimeTypes = {};
    var crimeNames = [];
    var CA = $(this).attr("data-value");
    var neighName = $(this).attr("data-name");
    $.ajax({
        url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
        type: "GET",
        data: {
            "$limit": 10000,
            "$$app_token": "chp9vzClkoQ3bf0yZLoCpG21u"
        }
    }).done(function (data) {
        alert("Retrieved " + data.length + " records from the dataset!");
        for (i = 0; i < data.length; i++) {
            if (parseInt(data[i].community_area) == CA) {
                var CAdata = data[i];
                neighborhoodArray.push(CAdata);
            }
        }
        console.log(neighborhoodArray);

        // This for/if loop populates an object of key-value pairs of primary crime types 

        for (i = 0; i < neighborhoodArray.length; i++) {
            var crimeName = "";
            if (Object.keys(crimeTypes).indexOf(neighborhoodArray[i].primary_type) < 0) {
                crimeTypes[neighborhoodArray[i].primary_type] = 1;
            }
            else {
                crimeTypes[neighborhoodArray[i].primary_type]++;
            }
            // $("#crime-display-table > tbody").append("<tr><td>") + crimeTypes[] + "</td><td>";
        }
        // Log entire object for a particular neighborhood:  
        console.log("Following is the neighborhood crime report for " + neighName + ":");
        console.log(crimeTypes);
        
        // List the types of crime
        console.log("Folliwing are all crime types reported out of " + data.length + " records retrieved from " + neighName + ": ");
        console.log(Object.keys(crimeTypes));
        
        //Grab one particular crime type and name it by index position 
        console.log("Following is the first crime type recorded in the list of records returned from " + neighName +": ");
        console.log(Object.keys(crimeTypes)[0]);
        
        //Report one particular type of crime from the neighborhood by name and list the number
        console.log("Following is the number of Assaults reported in " + neighName + ": " + crimeTypes.ASSAULT);
        console.log("Following is the number of Batteries reported in " + neighName + ": " + crimeTypes.BATTERY);
        
        //The following line fails because of the space between words in the oject key. We have to (I think) figure out how to trim this
        console.log("Following is the number of Motor Vehicle Thefts reported in " + neighName + ": " + crimeTypes.MOTOR_VEHICLE_THEFT);

        database.ref().push({
            neighName,
            crimeTypes
        });
    });
});

// database.ref().on("child_added", function (childSnapshot) {
//     console.log(childSnapshot.val());
// });
// Upcoming (2): A dynamic table creation function 
// to push the results of a search into a readable format.
