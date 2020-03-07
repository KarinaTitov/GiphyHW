$(document).ready(function () {


    var topics = ["Cat", "Dog", "Horse", "Skunk", "Kangaroo"];



    function displayGifInfo() {


        var pic = $(this).attr("data-animal");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            pic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&offset=0"


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            //console.log(response);

            var result = response.data;
            // Looping thru data
            for (var i = 0; i < result.length; i++) {
                // Creating and storing a div tag

                var animalDiv = $("<div>");
                animalDiv.addClass("box");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + result[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", result[i].images.fixed_height_still.url);

                animalImage.attr("data-still", result[i].images.fixed_height_still.url);

                animalImage.attr("data-animate", result[i].images.fixed_height.url);

                animalImage.attr("data-state", "still");

                animalImage.addClass("gif");

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page 
                $("#gifs-view").prepend(animalDiv);
            }
        });



    }


    // Function for buttons
    function renderButtons() {


        $("#buttons-view").empty();

        // Looping through the array 
        for (var i = 0; i < topics.length; i++) {

            // Generating buttons
            var a = $("<button>");

            a.addClass("giphy");

            a.attr("data-animal", topics[i]);

            a.text(topics[i]);

            $("#buttons-view").append(a);
        }
    }

    // This function handles events where a gif button is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();


        var gif = $("#gif-input").val().trim();

        // Adding gif from the textbox to our array
        topics.push(gif);


        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "giphy"
    $(document).on("click", ".giphy", displayGifInfo);





    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    // Manipulating the images
    $(".gif").on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});