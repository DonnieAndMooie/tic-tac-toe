
    const displayController = (() => {
        const squares = document.querySelectorAll(".square");
        const updateGrid = () => {
            const currentBoard = gameBoard.board
            for (const square of squares){
                let index = square.getAttribute("index")
                square.textContent = currentBoard[index]
            }
        }

        return {updateGrid}})()


    const gameBoard = (() => {
        let board = ["","","",
                     "","","",
                     "","",""]
        const updateBoard = (marker1, marker2, name1, name2) => {
            startBtn.textContent = "Restart"
            let currentMarker = marker1
            const squares = document.querySelectorAll(".square");
            displayController.updateGrid()
            for (const square of squares){
                index = square.getAttribute("index")
                square.addEventListener("click", (e) => {
                    let index = e.target.getAttribute("index")
                    if (board[index] === ""){
                        board[index] = currentMarker
                        if (currentMarker === marker1){
                            currentMarker = marker2
                        }
                        else{
                            currentMarker = marker1
                        }
                        displayController.updateGrid()
                        let gameOver = game.checkGameOver(name1, name2)
                        if (gameOver === true){
                            currentMarker = null
                        }
                    }})
                
                
        }
        return board
    }

    const updateBoardVsAI = (marker1, marker2, name1, name2) => {
        aiStartBtn.textContent = "Restart"
        const squares = document.querySelectorAll(".square");
        displayController.updateGrid()
        for (const square of squares){
            index = square.getAttribute("index")
            square.addEventListener("click", (e) => {
                let index = e.target.getAttribute("index")
                if (board[index] === ""){
                    board[index] = marker1
                    let randomChoice = Math.floor((Math.random() * 9));
                    while (board[randomChoice] !== ""){
                        randomChoice = Math.floor((Math.random() * 9));
                    }
                    board[randomChoice] = marker2
                    }
                    displayController.updateGrid()
                    let gameOver = game.checkGameOver(name1, name2)
                    if (gameOver === true){
                        currentMarker = null
                    }
                })
            }}
                
            
    

        return {board, updateBoard, updateBoardVsAI}
        })()

    const Player = (marker, name) => {
        return {marker, name}
    }

    const game = (() => {
        const checkGameOver = (name1, name2) => {
            const outputDiv = document.querySelector(".output-winner")
            const currentBoard = gameBoard.board
            if (currentBoard[0] === currentBoard[1] 
                && currentBoard[1] === currentBoard[2]
                && currentBoard[0] !== ""){
                    if (currentBoard[0] ==="X"){
                        outputDiv.textContent = name1 + " WINS!"}
                    else{
                        outputDiv.textContent = name2 + " WINS!"
                    }
                return true
            }
            else if (currentBoard[3] === currentBoard[4] 
                && currentBoard[4] === currentBoard[5]
                && currentBoard[3] !== ""){
                    if (currentBoard[3] ==="X"){
                        outputDiv.textContent = name1 + " WINS!"}
                    else{
                        outputDiv.textContent = name2 + " WINS!"
                    }
                return true
            }
            else if (currentBoard[6] === currentBoard[7] 
                && currentBoard[7] === currentBoard[8]
                && currentBoard[6] !== ""){
                    if (currentBoard[6] ==="X"){
                        outputDiv.textContent = name1 + " WINS!"}
                    else{
                        outputDiv.textContent = name2 + " WINS!"
                    }
                return true
            }
            else if (currentBoard[0] === currentBoard[3] 
                && currentBoard[3] === currentBoard[6]
                && currentBoard[0] !== ""){
                    if (currentBoard[0] ==="X"){
                        outputDiv.textContent = name1 + " WINS!"}
                    else{
                        outputDiv.textContent = name2 + " WINS!"
                    }
                return true
            }
            else if (currentBoard[1] === currentBoard[4] 
                && currentBoard[4] === currentBoard[7]
                && currentBoard[1] !== ""){
                    if (currentBoard[1] ==="X"){
                        outputDiv.textContent = name1 + " WINS!"}
                    else{
                        outputDiv.textContent = name2 + " WINS!"
                    }
                return true
            }
            else if (currentBoard[2] === currentBoard[5] 
                && currentBoard[5] === currentBoard[8]
                && currentBoard[2] !== ""){
                    if (currentBoard[2] ==="X"){
                        outputDiv.textContent = name1 + " WINS!"}
                    else{
                        outputDiv.textContent = name2 + " WINS!"
                    }
                return true
            }
            else if (currentBoard[0] === currentBoard[4] 
                && currentBoard[4] === currentBoard[8]
                && currentBoard[0] !== ""){
                    if (currentBoard[0] ==="X"){
                        outputDiv.textContent = name1 + " WINS!"}
                    else{
                        outputDiv.textContent = name2 + " WINS!"
                    }
                return true
            }
            else if (currentBoard[2] === currentBoard[4] 
                && currentBoard[4] === currentBoard[6]
                && currentBoard[2] !== ""){
                    if (currentBoard[2] ==="X"){
                        outputDiv.textContent = name1 + " WINS!"}
                    else{
                        outputDiv.textContent = name2 + " WINS!"
                    }
                return true
            }
            else{
                for (let i=0; i<9; i++){
                    if (currentBoard[i] === ""){
                        outputDiv.textContent = ""
                        return
                    }
                    else{
                        outputDiv.textContent = "IT'S A DRAW!"
                    }
                    
                }
                
            }
            return
            
        }
        return {checkGameOver}
    })()

const startBtn = document.querySelector(".start")
const aiStartBtn = document.querySelector(".ai-start")
const player1Name = document.getElementById("player1")
const player2Name = document.getElementById("player2")
const outputDiv = document.querySelector(".output-winner")
const squares = document.querySelectorAll(".square");


startBtn.addEventListener("click", () => {
    if (player1Name.value === "" || player2Name.value === ""){
    }
    else{     
    event.preventDefault()
    const player1 = Player("X", player1Name.value)
    const player2 = Player("O", player2Name.value)
    gameBoard.board.fill("")
    outputDiv.textContent = ""
    gameBoard.updateBoard(player1.marker, player2.marker, player1.name, player2.name)
    }})
    

aiStartBtn.addEventListener("click", () => {
    const player1 = Player("X", player1Name.value)
    const player2 = Player("O", "AI")
    event.preventDefault()
    gameBoard.board.fill("")
    outputDiv.textContent = ""
    gameBoard.updateBoardVsAI(player1.marker, player2.marker, player1.name, "AI")

})