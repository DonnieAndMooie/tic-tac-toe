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
    const updateBoard = (marker1, marker2) => {
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
                    let gameOver = game.checkGameOver()
                    if (gameOver === true){
                        currentMarker = null
                    }
                }})
            
            
    }
    return board
}
    return {board, updateBoard}
})()

const Player = (marker) => {
    return {marker}
}

const game = (() => {
    const checkGameOver = () => {
        const outputDiv = document.querySelector(".output-winner")
        const currentBoard = gameBoard.board
        if (currentBoard[0] === currentBoard[1] 
            && currentBoard[1] === currentBoard[2]
            && currentBoard[0] !== ""){
             outputDiv.textContent = currentBoard[0] + " WINS!"
             return true
        }
        else if (currentBoard[3] === currentBoard[4] 
            && currentBoard[4] === currentBoard[5]
            && currentBoard[3] !== ""){
             outputDiv.textContent = currentBoard[3] + " WINS!"
             return true
        }
        else if (currentBoard[6] === currentBoard[7] 
            && currentBoard[7] === currentBoard[8]
            && currentBoard[6] !== ""){
             outputDiv.textContent = currentBoard[6] + " WINS!"
             return true
        }
        else if (currentBoard[0] === currentBoard[3] 
            && currentBoard[3] === currentBoard[6]
            && currentBoard[0] !== ""){
             outputDiv.textContent = currentBoard[0] + " WINS!"
             return true
        }
        else if (currentBoard[1] === currentBoard[4] 
            && currentBoard[4] === currentBoard[7]
            && currentBoard[1] !== ""){
             outputDiv.textContent = currentBoard[1] + " WINS!"
             return true
        }
        else if (currentBoard[2] === currentBoard[5] 
            && currentBoard[5] === currentBoard[8]
            && currentBoard[2] !== ""){
             outputDiv.textContent = currentBoard[2] + " WINS!"
             return true
        }
        else if (currentBoard[0] === currentBoard[4] 
            && currentBoard[4] === currentBoard[8]
            && currentBoard[0] !== ""){
             outputDiv.textContent = currentBoard[0] + " WINS!"
             return true
        }
        else if (currentBoard[2] === currentBoard[4] 
            && currentBoard[4] === currentBoard[6]
            && currentBoard[2] !== ""){
             outputDiv.textContent = currentBoard[2] + " WINS!"
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

const player1 = Player("X")
const player2 = Player("O")
gameBoard.updateBoard(player1.marker, player2.marker)
