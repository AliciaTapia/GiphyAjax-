
//  PSEUDOCODE:

//1st. Create my HTML with the divs and proper ids where my buttons are going to be appended
//2nd. create my initial array of gifs ...
//3rd. create the display function
//4th. Create my render buttons function 
//5th. put some css design 


 // This "document.ready" code isn't necessary in this example... but is useful to become familiar with.
 // "document.ready" makes sure that our Javascript doesn't get run until the HTML document is finished loading.
 // Initial array of giphies

          
$(document).ready(function() {

  var giphies = ["cat"];
  var maxItems = 10;

      
          
         
  $("#add-giphy").on("click", function() {
    // event.preventDefault();
    // This line grabs the input from the textbox
    var name = $("#giphy-input").val().trim();
    console.log("user entry:" + name);
    // Adding movie from the textbox to our array
    giphies.push(name);
    renderButtons();
    $('#giphy-input').val(""); //this one will clear the text box 
    return false;
    });
   

    // Function for button
      function renderButtons() {
        // (this is necessary otherwise you will have repeat buttons)
          $("#buttons-view").empty();
          // Looping through the array of gyphs
              for (var i = 0; i < giphies.length; i++) {
                // Then dynamicaly generating buttons for each gyph in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
               
                var boton = $("<button>");
                // Adding a class of gyph to our button
                boton.addClass("giphy");
                // Adding a data-attribute
                boton.attr("data-name", giphies[i]);
                // Providing the initial button text
                boton.text(giphies[i]);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(boton);
              }
      }// ends renderButtons      
    function displayGiphs(){

        var search= $(this).data('name'); // variable that goes and search for "this" button specific data attr (name)
        console.log("search query" + search);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({ url: queryURL, method: "get" }).done(function(response) {

        $("#giphy-view").empty();
         console.log(response); 

        
        for (i=0; i < maxItems; i++){ //<maxItems 
          var image = $("<img>");
          image.addClass("image");
            image.attr({
                "src": response.data[i].images.fixed_height_still.url,
                "data-still": response.data[i].images.fixed_height_still.url,
                "data-animated": response.data[i].images.fixed_height.url,
                "data-rating": response.data[i].rating,
                "data-state": "still",
            });
                $("#giphy-view").append(image);
      } // end for loop 10 items max
    }); // ends ajax 
  }; // ends displayGiphs

  

$(document).on("click", ".giphy", displayGiphs);

    // at this point images should have some attribute values assigned
    // change from static to animated when clicked on image

    $(document).on("click", ".image", function() {
        console.log("clicked");

        var state = $(this).attr("data-state")
            // console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).data("animated"));
            $(this).attr("data-state", "animated");
        } else {
            // If the clicked image's state is still, update it's src attribute to what it's data-animate value is.
            // Then set the image's data-state to animate
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    }); // end of onclick image

}); // end of document ready function      
    


      
    
      