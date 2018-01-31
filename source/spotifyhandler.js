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
		createSong : function(data){
			const Song = {
				artist : '',
				name : data.name,
				album : data.album.name,
				preview_url : data.preview_url,
				parseArtists : function(){
					const Song = this;

					data.artists.map(function(artist){Song.artist += artist.name});

				}
			};

			Song.parseArtists();

			return Song;

		},
		findSong : function(input){
			const SpotifyHandler = this;
			const params = {
				type : 'track',
				query : input,
				limit : 5,
			};

			SpotifyHandler.Spotify.search(params, function(error, data){

				if(error){
					return console.log('Error occurred: ' + error);
				}
				else{
					const Songs = [];
					data.tracks.items.map(function(song){Songs.push(SpotifyHandler.createSong(song))});
					console.log(Songs);
				
				}
			});

		}
	};
	

	SpotifyHandler.Spotify = SpotifyHandler.authenticate();

	return SpotifyHandler;
	
}

module.exports = createSpotifyHandler();