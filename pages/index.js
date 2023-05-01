/* || general */
function sleep(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

function randInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

async function typingTittle() {
  let typingTitle = "Welcome To LoTuX CTF ! ";
  let typingTitleObj = document.getElementById('typing-title');
  for (let char of typingTitle) {
    await(sleep(randInt(50, 200)));
    typingTitleObj.innerHTML += char;
  }
}

async function mainAnimation() {
  document.querySelector('#link-bar a:nth-child(2)').classList.add('fade-in-left');
  document.querySelector('#link-bar a:nth-child(3)').classList.add('fade-in-right');
  await sleep(90);
  document.querySelector('#link-bar a:nth-child(1)').classList.add('fade-in-left');
  document.querySelector('#link-bar a:nth-child(4)').classList.add('fade-in-right');
  await sleep(30);
  document.getElementById('flag-format').classList.add('fade-in-bottom');
  await sleep(60);
  document.getElementById('game-container').classList.add('fade-in-bottom');
  await sleep(110);
  document.getElementById('contact-info').classList.add('fade-in-bottom');
}

async function gameAnimation() {
  document.getElementById('grid-container').classList.add('game-grid-container');
  await sleep(250);
  document.querySelector('h2').classList.add('fade-in-top');
  await sleep(450);
  document.querySelector('.arrow-btn:nth-child(1)').classList.add('fade-in-top');
  await sleep(60);
  document.querySelector('#bottom-button button:nth-child(1)').classList.add('fade-in-left');
  document.querySelector('#bottom-button button:nth-child(3)').classList.add('fade-in-right');
  await sleep(30);
  document.querySelector('#bottom-button button:nth-child(2)').classList.add('fade-in-bottom');
  await sleep(60);
  document.querySelector('.function-btn:nth-child(1)').classList.add('fade-in-left');
  document.querySelector('.function-btn:nth-child(2)').classList.add('fade-in-right');
}

async function onloadAnimation() {
  await sleep(1250);
  await typingTittle();
  await sleep(250);
  await mainAnimation();
  if (window.innerWidth > 991) {
    await sleep(750);
    await gameAnimation();
  }
}

window.addEventListener("load", function(event) {
  onloadAnimation();
})

// disable right click and F12
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function (e) {
    if(e.code == "F12") {
        return false;
    }
}

// grid
var focusBoxIdx = 0;
var right_array = [1, 2, 15, 16, 17, 18, 19, 20, 21, 22, 30, 31, 36, 37, 42, 43, 44, 47, 59, 62, 63, 64, 65, 66, 71, 72, 84, 85, 86, 87, 101, 102, 103, 104, 105, 106, 107, 110, 111, 112, 117, 118, 134, 135, 147, 148, 151, 152, 158, 163, 164, 174, 175, 182, 183, 187, 188, 198, 199, 204, 205, 217, 218, 228, 233, 234, 250, 251, 264, 265, 266, 267, 272, 273, 280, 281, 285, 289, 290, 296, 297, 298, 303, 304, 314, 315, 318, 320, 321, 333, 334, 335, 336, 337, 338, 339, 345, 346, 349, 350, 359, 360, 361, 362, 366, 367, 371, 372, 375, 376, 380, 381, 382, 383, 388, 389, 397, 400, 401, 402, 405, 412, 413, 414, 419, 420, 424, 425, 426, 427, 430, 431, 433, 436, 437, 441, 442, 444, 445, 449, 450, 451, 452, 453, 454, 455, 461, 462, 465, 466, 474, 475, 478, 479, 482, 483, 487, 488, 491, 492, 495, 496, 499, 500, 506, 513, 514, 516, 518, 520, 521, 530, 531, 535, 536, 539, 540, 546, 547, 552, 553, 556, 559, 562, 565, 566, 576, 581, 582, 583, 584, 585, 586, 587, 588, 591, 592, 593, 594, 598, 599, 604, 605, 606, 607, 610, 611, 616, 617, 622, 623, 624, 630, 631, 635, 636, 642, 643, 644, 645, 646, 651, 652, 656, 657, 658, 659, 664, 665, 666, 667, 672, 675, 678, 681, 682, 683, 684, 685, 686, 687, 690, 691, 692];

// add focus box
function addFocusBox(boxIdx) {
	document.querySelector(`.grid-box:nth-child(${boxIdx + 1})`).classList.add('grid-box-focus');
}

// record box
function recordBox(boxIdx) {
	element = document.querySelector(`.grid-box:nth-child(${boxIdx + 1})`);
	if (element.classList.contains('grid-box-focus')) {
		element.classList.remove('grid-box-focus');
	}
	if (element.classList.contains('grid-box-right') || element.classList.contains('grid-box-wrong')) {
		return;
	}
	if (right_array.includes(boxIdx)) {
		element.classList.add('grid-box-right');
	}
	else {
		element.classList.add('grid-box-wrong');
	}
}

// move focus box
function moveFocusBox(key){
	var oriBoxIdx = focusBoxIdx;
	switch (key) {
		case "ArrowUp":
			focusBoxIdx = ((focusBoxIdx - 116) < 0) ? focusBoxIdx : focusBoxIdx - 116;
			break;
		case "ArrowDown":
			focusBoxIdx = ((focusBoxIdx + 116) > 695) ? focusBoxIdx : focusBoxIdx + 116;
			break;
		case "ArrowRight":
			focusBoxIdx = ((focusBoxIdx % 116) === 115) ? focusBoxIdx : focusBoxIdx + 1;
			break;
		case "ArrowLeft":
			focusBoxIdx = ((focusBoxIdx % 116) === 0) ? focusBoxIdx : focusBoxIdx - 1;
	}
	if (oriBoxIdx !== focusBoxIdx) {
		recordBox(oriBoxIdx);
		addFocusBox(focusBoxIdx);
	}
}

addFocusBox(focusBoxIdx);
document.addEventListener('keydown', (event) => {
	if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(event.code) > -1) {
		event.preventDefault();
	}

	moveFocusBox(event.code);
	changeKeyColor('keydown', event.code);
});
document.addEventListener('keyup', (event) => {
	changeKeyColor('keyup', event.code);
});

