// function displayCrimes(event) {
    // var crimes= $(this).attr("data-name");
    // var queryUrl= "https://data.cityofchicago.org/resource/6zsd-86xi.json"; 
    // + event.target.innerHTML + "&api_key=nf5pdoAHZWKX52J3AYxlNkSTGlgDVhB7&limit=10"
    $.ajax({
        url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
        type: "GET",
        data: {
          "$limit" : 5000,
          "$$app_token" : "chp9vzClkoQ3bf0yZLoCpG21u"
        }
    }).done(function(data) {
      alert("Retrieved " + data.length + " records from the dataset!");
      for (i=0; i<100; i++) {
        if (data[i].community_area === 7) {
            var lpdata = data[i].community_area;
            console.log(lpdata);
        }
        // else {
        //     alert("There are no records matching the criteria you have chosen.")
        // }
      console.log(data);

    }});    

