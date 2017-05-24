document.addEventListener("DOMContentLoaded", function(event) {

	var inner1 = document.getElementById("jsInner1");
	var inner2 = document.getElementById("jsInner2");
	var inner3 = document.getElementById("jsInner3");

	var counter = document.getElementById("jsCounter");
	var start = document.getElementById("jsStart");
	var strict = document.getElementById("jsStrict");
	var strictLight = document.getElementById("jsStrictLight");
	var power = document.getElementById("jsPower");

	var blue = {colorName: 'Blue', color: '#0997F2', sound: document.getElementById("jsSound1"), button: document.getElementById("jsBlue")};
	var red = {colorName: 'Red', color: '#EA3626', sound: document.getElementById("jsSound2"), button: document.getElementById("jsRed")};
	var yellow = {colorName: 'Yellow', color: '#FDF014', sound: document.getElementById("jsSound3"), button: document.getElementById("jsYellow")};
	var green = {colorName: 'Green', color: '#0CB54A', sound: document.getElementById("jsSound4"), button: document.getElementById("jsGreen")};

	var colors = [blue, red, yellow, green];

	var gameLength = 20;

	var computerSequence = [];
	var humanSequence = [];

	var deviceOn = false;
	var strictOn = false;

	function fadeOut(element) {

		var op = 1;  // initial opacity

		var timer = setInterval(function () {

			if (op <= 0.1) {

				clearInterval(timer);

				element.style.display = 'none';

				element.style.opacity = op;

			}

			element.style.opacity = op;

			element.style.filter = 'alpha(opacity=' + op * 100 + ")";

			op -= op * 0.1;

		}, 40);

	}

	function fadeIn(element) {

		var op = 0.1;  // initial opacity

		element.style.display = 'flex';

		var timer = setInterval(function () {

			if (op >= 1) {

				clearInterval(timer);

			}

			element.style.opacity = op;

			element.style.filter = 'alpha(opacity=' + op * 100 + ")";

			op += op * 0.1;

		}, 20);

	}	


	function powerOn() {

		inner1.style.display = 'flex';	

		deviceOn = true;

		counter.innerHTML = '--';

		power.classList.add('on');

		start.addEventListener("click", startGame);
		start.addEventListener("mouseover", addHoverStyle);
		start.addEventListener("mouseout", removeHoverStyle);
		start.addEventListener("mousedown", addClickStyle);
		start.addEventListener("mouseup", removeClickStyle);

		strict.addEventListener("click", strictMode);
		strict.addEventListener("mouseover", addHoverStyle);
		strict.addEventListener("mouseout", removeHoverStyle);
		strict.addEventListener("mousedown", addClickStyle);
		strict.addEventListener("mouseup", removeClickStyle);		

	}


	power.addEventListener("click", function(x) {

		if (!deviceOn) {

			powerOn();

		} else {

			deviceOn = false;

			counter.innerHTML = '';

			this.classList.remove('on');

			start.removeEventListener("click", startGame);
			start.removeEventListener("mouseover", addHoverStyle);
			start.removeEventListener("mouseout", removeHoverStyle);
			start.removeEventListener("mousedown", addClickStyle);
			start.removeEventListener("mouseup", removeClickStyle);

			strict.removeEventListener("click", strictMode);
			strict.removeEventListener("mouseover", addHoverStyle);
			strict.removeEventListener("mouseout", removeHoverStyle);
			strict.removeEventListener("mousedown", addClickStyle);
			strict.removeEventListener("mouseup", removeClickStyle);	

			strictLight.classList.remove("on");

		}
		

	});


	function startGame() {

		computerSequence = [];

		humanSequence = [];

		counter.innerHTML = '--';

		removeClasses();

		colors.forEach(removeAllEventListeners);

		addToSequence();		

	};


	function strictMode() {

		if (!strictOn) {

			strictOn = true;
			strictLight.classList.add("on");
		
		} else {

			strictOn = false;
			strictLight.classList.remove("on");

		}

	}


	function colorVars(x) {

		if ( x === blue.button ) color = blue;
		if ( x === red.button ) color = red;
		if ( x === yellow.button ) color = yellow;
		if ( x === green.button ) color = green;

	}


	function addHoverStyle() {

		this.classList.add('hover');

	}

	function removeHoverStyle() {

		this.classList.remove('hover');

	}

	function addClickStyle() {

		this.classList.add('click');

	}

	function removeClickStyle() {

		this.classList.remove('click');

	}


	function mousedownColorButton() {

		colorVars(this);

		color.sound.play();

		color.button.classList.add('click');

	}


	function mouseoverColorButton() {

		colorVars(this);

		color.button.classList.add('hover');

	}	

	function mouseoutColorButton() {

		colorVars(this);

		color.button.classList.remove('hover');

	}


	function addAllEventListeners(color) {

		color.button.addEventListener("mousedown", mousedownColorButton);
		color.button.addEventListener("mouseup", mouseupColorButton);
		color.button.addEventListener("mouseover", mouseoverColorButton);
		color.button.addEventListener("mouseout", mouseoutColorButton);

	}


	function removeAllEventListeners(color) {

		color.button.removeEventListener("mousedown", mousedownColorButton);
		color.button.removeEventListener("mouseup", mouseupColorButton);
		color.button.removeEventListener("mouseover", mouseoverColorButton);
		color.button.removeEventListener("mouseout", mouseoutColorButton);		

	}


	function mouseupColorButton() {

		colorVars(this);

		color.button.classList.remove('click');

		humanSequence.push(color);
		var index = humanSequence.length - 1;

		//var readableSequence = [];
		//humanSequence.forEach(x => readableSequence.push(x.colorName));
		//console.log("Human: ", readableSequence);

		if (humanSequence[index] !== computerSequence[index]) {

			color.button.classList.remove('hover');
			color.button.classList.remove('click');

			counter.innerHTML = '!!';

			inner1.style.display = 'none';
			inner3.style.display = 'flex';
			inner3.style.opacity = 1;		

			humanSequence = [];

			setTimeout(function() {  

				inner1.style.opacity = 0;

				fadeIn(inner1);

				fadeOut(inner3);				

				if (!strictOn) {
				
					playSequence();
				
				} else {

					startGame();

				}

			}, 1000);


		} else if (humanSequence.length === gameLength) {

			colors.forEach(removeAllEventListeners);
			removeClasses();

			inner1.style.display = 'none';
			inner2.style.display = 'flex';
			inner2.style.opacity = 1;

			var reps = 6;
			var ms = 200;

			for (i=0, j=0; i<reps; i++, j = j + (4 * ms)) {

				setTimeout(function() {  

					blue.button.classList.remove('click');
					red.button.classList.add('click');

				}, j);

				setTimeout(function() {  

					red.button.classList.remove('click');
					green.button.classList.add('click');

				}, j + ms);

				setTimeout(function() {  

					green.button.classList.remove('click');
					yellow.button.classList.add('click');

				}, j + (2 * ms));

				setTimeout(function() {  

					yellow.button.classList.remove('click');

					blue.button.classList.add('click');

				}, j + (3 * ms));	

			}	

			setTimeout(function() {  

				blue.button.classList.remove('click');

				inner1.style.opacity = 0;

				fadeIn(inner1);

				fadeOut(inner2);

				powerOn();

			}, reps * (4 * ms));							


		} else if (humanSequence.length === computerSequence.length) {

			colors.forEach(removeAllEventListeners);
			removeClasses();

			humanSequence = [];

			setTimeout(function() {  

				addToSequence();

			}, 1000);

		} else {
		
			//console.log("Go on my friend...");

		}

	}




	function leadingZero(num, size) {

		var s = "0" + num;

		return s.substr(s.length-size);

	}	


	function removeClasses() {

		colors.forEach(function(color) {

			color.button.classList.remove('hover');
			color.button.classList.remove('click');

		});

	}


	function addToSequence() {

		var x = colors[Math.floor(Math.random()*colors.length)];
		computerSequence.push(x);

		//var readableSequence = [];
		//computerSequence.forEach(x => readableSequence.push(x.colorName));
		//console.log(readableSequence);

		setTimeout(function() {  

			playSequence();

		}, 300);

	}


	function playSequence() {

		counter.innerHTML = leadingZero(computerSequence.length, 2);
	
		colors.forEach(removeAllEventListeners);

		var index = 0;

		var interval = setInterval(function() {

			computerSequence[index].button.classList.add('click');
			computerSequence[index].sound.play();

			setTimeout(function() {  

				computerSequence[index].button.classList.remove('click');
				index = index + 1;


			}, 500);
			
			if (index === computerSequence.length - 1) {

				clearInterval(interval);

				colors.forEach(addAllEventListeners);

			}			

		}, 1000);


	}




});











