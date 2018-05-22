//////////////////////////////////
// Coding Challenge


// // My version not using closure
//(function() {
//	// constructor
//	var Question = function(questionText, answers, correctAnswer) {
//		this.questionText = questionText;
//		this.answers = answers;
//		this.correctAnswer = correctAnswer;
//	};
//
//	// add questions
//	var q1 = new Question('Is JS the most popular language?', ['yes', 'no'], 0);
//	var q2 = new Question('What is the name of author?', ['Mike', 'Jonas'], 1);
//	var q3 = new Question('Describe the learning experience of coding:', ['boring', 'frustrating', 'fun', 'sad'], 2);
//	var qArr = [q1, q2, q3];
//
//	// print question and answer
//	Question.prototype.logQuestion = function() {
//		console.log(this.questionText);
//		for (var i = 0; i < this.answers.length;i++) {
//			console.log((i + 1) + ': ' + this.answers[i]);
//		}
//	}
//	// check the input and correct ans
//	Question.prototype.checkAnswer = function(input) {
//		return input === (this.correctAnswer + 1);
//	}
//	
//	var total = 0;
//	// random
//	function start() {
//		var idx = Math.floor(Math.random() * qArr.length);
//		qArr[idx].logQuestion();
//		var attempt = prompt('Please select the correct answer (just type the number).');
//		if (attempt !== 'exit') {
//			var res = qArr[idx].checkAnswer(parseInt(attempt));
//			if (res) {
//				total++;
//				console.log('Correct answer!');
//			} else {
//				console.log('Wrong answer! Try again :)')
//			}
//			displayScore();
//			start();
//		}
//	}
//	start();
//
//	function displayScore() {
//		console.log('Your current score is: ' + total);
//		console.log('---------------------------')
//	}
//})();

// Instructor's version using closure
(function() {
	// constructor
	var Question = function(questionText, answers, correctAnswer) {
		this.questionText = questionText;
		this.answers = answers;
		this.correctAnswer = correctAnswer;
	};

	// add questions
	var q1 = new Question('Is JS the most popular language?', ['yes', 'no'], 0);
	var q2 = new Question('What is the name of author?', ['Mike', 'Jonas'], 1);
	var q3 = new Question('Describe the learning experience of coding:', ['boring', 'frustrating', 'fun', 'sad'], 2);
	var qArr = [q1, q2, q3];

	// print question and answer
	Question.prototype.logQuestion = function() {
		console.log(this.questionText);
		for (var i = 0; i < this.answers.length;i++) {
			console.log((i + 1) + ': ' + this.answers[i]);
		}
	}
	
	// check the input and correct ans
	Question.prototype.checkAnswer = function(input, callback) {
		var sc;
		if (input === (this.correctAnswer + 1)) {
				console.log('Correct answer!');
				sc = callback(true);
			} else {
				console.log('Wrong answer! Try again :)')
				sc = callback(false);
			}
		this.displayScore(sc);
	}
	Question.prototype.displayScore = function(score) {
		console.log('Your current score is: ' + score);
		console.log('---------------------------')
	}
	
	function score() {
		var sc = 0;
		// increase sc if the answer is correct and then
		// return the function
		return function(correct) {
			if (correct) {
				sc++;
			}
			return sc;
		}
	}
	
	var keepScore = score();
	// random
	function start() {
		var idx = Math.floor(Math.random() * qArr.length);
		qArr[idx].logQuestion();
		var attempt = prompt('Please select the correct answer (just type the number).');
		if (attempt !== 'exit') {
			var res = qArr[idx].checkAnswer(parseInt(attempt), keepScore);
			start();
		}
	}
	start();

	
})();

















































