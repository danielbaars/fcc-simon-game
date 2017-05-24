



function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

window.onload = init;
var context;
var bufferLoader;

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      'simonSound1.mp3',
      'simonSound2.mp3',
      'simonSound3.mp3',
      'simonSound4.mp3',      
    ],
    finishedLoading
    );

  bufferLoader.load();


}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  var source1 = context.createBufferSource();
  var source2 = context.createBufferSource();
  var source3 = context.createBufferSource();
  var source4 = context.createBufferSource();  
  source1.buffer = bufferList[0];
  source2.buffer = bufferList[1];
  source3.buffer = bufferList[2];
  source4.buffer = bufferList[3];  

  source1.connect(context.destination);
  source2.connect(context.destination);
  source3.connect(context.destination);
  source4.connect(context.destination);  
  //source1.start(0);
  //source2.start(0);
  //source3.start(0);
  //source4.start(0);  


	var sound1 = document.getElementById("jsSound1");
	var blue = document.getElementById("jsBlue");

	var sound2 = document.getElementById("jsSound2");
	var red = document.getElementById("jsRed");

	var sound3 = document.getElementById("jsSound3");
	var yellow = document.getElementById("jsYellow");

	var sound4 = document.getElementById("jsSound4");
	var green = document.getElementById("jsGreen");		

	var numbers = [0, 1, 2, 3];
	var sounds = [sound1, sound2, sound3, sound4];
	var buttons = [blue, red, yellow, green]; 
	
	blue.addEventListener("click", function() {

		//sound1.play();
		source1.start(0);

	});

	red.addEventListener("click", function() {

		sound2.play();

	});

	yellow.addEventListener("click", function() {

		sound3.play();

	});		


	green.addEventListener("click", function() {

		sound4.play();

	});

	var sequence = [];

	function generateSequence() {

		for (i=0; i<4; i++) {

			var x = numbers[Math.floor(Math.random()*numbers.length)];
			sequence.push(x);

		}

	}

	generateSequence();
	console.log(sequence);

	function playSequence() {

	    for (i=0, j=500; i<sequence.length; i++, j=j+700) { (function(i, j) {

	            setTimeout(function() {  

	                sounds[sequence[i]].play();
	                console.log(buttons[sequence[i]].classList);
	                buttons[sequence[i]].classList.add("hover");

	            }, j);

	        })(i, j);

	    }

	}

	//playSequence();  
}
	














