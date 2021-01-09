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
});