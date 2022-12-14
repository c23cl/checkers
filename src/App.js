import './App.css';
import React, { useState } from 'react';

function Board() {

  var [selectedCheckerRow, setSelectedCheckerRow] = useState(null);
  var [selectedCheckerCol, setSelectedCheckerCol] = useState(null);
  var [board, setBoard] = useState([
    [null, "white", null, "white", null, "white", null, "white"],
    ["white", null, "white", null, "white", null, "white", null],
    [null, "white", null, "white", null, "white", null, "white"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["red", null, "red", null, "red", null, "red", null],
    [null, "red", null, "red", null, "red", null, "red"],
    ["red", null, "red", null, "red", null, "red", null],
  ]);

  const handleClick = (row, col) => {
    console.log(row, col);
    if (board[row][col] !== null) {
      // Select checker
      setSelectedCheckerRow(row);
      setSelectedCheckerCol(col);
    } else {
      // Move checker
      if (selectedCheckerRow !== null )  {
        var newBoard = board.slice();

        //if selected checker is red

        //if its just moving
        if(board[selectedCheckerRow][selectedCheckerCol] === "red" && row-selectedCheckerRow === -1 && Math.abs(col-selectedCheckerCol) ===1) {
          newBoard[row][col] = board[selectedCheckerRow][selectedCheckerCol];
          newBoard[selectedCheckerRow][selectedCheckerCol] = null;

          setBoard(newBoard);

          //if its jumping
        } else if (board[selectedCheckerRow][selectedCheckerCol]==="red" && Math.abs(selectedCheckerRow-row) === 2 && Math.abs(selectedCheckerCol-col) === 2 && board[(selectedCheckerRow+row)/2][(selectedCheckerCol+col)/2] === "white") {
            newBoard[(selectedCheckerRow+row)/2][(selectedCheckerCol+col)/2] = null;
            newBoard[row][col] = board[selectedCheckerRow][selectedCheckerCol];
            newBoard[selectedCheckerRow][selectedCheckerCol] = null;

            setBoard(newBoard);
          }

        //if selected checker is white

        //if its just moving
        if(board[selectedCheckerRow][selectedCheckerCol] === "white" && row-selectedCheckerRow === 1 && Math.abs(col-selectedCheckerCol) ===1) {
          newBoard[row][col] = board[selectedCheckerRow][selectedCheckerCol];
          newBoard[selectedCheckerRow][selectedCheckerCol] = null;
          
          setBoard(newBoard);
          //if its jumping
        } else if(board[selectedCheckerRow][selectedCheckerCol]==="white" && Math.abs(selectedCheckerRow-row) === 2 && Math.abs(selectedCheckerCol-col) === 2 && board[(selectedCheckerRow+row)/2][(selectedCheckerCol+col)/2] === "red") {
            newBoard[(selectedCheckerRow+row)/2][(selectedCheckerCol+col)/2] = null;

          newBoard[row][col] = board[selectedCheckerRow][selectedCheckerCol];
          newBoard[selectedCheckerRow][selectedCheckerCol] = null;

          setBoard(newBoard);
        }

        setSelectedCheckerCol(null);
        setSelectedCheckerRow(null);

      }
    }

  };



  return (
    <div className="board">
      <Row handleClick={handleClick} board={board} row={0}></Row>
      <Row handleClick={handleClick} board={board} row={1}></Row>
      <Row handleClick={handleClick} board={board} row={2}></Row>
      <Row handleClick={handleClick} board={board} row={3}></Row>
      <Row handleClick={handleClick} board={board} row={4}></Row>
      <Row handleClick={handleClick} board={board} row={5}></Row>
      <Row handleClick={handleClick} board={board} row={6}></Row>
      <Row handleClick={handleClick} board={board} row={7}></Row>
    </div>

  );
}

function Row(props) {
  return (
    <div className="row">
      <Square handleClick={props.handleClick} board={props.board} row={props.row} col={0}></Square>
      <Square handleClick={props.handleClick} board={props.board} row={props.row} col={1}></Square>
      <Square handleClick={props.handleClick} board={props.board} row={props.row} col={2}></Square>
      <Square handleClick={props.handleClick} board={props.board} row={props.row} col={3}></Square>
      <Square handleClick={props.handleClick} board={props.board} row={props.row} col={4}></Square>
      <Square handleClick={props.handleClick} board={props.board} row={props.row} col={5}></Square>
      <Square handleClick={props.handleClick} board={props.board} row={props.row} col={6}></Square>
      <Square handleClick={props.handleClick} board={props.board} row={props.row} col={7}></Square>
    </div>
  );
}

function Square(props) {
  const redSquare = (props.row % 2 === 0 && props.col % 2 === 0) || (props.row % 2 !== 0 && props.col % 2 !== 0);

  return (
    <div className={ redSquare ? "redSquare" : "blackSquare" } onClick={() => props.handleClick(props.row, props.col)}>
      {props.board[props.row][props.col] !== null ? <Checker team={props.board[props.row][props.col]}></Checker> : null}
    </div>

  );
}

function App() {
  return (
   <Board></Board>
  );
}

function Checker(props) {
  return (
    <div className={props.team==="white" ? "whiteChecker" : "redChecker"}></div>
  );
}

export default App;
