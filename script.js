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
    // const display = Display();
    let player1, player2, currentPlayer;

    const NewGame = ()=>{
        const player1Name = prompt("Player 1 name: ");
        player1 = Player(player1Name,'x');
        const player2Name = prompt("Player 2 name: ");
        player2 = Player(player2Name,'O');
        currentPlayer = player1;
        playRound();
    }

    const playRound = ()=>{
        board.clearBoard();
        playTurn();
    }

    const playTurn = ()=>{
        console.log(board.printBoard());
        console.log(`${player1.getName()}: ${player1.getScore()}   ${player2.getName()}: ${player2.getScore()}`);
        console.log(`${getCurrentPlayer().getName()}'s turn`);
        Turn();
    }

    const Turn = ()=>{
        const token = getCurrentPlayer().getSign();
        console.log(`Your Token: ${token}`);
        let row, col;
    
        do {
            row = parseInt(prompt("Enter row number (1/3): ")) - 1;
            col = parseInt(prompt("Enter col number (1/3): ")) - 1;
        }while (!board.checkNull(row,col));

        board.placeToken(token, row, col);
        
        if (board.checkRoundWinner()){
            console.log(`Round Over! The Winner is: ${currentPlayer.getName()}`);
            currentPlayer.incrementScore();
            if (checkGameWinner()){
                console.log(`GAME OVER! WINNER ${currentPlayer.getName()}`);
                NewGame();
            }else{
                playRound();
            }
            
        }else{
            changeCurrentPlayer();
            playTurn();                       
        }
    }

    const checkGameWinner = ()=>{
        if (player1.getScore() === 2 || player2.getScore() === 2){
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

    NewGame();

    return {changeCurrentPlayer, getCurrentPlayer};

}


const game = Game();