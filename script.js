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
                }})
            
            
    }
    return board
}
    return {board, updateBoard}
})()

const Player = (marker) => {
    return {marker}
}

const player1 = Player("X")
const player2 = Player("O")
gameBoard.updateBoard(player1.marker, player2.marker)
