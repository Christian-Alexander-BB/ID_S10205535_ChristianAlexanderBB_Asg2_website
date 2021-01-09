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

		// $.ajax({
	// 	type: 'GET',
	// 	url: 'https://api.spotify.com/v1/search?q=tania%20bowra&type=artist',
	// 	contentType: "application/json",
	// 	headers: {
	// 		"Accept": "application/json",
	// 		"content-type": "application/json",
	// 		"Authorization": "Bearer    BQCWRewmJQJFNJohKwd-X46pldWI551uTdD3C9RKnp3iRsuzNVnYBZJGTTvSwUuvHY6wwruLxp9hCziARaYT0WPoTvVH4xhiozALIl7JJUC_iK8CFo3HDnYHQAH vkWkY8O4rNT0ROYziB_gN0PM8O6cmcol2Lk"
	// 	}
	// })

var clientID = "6642631f98474b689bf4baf30817a702"
var clientSecret = "2ec5414d075b427eadeb0282b66e2c19"
var accessToken = ""

	$.ajax({
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
			console.log(data);
			accessToken = data.access_token;
			console.log(accessToken)
		}
	});
});