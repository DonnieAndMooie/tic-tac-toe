let currentMarker;

    const displayController = (() => {
        const squares = document.querySelectorAll(".square");
        const updateGrid = () => {
            const currentBoard = gameBoard.board;
            for (const square of squares){
                let index = square.getAttribute("index");
                square.textContent = currentBoard[index];
            }
        }

        return {updateGrid}})()


    const gameBoard = (() => {
        let board = ["","","",
                     "","","",
                     "","",""];
        const updateBoard = (marker1, marker2, name1, name2) => {
            startBtn.textContent = "Restart";
            const squares = document.querySelectorAll(".square");
            displayController.updateGrid();
            for (const square of squares){
                index = square.getAttribute("index");
                square.addEventListener("click", (e) => {
                    let index = e.target.getAttribute("index");
                    if (board[index] === ""){
                        board[index] = currentMarker;
                        if (currentMarker === marker1){
                            currentMarker = marker2;
                        }
                        else{
                            currentMarker = marker1;
                        }
                        displayController.updateGrid();
                        let gameOver = game.checkGameOver(name1, name2, board)
                        if (gameOver === 10 || gameOver === -10 || gameOver === 0){
                            currentMarker = "";
                        }
                    }})
                
                
        }
        return board;
    }

    const updateBoardVsAI = (marker1, marker2, name1, name2) => {
        aiStartBtn.textContent = "Restart";
        const squares = document.querySelectorAll(".square");
        displayController.updateGrid();
        for (const square of squares){
            index = square.getAttribute("index");
            square.addEventListener("click", (e) => {
                let index = e.target.getAttribute("index");
                if (board[index] === ""){
                    board[index] = marker1;
                    displayController.updateGrid();
                    let gameOver = game.checkGameOver(name1, name2, board);
                    if (gameOver !== 10 && gameOver !== -10 && gameOver !== 0){
                        let randomChoice = Math.floor((Math.random() * 9));
                        while (board[randomChoice] !== ""){
                            randomChoice = Math.floor((Math.random() * 9));
                        }
                        board[randomChoice] = marker2;
                        }}
                    displayController.updateGrid()
                    let gameOver = game.checkGameOver(name1, name2, board);
                    if (gameOver === 10 || gameOver === -10 || gameOver === 0){
                        marker1 = "";
                        marker2 = "";
                    }
                })
            }}

        const updateBoardvsHardAI = (marker1, marker2, name1, name2) => {
            aiStartBtnHard.textContent = "Restart";
            const squares = document.querySelectorAll(".square");
            displayController.updateGrid();
            for (const square of squares){
                index = square.getAttribute("index");
                square.addEventListener("click", (e) => {
                    let index = e.target.getAttribute("index");
                    if (board[index] === ""){
                        board[index] = currentMarker;
                        displayController.updateGrid();
                        let gameOver = game.checkGameOver(name1, name2, board);
                        if (gameOver !== 10 && gameOver !== -10 && gameOver !== 0){
                            let AIChoice = minimax(board, marker2).index;
                            board[AIChoice] = marker2;
                            }
                            }
                        displayController.updateGrid();
                        let gameOver = game.checkGameOver(name1, name2, board);
                        if (gameOver === 10 || gameOver === -10 || gameOver === 0){
                            currentMarker = null;
                        }
                    })
                }}

            const findAvailableSquares = (currentBoard) =>{
                let availableSquares = [];
                let squareIndex = -1;
                for (const square of currentBoard){
                    squareIndex++;
                    if (square !== "X" && square !== "O"){
                        availableSquares.push(squareIndex);
                    }
                }
                return availableSquares;
            }

            const minimax = (currentBoard, marker) => {
                let newBoard = convertBoard(currentBoard);

                let availableSpots = findAvailableSquares(newBoard);
                if (game.winning(newBoard, "X")){
                    return {score:-10};
                }
                else if(game.winning(newBoard, "O")){
                    return {score: 10};
                }
                else if (availableSpots.length === 0){
                    return {score:0};
                }
                
                let moves = [];
                for (let i=0; i<availableSpots.length; i++){

                    outputDiv.textContent = "";
                    let move = {};
                    move.index = newBoard[availableSpots[i]];

                    newBoard[availableSpots[i]] = marker;

                    if (marker === "O"){
                        let result = minimax(newBoard, "X");
                            move.score = result.score;
                        }
                        
                    
                    else{
                        let result = minimax(newBoard, "O");
                            move.score = result.score;
                        }
                    
                    newBoard[availableSpots[i]] = move.index;
                    
                    moves.push(move);
                    }
                    
    
            

                let bestMove;
                if (marker === "O"){
                    let bestScore = -100000;
                    for (let i = 0; i < moves.length; i++){
                        if (moves[i].score > bestScore){
                            bestScore = moves[i].score;
                            bestMove = i;
                        }}
                    }
                else{
                    let bestScore = 100000;
                    for (let i = 0; i < moves.length; i++){
                        if (moves[i].score < bestScore){
                            bestScore = moves[i].score;
                            bestMove = i;
                        }}
                    }
                
                
                return moves[bestMove];
                }

            const convertBoard = (currentBoard) => {
                let newBoard = [];
                let boardIndex = -1;
                for (let i = 0; i < currentBoard.length; i++){
                    boardIndex++;
                    if (currentBoard[i] === "X" || currentBoard[i] === "O"){
                        newBoard.push(currentBoard[i]);
                    }
                    else{
                        newBoard.push(boardIndex);
                    }
                    
            }
            return newBoard;
        }
                
            
    

        return {board, updateBoard, updateBoardVsAI, updateBoardvsHardAI, findAvailableSquares, minimax}
        })()

    const Player = (marker, name) => {
        return {marker, name}
    }

    const game = (() => {
        const checkGameOver = (name1, name2, board) => {
            const outputDiv = document.querySelector(".output-winner");
            const currentBoard = board;
            if (currentBoard[0] === currentBoard[1]
                && currentBoard[1] === currentBoard[2]
                && currentBoard[0] !== ""){
                    if (currentBoard[0] ==="X"){
                        outputDiv.textContent = name1 + " WINS!";
                        return -10}
                    else{
                        outputDiv.textContent = name2 + " WINS!";
                        return 10
                    }
            }
            else if (currentBoard[3] === currentBoard[4] 
                && currentBoard[4] === currentBoard[5]
                && currentBoard[3] !== ""){
                    if (currentBoard[3] ==="X"){
                        outputDiv.textContent = name1 + " WINS!";
                        return -10}

                    
                    else{
                        outputDiv.textContent = name2 + " WINS!";
                        return 10
                    }}
            
            else if (currentBoard[6] === currentBoard[7] 
                && currentBoard[7] === currentBoard[8]
                && currentBoard[6] !== ""){
                    if (currentBoard[6] ==="X"){
                        outputDiv.textContent = name1 + " WINS!";
                        return -10
                    }
                    else{
                        outputDiv.textContent = name2 + " WINS!";
                        return 10
                    }

            }
            else if (currentBoard[0] === currentBoard[3] 
                && currentBoard[3] === currentBoard[6]
                && currentBoard[0] !== ""){
                    if (currentBoard[0] ==="X"){
                        outputDiv.textContent = name1 + " WINS!";
                        return -10
                    }
                    else{
                        outputDiv.textContent = name2 + " WINS!";
                        return 10
                    }

            }
            else if (currentBoard[1] === currentBoard[4] 
                && currentBoard[4] === currentBoard[7]
                && currentBoard[1] !== ""){
                    if (currentBoard[1] ==="X"){
                        outputDiv.textContent = name1 + " WINS!";
                        return -10
                    }
                    else{
                        outputDiv.textContent = name2 + " WINS!";
                        return 10
                    }
            }
            else if (currentBoard[2] === currentBoard[5] 
                && currentBoard[5] === currentBoard[8]
                && currentBoard[2] !== ""){
                    if (currentBoard[2] ==="X"){
                        outputDiv.textContent = name1 + " WINS!";
                        return -10
                }
                    else{
                        outputDiv.textContent = name2 + " WINS!";
                        return 10
                    }
            }
            else if (currentBoard[0] === currentBoard[4] 
                && currentBoard[4] === currentBoard[8]
                && currentBoard[0] !== ""){
                    if (currentBoard[0] ==="X"){
                        outputDiv.textContent = name1 + " WINS!";
                        return -10
                    }
                    else{
                        outputDiv.textContent = name2 + " WINS!";
                        return 10
                    }
            }
            else if (currentBoard[2] === currentBoard[4] 
                && currentBoard[4] === currentBoard[6]
                && currentBoard[2] !== ""){
                    if (currentBoard[2] ==="X"){
                        outputDiv.textContent = name1 + " WINS!";
                        return -10
                    }
                    else{
                        outputDiv.textContent = name2 + " WINS!";
                        return 10
                    }
            }
            else{
                for (let i=0; i<9; i++){
                    if (currentBoard[i] === ""){
                        outputDiv.textContent = "";
                        return false;
                    }
                    
                }
                outputDiv.textContent = "IT'S A DRAW!";
                return 0;
                
            }
            
            
        }

        const winning = (board, marker) => {
            if (
                (board[0] === marker && board[1] === marker && board[2] === marker)||
                (board[3] === marker && board[4] === marker && board[5] === marker)||
                (board[6] === marker && board[7] === marker && board[8] === marker)||
                (board[0] === marker && board[3] === marker && board[6] === marker)||
                (board[1] === marker && board[4] === marker && board[7] === marker)||
                (board[2] === marker && board[5] === marker && board[8] === marker)||
                (board[0] === marker && board[4] === marker && board[8] === marker)||
                (board[2] === marker && board[4] === marker && board[6] === marker)
                ){
                    return true
                }
                else {
                    return false
                }
        }

        return {checkGameOver, winning}
    })()

