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
    const player1Name = prompt("Player 1 name: ");
    let player1 = Player(player1Name,'x');
    const player2Name = prompt("Player 2 name: ");
    let player2 = Player(player2Name,'O');
    let currentPlayer = player1;

    const changeCurrentPlayer = ()=>{
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const getCurrentPlayer = ()=>{
        return currentPlayer;
    }

    const playRound = ()=>{
        console.log(board.printBoard());
        console.log(`Player 1: ${player1.getScore()}   Player 2: ${player2.getScore()}`);
        console.log(`${getCurrentPlayer().getName()}'s turn`);
        Round();
    }

    const Round = ()=>{
        const token = getCurrentPlayer().getSign();
        console.log(`Your Token: ${token}`);
        let row, col;
        do {
            row = parseInt(prompt("Enter row number (1/3): ")) - 1;
            col = parseInt(prompt("Enter col number (1/3): ")) - 1;

        }while (!board.checkNull(row,col));
        
        board.placeToken(token,row, col);
        if (board.checkRoundWinner(token)){
            console.log(`Round Over! The Winner is: ${getCurrentPlayer().getName()}`);
            getCurrentPlayer().incrementScore();
            if (getCurrentPlayer().getScore() === 3){
                console.log(`GAME OVER! The Winner is ${getCurrentPlayer().getName()}`);
                if (restartPrompt()){
                    board.clearBoard();
                    player1.resetScore();
                    player2.resetScore();
                    console.log("Starting new Game: ...");
                    playRound();
                }
            }else{
                board.clearBoard();
                console.log("Starting new Round: ...");
                playRound();
            }
        }else if (board.isFilled()){
            board.clearBoard();
            console.log("Starting new Round: ...");
            playRound();

        }else{
            changeCurrentPlayer();       
            playRound(); 
        }
        
    }

    const restartPrompt = ()=>{
        let continuePlay = prompt("New Round(y/n)");
        if (continuePlay === 'y'){
            return true;
        }
        return false;
    }

    playRound();

    return {changeCurrentPlayer, getCurrentPlayer, restartPrompt};

}


const game = Game();
