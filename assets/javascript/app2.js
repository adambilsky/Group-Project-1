// Basic JS functions for branch "create-javasript"

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
var LincolnPark = [];

$.ajax({
    url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
    type: "GET",
    data: {
        "$limit": 5000,
        "$$app_token": "chp9vzClkoQ3bf0yZLoCpG21u"
    }
}).done(function (data) {
    alert("Retrieved " + data.length + " records from the dataset!");
    for (i = 0; i < data.length; i++) {
        if (parseInt(data[i].community_area) === 7) {
            var lpdata = data[i];
            // console.log(lpdata);
            LincolnPark.push(lpdata);
        }
    }
    console.log(LincolnPark);
   
    // This for/if loop creates an array primary crime types 

    var crimeTypes = [];
    for (i = 0; i < LincolnPark.length; i++) {
        // var crime = "LincolnPark[i].primary_type";
        if (crimeTypes.indexOf(LincolnPark[i].primary_type) == -1) {
            crimeTypes.push(LincolnPark[i].primary_type);
        }
    }
    // for (j = 0; j < LincolnPark.length; j++) {

    // }
    console.log(crimeTypes);
    console.log(crimeTypes[0]);

    // The variable crimeSpec holds the current count of each crime
    // as the following for/if loop iterates through the results for
    // a particular neighborhood (Lincoln Park is the test case.
    // "LincolnPark" will be replaced by a variable when the drop-down
    // menu is complete.)
    var crimeSpec = 0;
    for (c = 0; c < crimeTypes.length; c++) {
        for (i = 0; i < LincolnPark.length; i++) {
            if (i = crimeTypes[c]) {
                crimeSpec++
            }
        }
        // The below console.log will be replaced by a dynamically created table.
        // Each row will be populated by a complete iteration of the "c" variable
        // and its temporary count. The id "crime-display-table" does not yet exist.
        console.log("Total number of crimes of type " + crimeTypes[c] + ": " + crimeSpec);
        // $("#crime-display-table > tbody").append("<tr><td>" + crimeTypes[c] + "</td><td>" + crimeSpec + "</td></tr>");

    }
});    

// Upcoming (1): An event listener on the click/drop-down menu 
// to pass the selected neighborhood string (***
// or the Community Area value directly ***) through the above loop 

// Upcoming (2): A dynamic table creation function 
// to push the results of a search into a readable format.