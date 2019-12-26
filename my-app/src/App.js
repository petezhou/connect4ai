import React from 'react';
import './App.css';


function Square(props) {
    if (props.value === "red"){
        return <button className="square redPiece" onClick={props.onClick} onMouseOver={props.onMouseOver}> </button>;
    } else if (props.value === "yellow") {
        return <button className="square yellowPiece" onClick={props.onClick} onMouseOver={props.onMouseOver}> </button>;
    } else if (props.value === "blue") {
        return <button className="square bluePiece" onClick={props.onClick} onMouseOver={props.onMouseOver}> </button>;
    }
    else {
        return <button className="square" onClick={props.onClick} onMouseOver={props.onMouseOver}> </button>;
    }
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(6).fill(Array(7).fill(null)),
            redIsNext: true,
            hovers: Array(7).fill("blue")
        };
    }

    renderSquare(i, j) {
        return <Square value={this.state.squares[i][j]} onClick={() => this.handleClick(j)} onMouseOver={() => this.handleHover(j)} />
    }

    handleClick(col) {
        const squares = this.state.squares.map((arr) => arr.slice());
        if (calculateWinner(squares)){ return; }
        const hoversRow = Array(7).fill("blue");
        this.setState({ hovers: hoversRow });
        this.handleTrickle(squares, 0, col)
    }

    handleTrickle(board, row, col) {
        if (row < 6 && board[row][col] == null) {
            if (row !== 0) {
                board[row - 1][col] = null;
            }
            board[row][col] = this.state.redIsNext ? "red" : "yellow";
            this.setState({
                squares: board
            });
            setTimeout(this.handleTrickle.bind(this), 50, board, row + 1, col);
        } else {
            // after trickle is done, we need to update states
            const hoversRow = Array(7).fill("blue");
            hoversRow[col] = this.state.redIsNext ? "yellow" : "red";
            this.setState({
                hovers: hoversRow,
                redIsNext: !this.state.redIsNext
            });

            // best place for AI to go.
        }
    }

    renderHover(col) {
        return <Square value={this.state.hovers[col]} onClick={() => this.handleClick(col)} onMouseOver={() => this.handleHover(col)} />
    }

    handleHover(col) {
        const hoversRow = Array(7).fill("blue")
        if (calculateWinner(this.state.squares)) {
            this.setState({
                hovers: hoversRow
            });
        } else {
            hoversRow[col] = this.state.redIsNext ? "red" : "yellow";
            this.setState({
                hovers: hoversRow
            });
        }
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner === "red") {
            status = "Player 1 wins!"
        } else if (winner === "yellow") {
            status = "Player 2 wins!"
        } else if (winner === "draw") {
            status = "It's a draw."
        } else {
            status = ""
        }

        return (
            <div className="board">
                <div className="board-row">
                    {this.renderHover(0)}
                    {this.renderHover(1)}
                    {this.renderHover(2)}
                    {this.renderHover(3)}
                    {this.renderHover(4)}
                    {this.renderHover(5)}
                    {this.renderHover(6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(0, 3)}
                    {this.renderSquare(0, 4)}
                    {this.renderSquare(0, 5)}
                    {this.renderSquare(0, 6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(1, 3)}
                    {this.renderSquare(1, 4)}
                    {this.renderSquare(1, 5)}
                    {this.renderSquare(1, 6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(2, 3)}
                    {this.renderSquare(2, 4)}
                    {this.renderSquare(2, 5)}
                    {this.renderSquare(2, 6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, 0)}
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(3, 3)}
                    {this.renderSquare(3, 4)}
                    {this.renderSquare(3, 5)}
                    {this.renderSquare(3, 6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4, 0)}
                    {this.renderSquare(4, 1)}
                    {this.renderSquare(4, 2)}
                    {this.renderSquare(4, 3)}
                    {this.renderSquare(4, 4)}
                    {this.renderSquare(4, 5)}
                    {this.renderSquare(4, 6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(5, 0)}
                    {this.renderSquare(5, 1)}
                    {this.renderSquare(5, 2)}
                    {this.renderSquare(5, 3)}
                    {this.renderSquare(5, 4)}
                    {this.renderSquare(5, 5)}
                    {this.renderSquare(5, 6)}
                </div>
                <h3>{status}</h3>
            </div>
        );
    }
}


function App() {
    // who starts etc. handled here and passed as props to Board
    return (
        <div className="App">
            <h1>Connect 4</h1>
            <Board/>
        </div>
    );
}


function calculateWinner(board) {
    // check columns
    for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            if (board[r][c]) {
                if (board[r][c] === board[r - 1][c] &&
                    board[r][c] === board[r - 2][c] &&
                    board[r][c] === board[r - 3][c]) {
                    return board[r][c];
                }
            }
        }
    }
    // check rows
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
                if (board[r][c] === board[r][c + 1] &&
                    board[r][c] === board[r][c + 2] &&
                    board[r][c] === board[r][c + 3]) {
                    return board[r][c];
                }
            }
        }
    }
    // diagonal right
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2] &&
              board[r][c] === board[r - 3][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
    // diagonal left
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2] &&
              board[r][c] === board[r - 3][c - 3]) {
            return board[r][c];
          }
        }
      }
    }
    // draw
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            if (!board[r][c]){
                return null;
            }
        }
    }
    return "draw";
}


export default App;

