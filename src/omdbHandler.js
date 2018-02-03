
   const OMDBHandler = {

      OMDB : {},
      
      findMovie : function(movieName){
         const OMDBHandler = this;
         const Request = require('request');
         const searchParam = "&t=" + movieName;
         Request(this.OMDB.queryURL + searchParam,function(error, response,body){

            if(error){
               console.log("Error occurred during search of movie: " + movieName);
               console.log(error);
               console.log("Response Code: " + response);
            }
            else{
               
               console.log(OMDBHandler.parseMovie(body));

            }
            
         });
      },

      createMovie : function(movieData){

         const Movie = {
            title : movieData.Title,
            year : movieData.Year,
            type : movieData.Type,
            plot : movieData.Plot,
            imdbRating : movieData.imdbRating,
            tomatoRating : movieData.tomatoRating,
            country : movieData.Country,
            language : movieData.Language,
            actors : movieData.Actors,     
         }

         return Movie;
      },

      parseMovie : function(data){
         const OMDBHandler = this;
         const Movie = OMDBHandler.createMovie(JSON.parse(data));

         return Movie;
      },

      initializeOMDB : function(){

         this.OMDB.apiKey = require('./keys.js').omdb.key;
         this.OMDB.endpoint = 'https://www.omdbapi.com/';
         this.OMDB.queryURL = this.OMDB.endpoint + '?apikey=' + this.OMDB.apiKey;
         this.OMDB.queryURL += "&plot=short";
         this.OMDB.queryURL += "&tomatoes=true";


      }

	}

OMDBHandler.initializeOMDB();

module.exports = OMDBHandler;



/* Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
   */