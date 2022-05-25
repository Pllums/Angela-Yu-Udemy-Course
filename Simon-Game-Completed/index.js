var gameStarted = false;
var level = 0;
var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

$(document).on("keydown", function () {
	if (!gameStarted) {
		$("h1").text("Level " + level);
		nextSequence();
		gameStarted = true;
	}
});

$(".btn").click(function (event) {
	var userChosenColor = $(this).attr("id");
	userPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userPattern.length - 1);
});

function animatePress(currentColor) {
	//Selecting an ID of a div to add the pressed animation too
	$("#" + currentColor).addClass("pressed");
	setTimeout(() => {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	//Checking the users answer against the game pattern
	if (gamePattern[currentLevel] === userPattern[currentLevel]) {
		console.log("success");

		//Starting the next round if the user input the correct sequence
		if (userPattern.length === gamePattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}

		//Logging if the player input the wrong sequence
	} else {
		console.log("wrong");
		$("h1").text("Game Over, press any key to restart");
		var loseSound = new Audio("./sounds/wrong.mp3");
		loseSound.play();
		$("body").addClass("game-over");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);
		restart();
	}
}

function nextSequence() {
	//setting the gameStarted state to true
	gameStarted == true;

	//resetting the userPattern array.
	userPattern = [];

	level++;
	$("h1").text("Level " + level);

	var randomColor =
		buttonColors[Math.floor(Math.random() * buttonColors.length)];
	gamePattern.push(randomColor);

	$("#" + randomColor)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomColor);
	$("h1").text("Level " + level);
}

function playSound(name) {
	var sound = new Audio("sounds/" + name + ".mp3");
	sound.play();
}

function restart() {
	level = 0;
	gamePattern = [];
	gameStarted = false;
}
