$(".neighborhood").on("click", function () {

    // An array of neighborhoods by name
    var neighborhoodArray = [];
    
    // A dynamically-created object holding the types of crime 
    // in each reported neighborhood AND the number of each type committed in 2018.

    var crimeTypes = {};
    var neighborhood = $(this).attr("data-value");
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
            if (parseInt(data[i].community_area) == neighborhood) {
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
            // $("#crime-display-table > tbody").append("<tr><td>") + crimeTypes[] + "</td><td>";
        }

        console.log(crimeTypes);
        console.log(Object.keys(crimeTypes));
        database.ref().push({
            neighName,
            crimeTypes
        });
    });
});


// Upcoming (2): A dynamic table creation function 
// to push the results of a search into a readable format.