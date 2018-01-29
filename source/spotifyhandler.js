function createSpotifyHandler(){

	const SpotifyHandler = {

		Spotify : undefined,

		authenticate : function(){

			const createSpotify = require('node-spotify-api');
			const spotifyCredentials = require("./keys").spotify;
			const Spotify = new createSpotify({

				id : spotifyCredentials.id,
				secret : spotifyCredentials.secret, 

			});

			return Spotify;

		},

		findSong : function(input){
			const params = {
				type : 'track',
				query : input,
				limit : 1,
			};

			this.Spotify.search(params, function(error, data){

				if(error){
					return console.log('Error occurred: ' + error);
				}
				else{

					console.log(data.tracks);
				}
			});

		}
	};
	

	SpotifyHandler.Spotify = SpotifyHandler.authenticate();

	return SpotifyHandler;
	
}

module.exports = createSpotifyHandler();