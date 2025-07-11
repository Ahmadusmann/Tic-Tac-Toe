window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'Player X won!';
    const PLAYERO_WON = 'Player O won!';
    const DRAW = 'It\'s a draw!';

    /*
    Indexes within the board
    0 | 1 | 2
    3 | 4 | 5
    6 | 7 | 8
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //* win or not by 
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
           
            if (a === b && b === c && a === currentPlayer) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
        if(!board.includes(''))
            announce(DRAW);
    }

    //* helper function 
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = `Player <span class="playerO">O</span> WON`;
                break;
            case PLAYERX_WON:
                announcer.innerHTML = `Player <span class="playerX">X</span> WON`;
                break;
            case DRAW:
                announcer.innerHTML = `It's a draw!`;
        }
        announcer.classList.remove('hide');
    };

    //* isValidAction function
    const isValidAction = (tile) => {
        if(tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    //* updateBoard function
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    //* remove classList of player
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    //* resetBoard function
    const resetBoard = () =>{
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if(currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });


    resetButton.addEventListener('click', resetBoard);
});
