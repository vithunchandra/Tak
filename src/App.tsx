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
  const [level, setLevel] = useState(1) ;
  const [board, setBoard] = useState<Stone[][][]>();
  const [Cboard, setCBoard] = useState<Stone[][][]>();
  const [stoneStack, setStoneStack] = useState<StoneStack>({
    X: -1,
    Y: -1,
    Stack: undefined
  });
  const [stackView, setStackView] = useState<Stone[] | undefined>(undefined);
  function levelply(level : number){
    // console.log("test");
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
      <div className="row header">
        <div className="col-3 judul d-flex justify-content-start align-items-center">TAK</div>
        <div className="row col-6">
          <div className="d-flex justify-content-around align-items-center">
            <div>
                <button className="btn btn-warning position-relative tomblev" onClick={() => {levelply(1)}}>
                  <h3 className="restext">Level 1</h3>
                </button>
            </div>
            <div>
                <button className="btn btn-warning position-relative tomblev" onClick={() => {levelply(2)}}>
                  <h3 className="restext">Level 2</h3>
                </button>
            </div>
            <div>
                <button className="btn btn-warning position-relative tomblev" onClick={() => {levelply(3)}}>
                  <h3 className="restext">Level 3</h3>
                </button>
            </div>
            <div>
                <button className="btn btn-warning position-relative tomblev" onClick={() => {levelply(4)}}>
                  <h3 className="restext">Level 4</h3>
                </button>
            </div>
            <div>
                <button className="btn btn-warning position-relative tomblev" onClick={() => {levelply(5)}}>
                  <h3 className="restext">Level 5</h3>
                </button>
            </div>
          </div>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
            <button className="btn bg-dark tombres border border-light" onClick={() => {restart()}}>
              <h3 className="restext1">Restart</h3>
            </button>
        </div>
      </div>
      
      <div className="row pb-5 backgroundcolor">
        <div className='col'>
          <div className='row flex-column h-100'>
            <div className="col-auto h-50 d-flex flex-colomn justify-content-center overflow-auto">
              <Indicator stoneStack={stoneStack} stackView={stackView} location={"left"}></Indicator>
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

        <div className="col-auto mx-0">
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
            level={level} setStackView={setStackView}
          ></Board>
        </div>

        <div className='col'>
          <div className='row flex-column h-100'>
            <div className="col-auto h-50 d-flex flex-colomn justify-content-center overflow-auto">
              <Indicator stoneStack={stoneStack} stackView={stackView} location={"right"}></Indicator>
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
