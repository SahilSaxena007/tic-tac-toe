function GameBoard(){
    const count = 3;
    let gameBoard = [];

    for (let i = 0; i < count; i++){
        gameBoard[i] = [null, null, null];
    }

    const getBoard = ()=>{
        return gameBoard;
    }

    const printBoard = ()=>{
        let str = "";
        for (let row of gameBoard){
            for (let col of row){
                str = str + col + "|";
            }
            str+="\n";
        }
        return str;
    }

    const checkNull = (row, col)=>{
        return gameBoard[row][col] === null;
    }

    const placeToken = (token, row, col)=>{
        gameBoard[row][col] = token;
    }

    const checkRoundWinner = (token)=>{
        let tempArray = [];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                tempArray.push(gameBoard[i][j]);
            }
        }
        winningSequences = [[0,1,2],
                            [3,4,5],
                            [6,7,8],
                            [0,3,6],
                            [1,4,7],
                            [2,5,8],
                            [0,4,8],
                            [2,4,6]]
        let won = false;
        for (let arr of winningSequences){
            if (tempArray[arr[0]] !== null && tempArray[arr[1]] !== null && tempArray[arr[2]] !== null){
                if (tempArray[arr[0]] === tempArray[arr[1]] && tempArray[arr[0]] === tempArray[arr[2]]){
                    won = true;
                    break;
                }
            }
        }

        return won;
    }

    const clearBoard = ()=>{
        for (let i = 0; i < count; i++){
            for (let j = 0; j < count; j++){
                gameBoard[i][j] = null;
            }
            
        }
    }

    const isFilled = ()=>{
        for (let i = 0; i < count; i++){
            for (let j = 0; j < count; j++){
               if (gameBoard[i][j] === null){
                return false;
               }
            }
            
        }
        return true;

    }
    
    return {getBoard, printBoard, checkNull, placeToken, checkRoundWinner, clearBoard, isFilled};
    
}

function Player(name, sign){
    const activePlayer = false;
    let score = 0;

    const getSign = ()=>{
        return sign;
    }
    
    const getName = ()=>{
        return name;
    }

    const getActive = ()=>{
        return activePlayer;
    }

    const getScore = ()=>{
        return score;
    }

    const incrementScore = ()=>{
        score++;
    }

    const resetScore = ()=>{
        score = 0;
    }

    return {getSign,getName,getActive, getScore, incrementScore, resetScore};

}


function Game(){
    const board = GameBoard();
    let player1, player2, currentPlayer;

    const NewGame = ()=>{
        const player1Name = prompt("Player 1 name: ");
        player1 = Player(player1Name,'X');
        const player2Name = prompt("Player 2 name: ");
        player2 = Player(player2Name,'O');
        currentPlayer = player1;
        playRound();
    }

    const playRound = ()=>{
        board.clearBoard();
        updateScreen(); // Update the UI board
        playTurn();
    }

    const playTurn = ()=>{
        console.log(board.printBoard());
        console.log(`${player1.getName()}: ${player1.getScore()}   ${player2.getName()}: ${player2.getScore()}`);
        console.log(`${getCurrentPlayer().getName()}'s turn`);
        updateScreen(); // Update the UI board
    }

    const Turn = (row, col)=>{
        const token = getCurrentPlayer().getSign();
        console.log(`Your Token: ${token}`);
        board.placeToken(token, row, col);
        
        if (board.checkRoundWinner()){
            updateScreen();
            console.log(`Round Over! The Winner is: ${currentPlayer.getName()}`);
            currentPlayer.incrementScore();
            const gameWin = checkGameWinner();
            if (checkGameWinner()){
                console.log(`GAME OVER! WINNER ${currentPlayer.getName()}`);
                ButtonDiv = document.querySelector('.buttons>button');
                ButtonDiv.textContent = 'New Game';
            }else{
                ButtonDiv = document.querySelector('.buttons>button');
                ButtonDiv.textContent = 'New Round';
            }
        }else{
            changeCurrentPlayer();
            playTurn();                       
        }
    }

    const checkGameWinner = ()=>{
        if (player1.getScore() >= 3 || player2.getScore() >= 3){
            return true;
        }
        return false;
    }

    const changeCurrentPlayer = ()=>{
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const getCurrentPlayer = ()=>{
        return currentPlayer;
    }

    const updateScreen = ()=>{
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell,index)=>{
            cell.textContent = '';
            const row = Math.floor(index/3);
            const col = index%3;
            const value = board.getBoard()[row][col];
            cell.textContent = value;
        });

        console.log(board.printBoard());
    }

    const getBoard = () => {
        return board.getBoard();
    }

    // Expose Turn method and updateScreen function
    return {Turn, updateScreen, getBoard, NewGame, playRound};
}

function screenController(){
    const game = Game();
    const ButtonDiv = document.querySelector('.buttons>button');
    const cells = document.querySelectorAll('.cell');

    const clickHandlerBoard = (e) => {
        const cellId = e.target.id;
        const [row, col] = cellId.split('-').map(Number);
        if (game.getBoard()[row][col]===null){
            game.Turn(row, col);

        }
        
    }

    cells.forEach(cell => {
        cell.addEventListener('click', clickHandlerBoard);
    });

    ButtonDiv.addEventListener('click', () => {
        const text = ButtonDiv.textContent;
        if (text === 'New Game'){
            game.NewGame();

        }else if(text === 'New Round'){
            game.playRound();
            
        }
        
    });

    game.updateScreen();
}

screenController();
