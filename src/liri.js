require("dotenv").config();



function getInput(){

	input = {
		command : process.argv[2],
		query : process.argv[3],
	}

	return input;
}

function processInput(input){


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
	else if(input.command === 'random-song'){
		const SpotifyHandler = require('./spotifyHandler.js');
		SpotifyHandler.randomSong();
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
			'random-song' : 'returns a random spotify song from a pool of songs',
		}
		console.log('Invalid Input! Here are some commands you can run:');
		console.log(commands);

	}


}



processInput(getInput());







