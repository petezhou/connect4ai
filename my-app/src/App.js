import React from 'react';
import './App.css';


function Square(props) {
    if (props.value === "red"){
        return <button className="square redPiece" onClick={props.onClick}> </button>;
    } else if (props.value === "yellow") {
        return <button className="square yellowPiece" onClick={props.onClick}> </button>;
    } else {
        return <button className="square" onClick={props.onClick}> </button>;
    }
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(6).fill(Array(7).fill(null)),
            redIsNext: true
        };
    }

    renderSquare(i, j) {
        return <Square value={this.state.squares[i][j]} onClick={() => this.handleClick(i, j)} />
    }

    handleClick(i, j) {
        const squares = this.state.squares.map((arr) => arr.slice());
        for (let row = 5; row >= 0; row--){
            if (squares[row][j] == null) {
                squares[row][j] = this.state.redIsNext ? "red" : "yellow";
                this.setState({
                   squares: squares,
                   redIsNext: !this.state.redIsNext
                });
                return;
            }
        }
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = winner + " wins!"
        } else {
            status = ""
        }

        return (
            <div className="board">
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


export default App;


function calculateWinner(theBoard) {
    return "Player 1"
}