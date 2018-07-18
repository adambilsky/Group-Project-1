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

// var crimeDisplayTable = document.getElementById("ddlink");
// var linkNeighborhood = crimeDisplayTable.querySelectorAll("a");
// console.log(linkNeighborhood);
// for (i = 0; i < linkNeighborhood.length; i++) {
//     linkNeighborhood[i].addEventListener("click", registerOutput)
// }
// function registerOutput() {
//     console.log(this);
// }
// Create an array of objects, each containing one of 
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

$(".neighborhood").on("click", function () {

    var neighborhoodArray = [];
    var crimeTypes = {};
    var neighborhood = $(this).attr("data-value");
    console.log(neighborhood);

    $.ajax({
        url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
        type: "GET",
        data: {
            "$limit": 25000,
            "$$app_token": "chp9vzClkoQ3bf0yZLoCpG21u"
        }
    }).done(function (data) {
        alert("Retrieved " + data.length + " records from the dataset!");
        for (i = 0; i < data.length; i++) {
            if (parseInt(data[i].community_area) == neighborhood) {
                var CAdata = data[i];
                // console.log(lpdata);
                neighborhoodArray.push(CAdata);
            }
        }
        console.log(neighborhoodArray);

        // This for/if loop creates an array primary crime types 

        for (i = 0; i < neighborhoodArray.length; i++) {
            // var crime = "LincolnPark[i].primary_type";

            if (Object.keys(crimeTypes).indexOf(neighborhoodArray[i].primary_type) < 0) {
                // crimeTypes.push(LincolnPark[i].primary_type);
                crimeTypes[neighborhoodArray[i].primary_type] = 1;
            }
            else {
                crimeTypes[neighborhoodArray[i].primary_type]++;
            }
            // $("#crime-display-table > tbody").append("<tr><td>") + crimeTypes[] + "</td><td>";

        }

        console.log(crimeTypes);
        // for (j = 0; j < LincolnPark.length; j++) {

        // }
    });
});

// Upcoming (1): An event listener on the click/drop-down menu 
// to pass the selected neighborhood string (***
// or the Community Area value directly ***) through the above loop 

// Upcoming (2): A dynamic table creation function 
// to push the results of a search into a readable format.