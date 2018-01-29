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
		
		const TwitterHandler = require('./source/twitterhandler.js');
		
		TwitterHandler.getTweets(input.query);

	}
	else if(input.command ==='new-tweet'){
		const TwitterHandler = require('./source/twitterhandler.js');
		
		TwitterHandler.postTweet(input.query);

	}
	else if(input.command === 'spotify-this-song'){

		const SpotifyHandler = require('./source/spotifyhandler.js');
		SpotifyHandler.findSong(input.query);
		
	}
	else if(input.command === 'movie-this'){

		console.log('Searching for the movie ' + input.query);

	}


}




processInput(getInput());







