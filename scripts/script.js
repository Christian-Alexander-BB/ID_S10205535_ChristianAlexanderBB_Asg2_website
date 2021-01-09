$(document).ready(function () {
	var artist = 0;

	$("#send-song-artist-name").click(function () {
		artist = $("#song-artist-name").val();
		console.log(artist);

		// The bottom code obtains data from the api in url and sees if the artist is found in the database

		$.ajax({
			type: 'GET',
			url: `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`,
			success: function(data) {
				if (data.artists === null) {
					console.log('artist not found in database');
					$('#test').append('not found');
				}
	
				else {
					console.log("artist found in database");
				}
			},
			error: function() {
				alert('error accessing database');
			}
		});
	});


	var clientID = "6642631f98474b689bf4baf30817a702"
	var clientSecret = "2ec5414d075b427eadeb0282b66e2c19"
	var accessToken = ""

	let settings = {
		method: 'POST',
		url: "https://accounts.spotify.com/api/token",
		timeout: 0,
		data: {
			grant_type: "client_credentials"
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + btoa(clientID + ":" + clientSecret)
		},
		success: function(data) {
			console.log("Spotify Validation Successful");
		}
	}

	$.ajax(settings).done(function (data){
		console.log(data);
		let accessToken = data.access_token;

		getSongOrArtist(accessToken)
	})

	function getSongOrArtist(token) {
		$.ajax({
			method: 'GET',
			url: "https://api.spotify.com/v1/search?q=ed&type=artist",
			// timeout: 0,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			}
		}).done(function (data) {
			console.log(data);
		});
	}
});