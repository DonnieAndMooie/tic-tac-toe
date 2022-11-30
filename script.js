const gameBoard = () => {
    const board = ["X","O","O",
                   "O","X","O",
                   "O","X","X"]
    return board
}

const displayController = (() => {
    const updateBoard = () => {
        const squares = document.querySelectorAll(".square");
        const currentBoard = gameBoard()
        for (const square of squares){
            let index = square.getAttribute("index")
            square.textContent = currentBoard[index]
        }
    }
    return {updateBoard}})()

const Player = () => {

}

displayController.updateBoard()