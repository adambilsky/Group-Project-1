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


    // else {
    //     alert("There are no records matching the criteria you have chosen.")
    // }
    // console.log(data);

});    
