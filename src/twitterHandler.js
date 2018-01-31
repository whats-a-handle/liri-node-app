	const TwitterHandler = {

		Twitter : undefined,

		getTweets : function(){

			const Twitter = this.Twitter;
			const TwitterHandler = this;
			const params = {
				
				count : 20,
			}
			
			Twitter.get('statuses/user_timeline', function(error, tweets, response) {
				if (!error) {
					let parsedTweets = [];
					tweets.map(function(tweet){

						parsedTweets.push(TwitterHandler.parseTweet(tweet));

					});
					console.log(parsedTweets);
				}});

		},
		parseTweet : function(data){

			const Tweet = {

				author : data.user.name,
				timeStamp : data.created_at,
				text : data.text
			}

			return Tweet;
		},	
		postTweet : function(input){

			const Twitter = this.Twitter;
			const TwitterHandler = this;
			const params = {status: input};
				Twitter.post('statuses/update',params, function(error, tweet, response) {
					if (!error) {
						let parsedTweets = [];
							parsedTweets.push(TwitterHandler.parseTweet(tweet));
						console.log(parsedTweets);
				}});
		},

		authenticateTwitter : function(){

			const createTwitter = require('twitter');
			const twitterCredentials = require("./keys.js").twitter;
			const Twitter = new createTwitter({
				consumer_key: twitterCredentials.consumer_key,
			  	consumer_secret: twitterCredentials.consumer_secret,
			  	access_token_key: twitterCredentials.access_token_key,
			  	access_token_secret: twitterCredentials.access_token_secret
			});

			this.Twitter = Twitter;
		},
	};

	TwitterHandler.authenticateTwitter();



module.exports = TwitterHandler;