const startBtn = document.querySelector(".start");
const aiStartBtn = document.querySelector(".ai-start");
const aiStartBtnHard = document.querySelector(".ai-start-hard");
const player1Name = document.getElementById("player1");
const player2Name = document.getElementById("player2");
const outputDiv = document.querySelector(".output-winner");
const squares = document.querySelectorAll(".square");



startBtn.addEventListener("click", () => {
    if (player1Name.value === "" || player2Name.value === ""){
    }
    else{     
    event.preventDefault();
    const player1 = Player("X", player1Name.value);
    const player2 = Player("O", player2Name.value);
    gameBoard.board.fill("");
    outputDiv.textContent = "";
    currentMarker = player1.marker;
    gameBoard.updateBoard(player1.marker, player2.marker, player1.name, player2.name);
    }})
    

aiStartBtn.addEventListener("click", () => {
    const player1 = Player("X", "You");
    const player2 = Player("O", "AI");
    gameBoard.board.fill("");
    outputDiv.textContent = "";
    currentMarker = player1.marker;
    gameBoard.updateBoardVsAI(player1.marker, player2.marker, player1.name, "AI");

})

aiStartBtnHard.addEventListener("click", () => {
    const player1 = Player("X", "You");
    const player2 = Player("O", "AI");
    gameBoard.board.fill("");
    currentMarker = player1.marker;
    gameBoard.updateBoardvsHardAI(player1.marker, player2.marker, player1.name, player2.name);
    outputDiv.textContent = "";
})