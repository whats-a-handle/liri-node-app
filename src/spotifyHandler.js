	const SpotifyHandler = {

		Spotify : undefined,

		authenticate : function(){

			const createSpotify = require('node-spotify-api');
			const spotifyCredentials = require("./keys").spotify;
			const Spotify = new createSpotify({

				id : spotifyCredentials.id,
				secret : spotifyCredentials.secret, 

			});

			this.Spotify = Spotify;

		},
		parseArtists : function(data){
			const artists = [];
			
			data.artists.map(function(artist){artists.push(artist.name)});

			return artists;
		},
		createSong : function(data){
			const Song = {
				artist : [],
				name : data.name,
				album : data.album.name,
				preview_url : data.preview_url,
				
			};

			Song.artist = this.parseArtists(data);
			

			return Song;

		},
		findSong : function(input){

			if(input === undefined || input === null || input === ''){
				input = 'Ace of Spades';
				console.log('Returning default song: ' + input);
			}
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

		},
	};
	

	SpotifyHandler.authenticate();

	
	


module.exports = SpotifyHandler;
