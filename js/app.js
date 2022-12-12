class Game {
    constructor() {
        this.gameStatus = document.getElementById('gameStatus')
        this.xWins = document.getElementById('xWins')
        this.oWins = document.getElementById('oWins')
        this.winCount = {
            x: 0,
            o: 0
        }
        this.gameActive = true
        this.currentPlayer = 'X'
        this.gameState = [
            '', '', '',
            '', '', '',
            '', '', ''
        ]

        this.winningCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6]
        ]
        
        this.gameRestartBtn = document.getElementById('gameRestart')
    }

init() {
    this.currPlayerTurn()
    this.handleCellClicked()
    document.getElementById('gameRestart').addEventListener('click', ()=> {
        this.restartGame()
    })
}
    // methods
    currPlayerTurn() {
        const message = `It's ${this.currentPlayer}'s turn`
        return this.gameStatus.innerText = message
    }

    drawMessage() {
        const message = `Game ended in a draw`
        return this.gameStatus.innerText = message
    }

    winningMessage() {
        const message = `player ${this.currentPlayer} has won!`
        return this.gameStatus.innerText = message
    }

    // statusDisplay() {
    //     const gameStatus = this.gameStatus
    //     return gameStatus.innerText = this.currPlayerTurn()
    // }

    //handle clicked cell
    handleCellClicked() {
        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell => {
            const cellIdx = parseInt(cell.getAttribute('data-cell-index'))
            cell.addEventListener('click', ()=> {
                // console.log(cellIdx)
                //if the indexed item is not empty string OR if gameActive is false
                if(this.gameState[cellIdx] != '' || !this.gameActive) {
                    return 
                }

                this.handleCellPlayed(cell, cellIdx)
                this.resultValidation()
            })
        })
    }

    handleCellPlayed(cell, cellIdx) {
        this.gameState[cellIdx] = this.currentPlayer
        this.currentPlayer == 'X' ? cell.classList.add('red') : cell.classList.add('blue')
        cell.innerText = this.currentPlayer
    }

    resultValidation() {
        let gameWon =  false

        for(let i = 0; i<= 7; i++) {
            const win = this.winningCondition[i]

            let a = this.gameState[win[0]]
            let b = this.gameState[win[1]]
            let c = this.gameState[win[2]]

            if (a == '' || b == '' || c == ''){
                continue
            }

            if (a == b &&  b == c) {
                gameWon = true
                break
            }
        }

        if(gameWon) {
            const tallyMark = 's'
            this.winningMessage()
            const winner = this.currentPlayer
            if(winner == 'X') {
                this.winCount.x = this.winCount.x++
                this.xWins.innerHTML += `<span class ="tally"> ${tallyMark} </span>`
            } else {
                this.winCount.o = this.winCount.o++
                this.oWins.innerHTML += `<span class ="tally"> ${tallyMark} </span>`
            }
            this.gameActive = false
            return
        }

        const roundDraw = !this.gameState.includes('')
        if(roundDraw) {
            this.drawMessage()
            this.gameActive = false
            return
        }

        this.playerChange()
    }

    playerChange() {
        this.currentPlayer = this.currentPlayer === 'X' ? "0" : "X"
        // console.log(this.currentPlayer)
        this.currPlayerTurn()
    }

restartGame() {
    this.gameActive = true
    this.currentPlayer = 'X'
    this.gameState = [
        '', '', '',
        '', '', '',
        '', '', ''
    ]
    this.currPlayerTurn()
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = ''
        cell.classList.remove('blue')
    });
}
}

const action = new Game()

action.init()