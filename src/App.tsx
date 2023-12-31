import { useEffect, useState } from 'react'
import './App.css'
import Board from './component/Board'
import Stone from './class/Stone'
import Indicator from './component/Indicator';
import StoneNumber from './Interface/StoneNumber';
import { Color } from './enum/StoneEnum';
import Item from './component/Item';
import ItemPlayer from './component/ItemPlayer';
import { StoneSelection, StoneStack } from './Interface/Stone';
import Turn from './Interface/Turn';

function restart(){
  location.reload();
}


function App() {
  const [level, setLevel] = useState(5) ;
  const [board, setBoard] = useState<Stone[][][]>();
  const [Cboard, setCBoard] = useState<Stone[][][]>();
  const [stoneStack, setStoneStack] = useState<StoneStack>({
    X: -1,
    Y: -1,
    Stack: undefined
  });
  function levelply(level){
    console.log("wcewcec");
    setLevel(level);
  }
  const [whiteStoneNumber, setWhiteStoneNumber] = useState<StoneNumber>(
    {
      capStoneNumber: 1,
      flatStoneNumber: 30,
      color: Color.WHITE
    }
  )
  const [blackStoneNumber, setBlackStoneNumber] = useState<StoneNumber>(
    {
      capStoneNumber: 1,
      flatStoneNumber: 30,
      color: Color.BLACK
    }
  )
  const [stoneSelection, setStoneSelection] = useState<StoneSelection>({
    isSelected: false,
    stoneDetail: undefined
  });
  const [turn, setTurn] = useState<Turn>({
    firstMove: true,
    turn: false,
    point: undefined
  });
  useEffect(() => {
    // console.log(stoneSelection)
  }, [stoneSelection])
  return (
    <div className='container-fluid'>
      <div className="row atass ">
        <div className="col-5 judul"></div>
        <div className="col-2 judul ">TAK </div>
        <div className="col-5 judul">
            <button className="btn bg-dark tombres" onClick={() => {restart()}}>
              <h3 className="restext1">Restart</h3>
            </button>
        </div>
      </div>
      <div className="row levels d-flex justify-content-around">
        <div className="col-1 ">
            <button className="btn btn-warning position-relative tomblev" onClick={() => {levelply(1)}}>
              <h3 className="restext">Level 1</h3>
            </button>
        </div>
        <div className="col-1">
            <button className="btn btn-warning position-relative tomblev" onClick={() => {levelply(2)}}>
              <h3 className="restext">Level 2</h3>
            </button>
        </div>
        <div className="col-1">
            <button className="btn btn-warning position-relative tomblev" onClick={() => {levelply(3)}}>
              <h3 className="restext">Level 3</h3>
            </button>
        </div>
        <div className="col-1">
            <button className="btn btn-warning position-relative tomblev" onClick={() => {levelply(4)}}>
              <h3 className="restext">Level 4</h3>
            </button>
        </div>
        <div className="col-1">
            <button className="btn btn-warning position-relative tomblev" onClick={() => {levelply(5)}}>
              <h3 className="restext">Level 5</h3>
            </button>
        </div>
      </div>
      
      <div className="row">
        
        <div className='col backgroundcolor'>
          <div className='row flex-column h-100'>
            <div className="col-auto h-50 d-flex flex-colomn justify-content-center overflow-auto">
              <Indicator stoneStack={stoneStack}></Indicator>
            </div>
            <div className='col-auto h-50 d-flex justify-content-center align-items-around flex-column'>
              {(stoneSelection.stoneDetail != undefined || stoneStack?.Stack != undefined) && 
              <button className='btn btn-danger tombolcancel' onClick={() => {
                setStoneSelection({
                  isSelected: false,
                  stoneDetail: undefined
                })
                setStoneStack({X:-1, Y:-1, Stack:undefined});
                setBoard(Cboard)
              }}>Cancel</button>}
             
              <ItemPlayer 
                stoneNumber={whiteStoneNumber} 
                setStoneSelection={setStoneSelection} 
                stoneSelection={stoneSelection} 
                stoneStack={stoneStack} setStoneStack={setStoneStack} 
                turn={turn} setBoard={setBoard} board={board}
                Cboard={Cboard} setCBoard={setCBoard}
              ></ItemPlayer>
            </div>
          </div>
        </div>

        <div className="col-auto mx-auto">
          <Board 
            stoneStack={stoneStack}
            setStoneStack={setStoneStack} 
            board={board} setBoard={setBoard} 
            Cboard={Cboard} setCBoard={setCBoard} 
            stoneSelection={stoneSelection} 
            setStoneSelection={setStoneSelection}
            whiteStoneNumber={whiteStoneNumber}
            setWhiteStoneNumber={setWhiteStoneNumber}
            blackStoneNumber={blackStoneNumber}
            setBlackStoneNumber={setBlackStoneNumber}
            turn={turn} setTurn={setTurn}
            level={level}
          ></Board>
        </div>

        <div className='col backgroundcolor'>
          <div className='row flex-column h-100'>
            <div className="col-auto h-50 d-flex flex-colomn justify-content-center overflow-auto">
              <Indicator stoneStack={stoneStack}></Indicator>
            </div>
            <div className='col-auto h-50 d-flex justify-content-center align-items-around flex-column'>
              <Item 
                stoneNumber={blackStoneNumber} 
                setStoneSelection={setStoneSelection} 
                stoneSelection={stoneSelection} 
                stoneStack={stoneStack} setStoneStack={setStoneStack} 
                turn={turn} setBoard={setBoard} board={board} 
                Cboard={Cboard} setCBoard={setCBoard}
              ></Item>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
