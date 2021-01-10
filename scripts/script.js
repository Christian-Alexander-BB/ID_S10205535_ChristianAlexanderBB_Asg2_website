$(document).ready(function () {
	$("#send-song-artist-name").click(function () {
		let musicDetail = $("#song-artist-name").val();
		let category = "artist"

		const clientID = "6642631f98474b689bf4baf30817a702"
		const clientSecret = "2ec5414d075b427eadeb0282b66e2c19"
	
		let settings = {
			method: 'POST',
			url: "https://accounts.spotify.com/api/token",
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
	
		getSpotifyToken(settings, musicDetail);

	});
})

// The bottom function obtains a Spotify access token to access its' database
function getSpotifyToken(settings, musicDetail) {
	$.ajax(settings).done(function (data){
		let accessToken = data.access_token;

		getSongOrArtist(accessToken, musicDetail);
	})
};

// The bottom function allows people to search a song
function getSongOrArtist(token, musicDetail) {
	$.ajax({
		method: 'GET',
		url: `https://api.spotify.com/v1/search?q=${musicDetail}&type=artist,track,album`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		success: function(data) {
			console.log("artist info");
			console.log(data);

			findSimilarArtist(data, token);
			artist = data.artists.items[0].name
			category = "artist"
			findDetails(artist, category);
		}
	});
}

function findSimilarArtist(data, token) {
	let artistID = data.artists.items[0].id

	$.ajax({
		method: 'GET',
		url: `https://api.spotify.com/v1/recommendations?seed_artists=${artistID}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		success: function(artistData) {
			console.log("similar artists");
			console.log(artistData);
			
			similarArtistToScreen(artistData);
		}
	})
}

// The bottom function obtains details about the song, artist, album, or any other music detail based on returned spotify 
// search results
function findDetails(musicDetail, category) {
	if (category == "artist") {
		$.ajax({
			type: 'GET',
			url: `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${musicDetail.toLowerCase()}`,
			success: function(data) {
				if (data.artists === null) {
					console.log('artist not found in database');
					console.log(musicDetail);
				}

				else {
					console.log("artist found in database");
					console.log(data);
				}
			},
			error: function() {
				alert('error accessing database');
			}
		});
	}
}

function similarArtistToScreen(data) {
	var artists = []
	$('#test').append("<b>Recommended Artists<b><br>");

	for (i = 1; i < data.tracks.length; i++) {

		if (artists.includes(data.tracks[i].artists[0].name) == false) {
			$('#test').append(data.tracks[i].artists[0].name + "<br>");
			artists.push(data.tracks[i].artists[0].name);
		}
	}
}