	const SpotifyHandler = {

		Spotify : undefined,
		randomFile : 'random.txt',

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

		randomSong : function(){
			const FS = require('fs');
			const SpotifyHandler = this;
			FS.readFile(SpotifyHandler.randomFile,'utf-8', function (error, text){

				if(error){
					console.log('Error reading from file ' + randomFile);
					console.log(error);
				}
				else{
					const randomSongArray = text.split(',');
					SpotifyHandler.findSong(randomSongArray[Math.floor(Math.random() * randomSongArray.length )]);
					
				}
			});

		}
	};
	

	SpotifyHandler.authenticate();

	
	


module.exports = SpotifyHandler;
