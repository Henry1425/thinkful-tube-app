 $(document).ready(function () {
     // 1. get input from the user
     $(".search-results").submit(function (event) {
         event.preventDefault(); // Prevents the submittion to the back-end-- instead JS handles it
         getResults($("#query").val()); // gets the value from the user
     });
     // 2. getting input from the user make the api call.
     function getResults(query) { //query is a parameter which is also used on line 13 bcause it's a parameter we don't use quotes.
         $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                 part: "snippet", //part: are called keys "snippet", is called value //Youtube API special parameter (please check documentation here https://developers.google.com/youtube/)
                 maxResults: 20, //number of results per page
                 key: "AIzaSyCclIq-RF7zhCJ_JnoXJBLdGvz-v2nzCB0",
                 q: query, //search query from the user
                 type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
             },
             function (data) {
                 //show the json array received from the API call
                 console.log(data); // not used in production because you don't want to show all the data the console.log is cancelled
                 // If there are no results it will just empty the list
                 if (data.pageInfo.totalResults == 0) { // pageInfo & totalResults come from the API data.
                     alert("No videos found!");
                 }
                 //if there are results, call the displaySearchResults
                 displaySearchResults(data.items); // we put a .dot in front of item because it's a sub-array or a child of data.
             }
         );
     }
     // 3. using the api call, and show the results to the user.
     function displaySearchResults(videosArray) {

         //create an empty variable to store one LI for each one the results
         var buildTheHtmlOutput = "";

         $.each(videosArray, function (videosArrayKey, videosArrayValue) {
             //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
             buildTheHtmlOutput += "<li>";
             buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>"; //output vide title
             buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>"; //taget blank is going to open the video in a new window
             buildTheHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>"; //display video's thumbnail
             buildTheHtmlOutput += "</a>";
             buildTheHtmlOutput += "</li>";
         });

         //use the HTML output to show it in the index.html
         $("#search-results ul").html(buildTheHtmlOutput);
     }
 });
