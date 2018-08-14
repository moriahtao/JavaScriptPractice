(function(){
	angular
		.module('TicTacToeApp', [])
		.controller('TicController', TicController);
	
	function TicController($scope) {
		let size, total, gamePlaying;
		$scope.init = init;
		init();

		function init() {
			$scope.boardData = [];
			size = 4;
			gamePlaying = true;
			total = 0;
			for (let i = 0; i < size; i++) {
				$scope.boardData[i] = [];
				for (let j = 0; j < size; j++) {
					$scope.boardData[i][j] = ''; 
				}
			}
			
			$scope.activePlayer = 'x';
		}

        /**
		 * handle user click event on
		 * boardData[row][col] of game board table
         * @param row index of table
         * @param col index of table
         */
		$scope.ctrlFill = (row, col) => {			
			
			if (gamePlaying) {
				
				// 1. update table state if not filled
				if ($scope.boardData[row][col] === '') {
					$scope.boardData[row][col] = $scope.activePlayer;
					// check draw
					total++;
					if (total === size * size) {
						setTimeout(() => {
							alert(`Draw! Click NEW GAME to restart!`);
							gamePlaying = false;
						}, 100);
						return;
					}
					// check win
					if (checkWin(row, col, $scope.boardData)) {
						setTimeout(() => {
							alert(`Player ${$scope.activePlayer} wins! Click NEW GAME to restart!`);
							gamePlaying = false;
						}, 100);
						return;
					}

					// 2. next player
					$scope.activePlayer === 'x' ? $scope.activePlayer = 'o' : $scope.activePlayer = 'x';
				}
			}
		};

        /**
		 * check if there is a win on current boardData
         * @param row index of current move
         * @param col index of current move
         * @param boardData current board status
         * @returns {boolean} true iff there is a win
         */
		function checkWin(row, col, boardData) {
			// 1. check col
			for(let i = 0; i < size; i++){
				if(boardData[row][i] !== boardData[row][col])
					break;
				if(i === size - 1){
					return true;
				}
			}

			// 2. check row
			for(let i = 0; i < size; i++){
				if(boardData[i][col] !== boardData[row][col])
					break;
				if(i === size - 1){
					return true;
				}
			}

			// 3. check diagonal
			if(row === col){
					// on a diagonal
					for(let i = 0; i < size; i++){
						if(boardData[i][i] !== boardData[row][col])
							break;
						if(i === size - 1){
							return true;
						}
					}
			}

			// 4. check anti-diagonal 
			if(row + col === size - 1){
				for(let i = 0; i < size; i++){
					if(boardData[i][(size - 1) - i] !== boardData[row][col])
						break;
					if(i === size - 1){
						return true;
					}
				}
			}

			// 5. check corner
			if (boardData[0][0] !== '' &&
				boardData[0][0] === boardData[size - 1][0] &&
				boardData[0][0] === boardData[size - 1][size - 1] &&
				boardData[0][0] === boardData[0][size - 1]) {
				return true;
			}

			//6. check 2 * 2 box
			if (checkUpperLeft(row, col, boardData) ||
				checkBottomLeft(row,col, boardData) ||
				checkUpperRight(row, col, boardData) ||
				checkBottomRight(row, col, boardData)) {
				return true;
			}

			return false;
		}

        /**
		 * check if there is a win
		 * on upper left side 2 * 2 box
		 * of current move m
		 *   _______
         *	| 0 | 1 |
         *  |---|---|
         *  | 2 | m |
         *	 --- ---
         * @param row index of current move
         * @param col index of current move
         * @param boardData current board status
         * @returns {boolean} true iff there is a win
         */
		function checkUpperLeft(row, col, boardData) {
            return (
            	// has valid upper left box
				col !== 0 &&
				row !== 0 &&
				// check qualified uppper left box
				boardData[row][col] === boardData[row - 1][col] &&
				boardData[row][col] === boardData[row - 1][col - 1] &&
				boardData[row][col] === boardData[row][col - 1]
			);
		}

        /**
         * check if there is a win
         * on bottom left side 2 * 2 box
         * of current move m
         *   _______
         *	| 0 | m |
         *  |---|---|
         *  | 1 | 2 |
         *	 --- ---
         * @param row index of current move
         * @param col index of current move
         * @param boardData current board status
         * @returns {boolean} true iff there is a win
         */
		function checkBottomLeft(row, col, boardData) {
            return (
            	// has valid bottom left box
				col !== 0 &&
				row !== size - 1 &&
				// check qualified bottom left box
				boardData[row][col] === boardData[row + 1][col] &&
				boardData[row][col] === boardData[row + 1][col - 1] &&
				boardData[row][col] === boardData[row][col - 1]
			);
		}

        /**
         * check if there is a win
         * on upper right side 2 * 2 box
         * of current move m
         *   _______
         *	| 0 | 1 |
         *  |---|---|
         *  | m | 2 |
         *	 --- ---
         * @param row index of current move
         * @param col index of current move
         * @param boardData current board status
         * @returns {boolean} true iff there is a win
         */
		function checkUpperRight(row, col, boardData) { 
			return (
				// has valid upper right box
				col !== size - 1 &&
				row !== 0 &&
				// check qualified upper right box
				boardData[row][col] === boardData[row - 1][col] &&
				boardData[row][col] === boardData[row - 1][col + 1] &&
				boardData[row][col] === boardData[row][col + 1]
			);
		}

        /**
         * check if there is a win
         * on bottom right side 2 * 2 box
         * of current move m
         *   _______
         *	| m | 0 |
         *  |---|---|
         *  | 1 | 2 |
         *	 --- ---
         * @param row index of current move
         * @param col index of current move
         * @param boardData current board status
         * @returns {boolean} true iff there is a win
         */
		function checkBottomRight(row, col, boardData) { 
			return (
				// has valid bottom right box
				col !== size - 1 &&
				row !== size - 1 &&
				// check qualified bottom right box
				boardData[row][col] === boardData[row][col + 1] &&
				boardData[row][col] === boardData[row + 1][col + 1] &&
				boardData[row][col] === boardData[row + 1][col]
			);
		}
	}
	
})();
