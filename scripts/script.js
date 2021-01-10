$(document).ready(function () {
	$("#send-song-artist-name").click(function () {
		$("#info").empty();

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
			findSimilarArtist(data, token);
		}
	});
}

function findSimilarArtist(data, token) {
	let artistID = data.artists.items[0].id

	$.ajax({
		method: 'GET',
		url: `https://api.spotify.com/v1/recommendations?limit=90&seed_artists=${artistID}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		success: function(artistData) {
			console.log(artistData);
			similarArtistToScreen(artistData);
		}
	})
}

// The bottom function obtains details about the song, artist, album, or any other music detail based on returned spotify 
// search results
function findDetails(artistTag, artistSpotify, id) {
	let artist = $(artistTag).text();

	$.ajax({
		type: 'GET',
		url: `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist.toLowerCase()}`,
		success: function(data) {
			if (data.artists === null) {
				console.log(`Artist ${$(id).text()} not found in database.`);
			}

			else {
				console.log(`Artist ${$(id).text()} found in database.`);
				artistDetailsToScreen(data, id, artistSpotify);
			}
		},
		error: function() {
			alert('Error accessing database.');
			console.log("Error accessing database");
		}
	});
}

function similarArtistToScreen(data) {
	var allArtists = []
	let artistVals = []
	var artistOrder = []

	$('#info').append("<h1 class='text-center display-6 text-muted fw-lighter colors-1' id='arrow'>V Scroll Down V</h1><h2 class='text-center display-4 colors-1' id='recommended-artists'>Recommended Artists</h2><br>");

	x = 1
	for (i = 0; i < data.tracks.length; i++) {

		if (allArtists.includes(data.tracks[i].artists[0].name) == false) {
			$('#info').append(`<div class="text-center"><button class="colors-1 button-no-borders fw-light fs-5" id="artist-${i}">${data.tracks[i].artists[0].name}</button><br><div id="id-artist-${i}" class="fw-light fs-6 d-grid gap-2 col-8 mx-auto details colors-2"></div><br><br></div>`);
			artistVals.push(`#artist-${x}`);
			artistOrder.push(i);
			allArtists.push(data.tracks[i].artists[0].name);
			x++;
		}
	}

	$("#info").click(function(e) {
		let targetID = e.target.id
		let id = `#id-${targetID}`
		let order = `#${targetID}`
		console.log(id);
		let artistSpotify = data.tracks[0].artists[0].external_urls.spotify
		
		findDetails(order, artistSpotify, id);
	});
}

function artistDetailsToScreen(data, artistTag, artistSpotify) {
	$('.description').empty();

	allArtistFacts = data.artists[0]
	artistFacts = [
		allArtistFacts.strArtistAlternate,
		allArtistFacts.strGenre,
		allArtistFacts.strStyle,
		allArtistFacts.strMood,
		allArtistFacts.intFormedYear,
		allArtistFacts.intDiedYear,
		allArtistFacts.intMembers,
		allArtistFacts.strCountry,
		allArtistFacts.strGender,
		allArtistFacts.strBiographyEN
	]

	for (i = 0; i < artistFacts.length; i++) {
		if (artistFacts[i] == "") {
			artistFacts[i] = "null"
		}
	}

	console.log("artist-tag " + artistTag)
	console.log($('#artist-0'))
	console.log("all artist facts " + artistFacts[9])

	$(artistTag).append(
		`
		<p class="description">Alternate Name: ${artistFacts[0]}</p>
		<p class="description">Genre: ${artistFacts[1]}</p>
		<p class="description">Style: ${artistFacts[2]}</p>
		<p class="description">Mood: ${artistFacts[3]}</p>
		<p class="description">When They Formed: ${artistFacts[4]}</p>
		<p class="description">When They Disbanded: ${artistFacts[5]}</p>
		<p class="description">No. of Members: ${artistFacts[6]}</p>
		<p class="description">Country of Origin: ${artistFacts[7]}</p>
		<p class="description">Gender: ${artistFacts[8]}</p>
		<p class="description">Biography: ${artistFacts[9]}</p>

		<form action='${artistSpotify}' method="get" class="d-grid gap-2 col-3 mx-auto description" target="_blank">
		<button type="submit" class="btn btn-outline-secondary" id="artist-spotify">Artist's Spotify Profile</button>
		`
	);

	// $("#details").click(function() {
	// 	$('.description').empty();
	// });

	$(artistTag).click(function() {
		$('.description').empty();
		unclick = false
	});
}
