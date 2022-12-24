import './App.css';
import React, { useState } from 'react';

function Board() {
  var [redTurn, setRedTurn] = useState(true);

  var [selectedCheckerRow, setSelectedCheckerRow] = useState(null);
  var [selectedCheckerCol, setSelectedCheckerCol] = useState(null);
  var [board, setBoard] = useState([
    [null, "whiteChecker", null, "whiteChecker", null, "whiteChecker", null, "whiteChecker"],
    ["whiteChecker", null, "whiteChecker", null, "whiteChecker", null, "whiteChecker", null],
    [null, "whiteChecker", null, "whiteChecker", null, "whiteChecker", null, "whiteChecker"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["redChecker", null, "redChecker", null, "redChecker", null, "redChecker", null],
    [null, "redChecker", null, "redChecker", null, "redChecker", null, "redChecker"],
    ["redChecker", null, "redChecker", null, "redChecker", null, "redChecker", null],
  ]);

  const anyValidJump = (srcRow, srcCol) => {
    console.log(srcRow, srcCol);
    if (board[srcRow][srcCol] === "redChecker" && (canJump(srcRow, srcCol, srcRow - 2, srcCol + 2) || canJump(srcRow, srcCol, srcRow - 2, srcCol - 2))) {
      return true;
    } else if (board[srcRow][srcCol] === "whiteChecker" && (canJump(srcRow, srcCol, srcRow + 2, srcCol + 2) || canJump(srcRow, srcCol, srcRow + 2, srcCol - 2))) {
      return true;
    } else if ((board[srcRow][srcCol] === "redKing" || board[srcRow][srcCol] === "whiteKing") && (canJump(srcRow, srcCol, srcRow - 2, srcCol + 2) || canJump(srcRow, srcCol, srcRow - 2, srcCol - 2) || canJump(srcRow, srcCol, srcRow + 2, srcCol + 2) || canJump(srcRow, srcCol, srcRow + 2, srcCol - 2))) {
      return true;
    } else {
      return false;
    }
  }

  // TODO Adjust this funct
  const canJump = (srcRow, srcCol, destinationRow, destinationCol) => {
    if (destinationRow < 0 || destinationRow > 7 || destinationCol < 0 || destinationCol > 7) {
      return false;
    } else if (board[srcRow][srcCol] === "whiteChecker" && srcRow - destinationRow === -2 && Math.abs(srcCol - destinationCol) === 2 && (board[(srcRow + destinationRow) / 2][(srcCol + destinationCol) / 2] === "redChecker" || board[(srcRow + destinationRow) / 2][(srcCol + destinationCol) / 2] === "redKing")  && board[destinationRow][destinationCol] === null) {
      return true;
    } else if (board[srcRow][srcCol] === "redChecker" && srcRow - destinationRow === 2 && Math.abs(srcCol - destinationCol) === 2 && (board[(srcRow + destinationRow) / 2][(srcCol + destinationCol) / 2] === "whiteChecker" || board[(srcRow + destinationRow) / 2][(srcCol + destinationCol) / 2] === "whiteKing") && board[destinationRow][destinationCol] === null) {
      return true;
    } else if (board[srcRow][srcCol] === "redKing" && Math.abs(srcRow - destinationRow) === 2 && Math.abs(srcCol - destinationCol) === 2 && (board[(srcRow + destinationRow) / 2][(srcCol + destinationCol) / 2] === "whiteChecker" || board[(srcRow + destinationRow) / 2][(srcCol + destinationCol) / 2] === "whiteKing") && board[destinationRow][destinationCol] === null) {
      return true;
    } else if (board[srcRow][srcCol] === "whiteKing" && Math.abs(srcRow - destinationRow) === 2 && Math.abs(srcCol - destinationCol) === 2 && (board[(srcRow + destinationRow) / 2][(srcCol + destinationCol) / 2] === "redChecker" || board[(srcRow + destinationRow) / 2][(srcCol + destinationCol) / 2] === "redKing") && board[destinationRow][destinationCol] === null) {
      return true;
    } else {
      return false;
    }
  }

  const handleClick = (row, col) => {
    if (((board[row][col] === "redChecker" || board[row][col] === "redKing") && redTurn === true) || ((board[row][col] === "whiteChecker" || board[row][col] === "whiteKing") && redTurn === false)) {
      // Select checker
      setSelectedCheckerRow(row);
      setSelectedCheckerCol(col);
    } else if (board[row][col] === null) {
      // Move checker
      if (selectedCheckerRow !== null) {
        var newBoard = board.slice();

        //if selected checker is red

        //if its just moving
        if ((board[selectedCheckerRow][selectedCheckerCol] === "redChecker" || board[selectedCheckerRow][selectedCheckerCol] === "redKing") && row - selectedCheckerRow === -1 && Math.abs(col - selectedCheckerCol) === 1 && redTurn === true) {
          if (row === 0) {
            newBoard[row][col] = "redKing";
          } else {
            newBoard[row][col] = board[selectedCheckerRow][selectedCheckerCol];;
          }

          newBoard[selectedCheckerRow][selectedCheckerCol] = null;

          setBoard(newBoard);

          setRedTurn(false);
          setSelectedCheckerRow(null);
          setSelectedCheckerCol(null);

          //if its jumping
        } else if ((board[selectedCheckerRow][selectedCheckerCol] === "redChecker" || board[selectedCheckerRow][selectedCheckerCol] === "redKing") && canJump(selectedCheckerRow, selectedCheckerCol, row, col)) {
          newBoard[(selectedCheckerRow + row) / 2][(selectedCheckerCol + col) / 2] = null;

          if (row === 0) {
            newBoard[row][col] = "redKing";
          } else {
            newBoard[row][col] = board[selectedCheckerRow][selectedCheckerCol];
          }

          newBoard[selectedCheckerRow][selectedCheckerCol] = null;

          setBoard(newBoard);

          if (!anyValidJump(row, col)) {
            setRedTurn(false);
            setSelectedCheckerRow(null);
            setSelectedCheckerCol(null);
          } else {
            setSelectedCheckerRow(row);
            setSelectedCheckerCol(col);
          }
        }

        //if selected checker is white

        //if its just moving
        if ((board[selectedCheckerRow][selectedCheckerCol] === "whiteChecker" || board[selectedCheckerRow][selectedCheckerCol] === "whiteKing") && row - selectedCheckerRow === 1 && Math.abs(col - selectedCheckerCol) === 1 && redTurn === false) {
          if (row === 7) {
            newBoard[row][col] = "whiteKing";
          } else {
            newBoard[row][col] = board[selectedCheckerRow][selectedCheckerCol];;
          }

          newBoard[selectedCheckerRow][selectedCheckerCol] = null;

          setBoard(newBoard);

          setRedTurn(true);
          setSelectedCheckerRow(null);
          setSelectedCheckerCol(null);

          //if its jumping
        } else if ((board[selectedCheckerRow][selectedCheckerCol] === "whiteChecker" || board[selectedCheckerRow][selectedCheckerCol] === "whiteKing") && canJump(selectedCheckerRow, selectedCheckerCol, row, col)) {
          newBoard[(selectedCheckerRow + row) / 2][(selectedCheckerCol + col) / 2] = null;

          if (row === 7) {
            newBoard[row][col] = "whiteKing";
          } else {
            newBoard[row][col] = board[selectedCheckerRow][selectedCheckerCol];
          }

          newBoard[selectedCheckerRow][selectedCheckerCol] = null;

          setBoard(newBoard);

          if (!anyValidJump(row, col)) {
            setRedTurn(true);
            setSelectedCheckerRow(null);
            setSelectedCheckerCol(null);
          } else {
            setSelectedCheckerRow(row);
            setSelectedCheckerCol(col);
          }
        }
      }
    }

  };



  return (
    <div className="board">
      <Row handleClick={handleClick} board={board} selectedCheckerRow={selectedCheckerRow} selectedCheckerCol={selectedCheckerCol} row={0}></Row>
      <Row handleClick={handleClick} board={board} selectedCheckerRow={selectedCheckerRow} selectedCheckerCol={selectedCheckerCol} row={1}></Row>
      <Row handleClick={handleClick} board={board} selectedCheckerRow={selectedCheckerRow} selectedCheckerCol={selectedCheckerCol} row={2}></Row>
      <Row handleClick={handleClick} board={board} selectedCheckerRow={selectedCheckerRow} selectedCheckerCol={selectedCheckerCol} row={3}></Row>
      <Row handleClick={handleClick} board={board} selectedCheckerRow={selectedCheckerRow} selectedCheckerCol={selectedCheckerCol} row={4}></Row>
      <Row handleClick={handleClick} board={board} selectedCheckerRow={selectedCheckerRow} selectedCheckerCol={selectedCheckerCol} row={5}></Row>
      <Row handleClick={handleClick} board={board} selectedCheckerRow={selectedCheckerRow} selectedCheckerCol={selectedCheckerCol} row={6}></Row>
      <Row handleClick={handleClick} board={board} selectedCheckerRow={selectedCheckerRow} selectedCheckerCol={selectedCheckerCol} row={7}></Row>
    </div>

  );
}

function Row(props) {
  return (
    <div className="row">
      <Square handleClick={props.handleClick} board={props.board} selectedCheckerRow={props.selectedCheckerRow} selectedCheckerCol={props.selectedCheckerCol} row={props.row} col={0}></Square>
      <Square handleClick={props.handleClick} board={props.board} selectedCheckerRow={props.selectedCheckerRow} selectedCheckerCol={props.selectedCheckerCol} row={props.row} col={1}></Square>
      <Square handleClick={props.handleClick} board={props.board} selectedCheckerRow={props.selectedCheckerRow} selectedCheckerCol={props.selectedCheckerCol} row={props.row} col={2}></Square>
      <Square handleClick={props.handleClick} board={props.board} selectedCheckerRow={props.selectedCheckerRow} selectedCheckerCol={props.selectedCheckerCol} row={props.row} col={3}></Square>
      <Square handleClick={props.handleClick} board={props.board} selectedCheckerRow={props.selectedCheckerRow} selectedCheckerCol={props.selectedCheckerCol} row={props.row} col={4}></Square>
      <Square handleClick={props.handleClick} board={props.board} selectedCheckerRow={props.selectedCheckerRow} selectedCheckerCol={props.selectedCheckerCol} row={props.row} col={5}></Square>
      <Square handleClick={props.handleClick} board={props.board} selectedCheckerRow={props.selectedCheckerRow} selectedCheckerCol={props.selectedCheckerCol} row={props.row} col={6}></Square>
      <Square handleClick={props.handleClick} board={props.board} selectedCheckerRow={props.selectedCheckerRow} selectedCheckerCol={props.selectedCheckerCol} row={props.row} col={7}></Square>
    </div>
  );
}

function Square(props) {
  const redSquare = (props.row % 2 === 0 && props.col % 2 === 0) || (props.row % 2 !== 0 && props.col % 2 !== 0);

  return (
    <div className={redSquare ? "redSquare" : "blackSquare"} onClick={() => props.handleClick(props.row, props.col)}>
      {props.board[props.row][props.col] !== null ? <Checker team={props.board[props.row][props.col]} selected={props.row === props.selectedCheckerRow && props.col === props.selectedCheckerCol}></Checker> : null}
    </div>
  );
}

function Checker(props) {
  var className = props.team;

  if (props.selected) {
    className += " selectedChecker"
  }

  return (
    <div className={className}></div>
  );
}

function App() {
  return (
    <Board></Board>
  );
}

export default App;
