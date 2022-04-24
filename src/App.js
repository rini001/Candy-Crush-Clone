import { useEffect, useState } from "react";
import BlueCandy from "./images/blue-candy.png";
import GreenCandy from "./images/green-candy.png";
import OrangeCandy from "./images/orange-candy.png";
import PurpleCandy from "./images/purple-candy.png";
import RedCandy from "./images/red-candy.png";
import YellowCandy from "./images/yellow-candy.png";
import Blank from "./images/blank.png";
import { ScoreBoard } from "./components/ScoreBoard";
const width = 8;

const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
];

function Candies() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      if (
        columnOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        // setScoreDisplay((score)=>score+4)
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = Blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        // setScoreDisplay((score)=>score+4)
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = Blank)
        );
        return true;
      }
    }
  };
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      if (
        columnOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        // setScoreDisplay((score)=>score+3)
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = Blank)
        );
        return true;
      }
    }
  };
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        // setScoreDisplay((score)=>score+3)
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = Blank)
        );
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    // i<64-width
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentColorArrangement[i] === Blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }
      if (currentColorArrangement[i + width] === Blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = Blank;
      }
    }
  };

  const dragStart = (e) => {
    // console.log("Start");
    // console.log(e.target);
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    // console.log("Drop");
    // console.log(e.target);
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    // console.log("End");
    // console.log(e.target);
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");
    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);
    // console.log(validMove);
    // console.log(squareBeingReplacedId);
    const isColumnOfFour = checkForColumnOfFour();
    const isRowOfFour = checkForRowOfFour();
    const isColumnOfThree = checkForColumnOfThree();
    const isRowOfThree = checkForRowOfThree();
   
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingDragged.getAttribute("src");
 
    if(validMove && squareBeingReplacedId && (isColumnOfFour||isRowOfFour||isColumnOfThree||isRowOfThree)){
      // setSquareBeingDragged(null)
      // setSquareBeingReplaced(null)
      // currentColorArrangement[squareBeingDraggedId]=squareBeingReplaced.getAttribute('src')
      // currentColorArrangement[squareBeingReplacedId]=squareBeingDragged.getAttribute('src')
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingDragged.getAttribute("src");
    }
    else{
      // currentColorArrangement[squareBeingReplacedId]=squareBeingReplaced.getAttribute('src')
      // currentColorArrangement[squareBeingDraggedId]=squareBeingDragged.getAttribute('src')
      // setCurrentColorArrangement([...currentColorArrangement])
      alert("not a valid move")
    }
    
    if (validMove && (isColumnOfFour || isRowOfFour || isColumnOfThree || isRowOfThree)) {
      setScoreDisplay((score) => score + 3);
    }
  };
  // console.log(scoreDisplay)
  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomNumberFrom0to5 = Math.floor(
        Math.random() * candyColors.length
      );
      const randomColor = candyColors[randomNumberFrom0to5];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };
  //we use useEffect to prevent too many rerenders
  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);
  // console.log(currentColorArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((el, i) => (
          <img
            src={el}
            key={i}
            //  style={{backgroundColor:el}}
            alt={el}
            data-id={i}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            onTouchCancel={dragEnd}
            onTouchEnd={dragEnd}
            onTouchMove={dragDrop}
            onTouchStart={dragStart}
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
}

export default Candies;