// auto move
var lastDirection;
var computerDirection = "ArrowDown";
function computerMove() {
	moveFocusBox(computerDirection);
	lastDirection = computerDirection;
	switch (computerDirection) {
		case "ArrowRight":
			computerDirection = ((focusBoxIdx + 116) > 695) ? "ArrowUp" : "ArrowDown";
			break;
		case "ArrowDown":
			computerDirection = ((focusBoxIdx + 116) > 695) ? "ArrowRight" : "ArrowDown";
			break;
		case "ArrowUp":
			computerDirection = ((focusBoxIdx - 116) < 0) ? "ArrowRight" : "ArrowUp";
	}
}

async function autoMove() {
	while (true) {
		computerMove();
		await sleep(20);
		if (((focusBoxIdx === 115) && (lastDirection === "ArrowUp")) || ((focusBoxIdx === 695) && (lastDirection === "ArrowDown"))) {
			break;
		}
	}
}

function clearGrid() {
	for (var i = 0; i < 696; i++) {
		element = document.querySelector(`.grid-box:nth-child(${i + 1})`);
		if (element.classList.contains('grid-box-right')) {
			element.classList.remove('grid-box-right');
		}
		if (element.classList.contains('grid-box-wrong')) {
			element.classList.remove('grid-box-wrong');
		}
		if (element.classList.contains('grid-box-focus')) {
			element.classList.remove('grid-box-focus');
		}
	}
	focusBoxIdx = 0;
	addFocusBox(focusBoxIdx);
}

// arrow btn function
let upArrow = document.getElementById('arrow-up-path')
let leftArrow = document.getElementById('arrow-left-path')
let downArrow = document.getElementById('arrow-down-path')
let rightArrow = document.getElementById('arrow-right-path')

function changeKeyColor(action, key) {
	if (action === "keydown") {
		switch (key) {
			case "ArrowUp":
				upArrow.style.fill = "rgb(142, 142, 142)";
				break;
			case "ArrowDown":
				downArrow.style.fill = "rgb(142, 142, 142)";
				break;
			case "ArrowRight":
				rightArrow.style.fill = "rgb(142, 142, 142)";
				break;
			case "ArrowLeft":
				leftArrow.style.fill = "rgb(142, 142, 142)";
		}

		return;
	}
	if (action === "keyup") {
		switch (key) {
			case "ArrowUp":
				upArrow.style.fill = "whitesmoke";
				break;
			case "ArrowDown":
				downArrow.style.fill = "whitesmoke";
				break;
			case "ArrowRight":
				rightArrow.style.fill = "whitesmoke";
				break;
			case "ArrowLeft":
				leftArrow.style.fill = "whitesmoke";
		}

		return;
	}
}