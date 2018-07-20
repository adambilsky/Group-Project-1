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

    var lat = $(this).attr("lat"); 
    var long = $(this).attr("long"); 

    // var coordsStr = $(this).parents().find(".coords").html();
    // var coords = coordsStr.split(",");
    var point = new google.maps.LatLng(lat, long);
    map.setCenter(point);
    map.setZoom(15);
    console.log(this.lat);

    // "location": {
    //     "type": "Point",
    //     "coordinates": [
    //     -87.695151501,
    //     41.7983303
    //     ]
    //     },
    // "primary_type": "ASSAULT",

    // function initMap() {
    //     var myLatLng = {lat: -25.363, lng: 131.044};

    //     var map = new google.maps.Map(document.getElementById('map'), {
    //       zoom: 4,
    //       center: myLatLng
    //     });

    //     var marker = new google.maps.Marker({
    //       position: myLatLng,
    //       map: map,
    //       title: "primary_type"
    //     });
    
    
    $.ajax({
        url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?community_area=" + CA + "&year=2018",
        type: "GET",
        data: {
            "$limit": 50000,
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
        console.log("Folliwing are all crime types reported out of " + data.length + " records retrieved from " + neighName + ": ");
        console.log(Object.keys(crimeTypes));
        console.log(Object.getOwnPropertyNames(crimeTypes));

        //Grab one particular crime type and name it by index position 
        console.log("Following is the first crime type recorded in the list of records returned from " + neighName +": ");
        console.log(Object.keys(crimeTypes)[0]);
        
        //Report one particular type of crime from the neighborhood by name and list the number
        console.log("Following is the number of Assaults reported in " + neighName + ": " + crimeTypes.ASSAULT);
        console.log("Following is the number of Batteries reported in " + neighName + ": " + crimeTypes.BATTERY);
        
        //The following line fails because of the space between words in the oject key. We have to (I think) figure out how to trim this
        console.log("Following is the number of Motor Vehicle Thefts reported in " + neighName + ": " + crimeTypes["MOTOR VEHICLE THEFT"]);
        // console.log(Object.values(crimeTypes));
        console.log(Object.entries(crimeTypes));
        
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
        console.log(crimeRate);
        console.log("Homicides in " + neighName + ": " + crimeTypes["HOMICIDE"]);
        console.log("The most frequent crime in " + neighName + " is " + maxKey + ", which occurred in " + crimeRate + "% of all crimes.");
        $("#crime-display-table > tbody").append("<tr><td>" + neighName + "</td><td>" +maxKey + "</td><td>" + crimeRate + "</td><td style = 'color: red'>" + crimeTypes["HOMICIDE"] + "</td></tr>");

        // database.ref().push({
        //     neighName,
        //     crimeTypes
        // });
    });
});

// database.ref().on("child_added", function (childSnapshot) {
//     console.log(childSnapshot.val());
// });
// Upcoming (2): A dynamic table creation function 
// to push the results of a search into a readable format.



