/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// state variable
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. Random Number
		var dice0 = Math.floor(Math.random() * 6 + 1);
		var dice1 = Math.floor(Math.random() * 6 + 1);

		// 2. Display the result
		document.getElementById('dice-0').style.display = 'block';
		document.getElementById('dice-1').style.display = 'block';

		document.getElementById('dice-0').src = 'dice-' + dice0 + '.png';		
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';

	
		// 3. Update the round score IF the rolled number is NOT 1
		if (dice0 !== 1 && dice1 !== 1) {
			roundScore += dice0;
			roundScore += dice1;
			// select id
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
		//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// add current score to the GLOBAL score
		scores[activePlayer] += roundScore;
		// change the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.final-score').value;
		var winningScore;
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}
	
		
		// check if any player win the game
		if (scores[activePlayer] >= winningScore) {
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('dice-0').style.display = 'none';
			document.getElementById('dice-1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

// pass init function
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	
	// select class
	document.getElementById('dice-0').style.display = 'none';
	document.getElementById('dice-1').style.display = 'none';


	// getElementById is faster than querySelector
	// we don't need # as we used in querySelector to select element id
	// when we use getElementById method.
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	
	document.getElementById('name-0').textContent = 'Player 1!';
	document.getElementById('name-1').textContent = 'Player 2!';
	
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
}

function nextPlayer() {
		// Change to next player
		// use ternary operator
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		// empty round score 
		roundScore = 0;
		
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;

		// toggle active player sign
		// remove and add:
		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');
		// toggle way:
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		
		document.getElementById('dice-0').style.display = 'none';
		document.getElementById('dice-1').style.display = 'none';
}






