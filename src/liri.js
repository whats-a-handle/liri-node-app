require("dotenv").config();

function createLiri(){

	const Liri = {
		randomFile : 'random.txt',

		getInput : function(){

			input = {
				command : process.argv[2],
				query : process.argv[3],
			}

			return input;
		},

		processInput: function(input){


		if(input.command === 'my-tweets'){	
			const TwitterHandler = require('./twitterHandler.js');
			TwitterHandler.getTweets(input.query);
		}
		else if(input.command ==='new-tweet'){
			const TwitterHandler = require('./twitterHandler.js');	
			TwitterHandler.postTweet(input.query);
		}
		else if(input.command === 'spotify-this-song'){

			const SpotifyHandler = require('./spotifyHandler.js');
			SpotifyHandler.findSong(input.query);
			
		}
		else if(input.command === 'do-what-it-says'){
			this.processRandomCommand();
		}
		else if(input.command === 'movie-this'){
			const OMDBHandler = require('./omdbHandler.js');
			OMDBHandler.findMovie(input.query);
		}
		else{

			const commands = {
				'my-tweets' : 'returns a list of your 20 most recent tweets',
				'new-tweet' : 'enter a new tweet to post',
				'spotify-this-song' : 'enter a song to search',
				'movie-this' : 'enter a movie to search',
				'do-what-it-says' : 'fires a random command and argument from random.txt',
			}
			console.log('Invalid Input! Here are some commands you can run:');
			console.log(commands);

		}


	},

	processRandomCommand: function(){
		const FS = require('fs');
		const Liri = this;
		FS.readFile(Liri.randomFile,'utf-8', function (error, text){

			if(error){
				console.log('Error reading from file ' + randomFile);
				console.log(error);
			}
			else{
				const randomCommands = text.split('\n');
				const randomSelection = randomCommands[Math.floor(Math.random() * randomCommands.length)];
				const splitParamters = randomSelection.split(',');
				const parameters = {
					command:splitParamters[0],
					query : splitParamters[1],
				};

				Liri.processInput(parameters);
					
			}
		});
	},


	}

	return Liri;

}



const Liri = createLiri();



Liri.processInput(Liri.getInput());







