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

// An objects of key-value pairs, each containing one of 
// the 10 neighborhood names and corresponding 2017 population
var CAArray = {
    "Bridgeport":33878,
    "Edgewater": 54873,
    "Hyde Park": 26893,
    "Lakeview": 98212,
    "Lincoln Park": 66959,
    "Lincoln Square": 40761,
    "Logan Square": 73702,
    "Pilsen": 34410,
    "Uptown": 55137,
    "West Town": 86429,
    }

// An event listener on the click/drop-down menu 
// to pass the Community Area value through the API 


$(".neighborhood").on("click", function () {
    $(".carousel-inner").hide(); 
    // An array of neighborhood crime report objects 
    // to be dynamically filled by AJAX request
    var neighborhoodArray = [];
    
    // A dynamically-created object holding the types of crime 
    // in each reported neighborhood AND the number of each type committed in 2018.

    var crimeTypes = {};
    var CA = $(this).attr("data-value");
    var neighName = $(this).attr("data-name");

    var markers = [];
    var lat = $(this).attr("lat"); 
    var long = $(this).attr("long"); 

    var point = new google.maps.LatLng(lat, long);
    map.setCenter(point);
    map.setZoom(15);
    //marker.setMap(null); //clears markers
    
    $.ajax({
        url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?community_area=" + CA + "&year=2018",
        type: "GET",
        data: {
            "$limit": 20000,
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

        //Report one particular type of crime from the neighborhood by name and list the number
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
                if(crimeTypes[key]> max){
                    max = crimeTypes[key];
                    maxKey = key;
                }
            }
            
            var crimeRate = Math.round((max/data.length)*100).toFixed(0);
            var crimePerCapita = ((max/population)*100).toFixed(2);
            var homicide;
            if (typeof(crimeTypes["HOMICIDE"])=="undefined") {
                homicide = 0;
            }
            else {
                homicide = parseInt(crimeTypes["HOMICIDE"]);
            }
            
            var battery = parseInt(crimeTypes["BATTERY"]);
            var sexAss = parseInt(crimeTypes["CRIM SEXUAL ASSAULT"]);
            var sexOff = parseInt(crimeTypes["SEX OFFENSE"]);
            var robbery = parseInt(crimeTypes["ROBBERY"]);
            var violCrimeRate = (((battery + sexAss + sexOff + robbery + homicide)/population)*100).toFixed(2);
            if (violCrimeRate<1.00) {
                violCrimeRate = " less than 1%"
            }



            // The following prints a report to the document, which includes the name, population,
            // most frequent type of crime (generally theft), # of homicides, and a summary.
            $("#crime-display-table > tbody").append("<tr><td>" + neighName + "</td><td>" + maxKey + "</td><td>" + crimeRate + "</td><td style = 'color: red'>" + homicide + "</td></tr>" + "<tr><td>" + "The most frequent crime in " + neighName + " is " + maxKey + ", which occurs at a rate of " + crimePerCapita + "% per capita, and which comprised " + crimeRate + "% (" + max + "/" + data.length + ") of all crimes in 2018." + "</td></tr>" + "<tr><td>" + "The rate of violent crime (including robbery, battery, sexual assault other sex offenses, and homicide) was " + violCrimeRate + " per capita." + "</td></tr>");

                
            for (var i = 0; i < neighborhoodArray.length; i++) {
                if (neighborhoodArray[i].primary_type == maxKey ) {
                    var pos = new google.maps.LatLng(data[i].latitude, data[i].longitude);

                    markers[i] = new google.maps.Marker({
                        position: pos,
                        map: map,
                        description: neighborhoodArray[i].primary_type,
                        title: maxKey,
                        id: i
                    });
                }
                else if (neighborhoodArray[i].primary_type == "HOMICIDE"){
                    markers[i] = new google.maps.Marker({
                        position: pos,
                        map: map,
                        description: neighborhoodArray[i].primary_type,
                        title: maxKey,
                        icon: 'assets/images/bluemapicon.png',
                        id: i
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: neighborhoodArray[i].primary_type
                    });

                    infowindow.open(map, markers[i]);
                    google.maps.event.addListener(markers[i], 'click', function () {
                        alert(markers[this.id].description)
                    });
                }
            }

        }
        maxCrime();
        
        // *** Goal: to compare the neighborhood crime data to population size
        // in order to create a more user-oriented neighborhood "snapshot"

        // Goal: to create an index of the more violent/disturbing (non-homicide) crimes 

        // database.ref().push({
        //     neighName,
        //     crimeTypes
        // });
    });
});


    
