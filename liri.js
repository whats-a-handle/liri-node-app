require("dotenv").config();

function getTweets(){

	const createTwitter = require('twitter');
		const twitterCredentials = require("./keys").twitter;
		const Twitter = new createTwitter({
			consumer_key: twitterCredentials.consumer_key,
		  	consumer_secret: twitterCredentials.consumer_secret,
		  	access_token_key: twitterCredentials.access_token_key,
		  	access_token_secret: twitterCredentials.access_token_secret
		});

		const params = {screen_name: input.query};
		Twitter.get('statuses/user_timeline', function(error, tweets, response) {
			if (!error) {
				let parsedTweets = [];
				tweets.map(function(tweet){

					parsedTweets.push(parseTweet(tweet));

				});
				console.log(parsedTweets);
			}});

}

function parseTweet(data){

	const Tweet = {

		author : data.user.name,
		timeStamp : data.user.created_at,
		text : data.text
	}

	return Tweet;
}



function getInput(){

	input = {
		command : process.argv[2],
		query : process.argv[3],
	}

	return input;
}

function processInput(input){


	if(input.command === 'my-tweets'){
		
		getTweets();


	}
	else if(input.command === 'spotify-this-song'){

		const spotifyCredentials = require("./keys").spotify;
		console.log('Searching spotify for ' + input.query);
		
	}
	else if(input.command === 'movie-this'){

		console.log('Searching for the movie ' + input.query);

	}


}




processInput(getInput());







