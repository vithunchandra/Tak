import { useEffect, useState } from 'react'
import './App.css'
import Board from './component/Board'
import Stone from './class/Stone'
import Indicator from './component/Indicator';
import StoneNumber from './Interface/StoneNumber';
import { Color } from './enum/StoneEnum';
import Item from './component/Item';
import { StoneSelection, StoneStack } from './Interface/Stone';
import Turn from './Interface/Turn';

function App() {
  const [board, setBoard] = useState<Stone[][][]>();
  const [Cboard, setCBoard] = useState<Stone[][][]>();
  const [stoneStack, setStoneStack] = useState<StoneStack>({
    X: -1,
    Y: -1,
    Stack: undefined
  });
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
      <div className="row atass">
        <p className="judul ">Tak</p>
      </div>
      <div className="row backgroundcolor atas">
        <h2 className="judul1">{} Turn</h2>
      </div>
      <div className="row">
        
        <div className='col backgroundcolor'>
          <div className='row flex-column h-100'>
            <div className="col-auto h-50 d-flex flex-colomn justify-content-center overflow-auto">
              <Indicator stoneStack={stoneStack}></Indicator>
            </div>
            <div className='col-auto h-50 d-flex justify-content-center align-items-around flex-column'>
              {(stoneSelection.stoneDetail != undefined || stoneStack?.Stack != undefined) && <button className='btn btn-info' onClick={() => {
                setStoneSelection({
                  isSelected: false,
                  stoneDetail: undefined
                })
                setStoneStack({X:-1, Y:-1, Stack:undefined});
                setBoard(Cboard)
              }}>cancel</button>}
              <Item 
                stoneNumber={whiteStoneNumber} 
                setStoneSelection={setStoneSelection} 
                stoneSelection={stoneSelection} 
                stoneStack={stoneStack} setStoneStack={setStoneStack} 
                turn={turn} setBoard={setBoard} board={board}
                Cboard={Cboard} setCBoard={setCBoard}
              ></Item>
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
