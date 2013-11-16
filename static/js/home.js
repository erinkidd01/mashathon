/**
 * Set the text to the filename and begin upload and analyze.
 */
"use strict";
function upload(e) {
    // Change the text
    var textBox = document.getElementById('longInput');
    var input = document.getElementById('fileInput');
    var filename = $('input[type=file]').val().split('\\').pop();
    textBox.value = filename;

    // Send the audio file to the server
};


function previewSong(songSrc) {
    var elem = document.getElementById('preview');
    elem.innerHTML = '<audio src="' + songSrc + '" controls="controls">';
};


function chooseSong(songName) {
    var dataObject = { 'filename': songName};

	// Actually submit the rating to the database
    $.ajax({
    	type: 'POST',
    	url: '../player/',
     	data: dataObject,
     	success: function (msg){
            var elem = document.getElementById("response");
     		if (msg.HTTPRESPONSE == 1) {
                elem.innerHTML = 'Successfully uploaded the song. Analyzing...';
            } else {
                elem.innerHTML = 'Failed upload. Please try again.';
            }
      	}
    });
}


/** Submit handler through jquery */
$(document).ready(function() {
    //previewSong("song");

    var fileInput = document.getElementById("fileInput");
    var freader = new FileReader();

    freader.onload = function(e) {
        document.getElementById('player').src = e.target.result;
        document.getElementById('player').play();
    }

    fileInput.onchange = function(e) {
        var files = e.target.files;
        freader.readAsDataURL(files[0]);

        upload();
    }
});
