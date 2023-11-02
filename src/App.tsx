import { useEffect, useState } from 'react'
import './App.css'
import Board from './component/Board'
import Stone from './class/Stone'
import Indicator from './component/Indicator';
import StoneNumber from './Interface/StoneNumber';
import { Color } from './enum/StoneEnum';
import Item from './component/Item';
import { StoneSelection, StoneStack } from './Interface/Stone';

function App() {
  const [board, setBoard] = useState<Stone[][][]>();
  const [stoneStack, setStoneStack] = useState<StoneStack>({
    X: -1,
    Y: -1,
    stoneStack: undefined
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
  const [turn, setTurn] = useState<Boolean>(false);
  useEffect(() => {
    console.log(stoneSelection)
  }, [stoneSelection])
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className='col bg-success'>
          <div className='row flex-column h-100'>
            <div className="col-auto h-50 d-flex flex-colomn justify-content-center overflow-auto">
              <Indicator stoneStack={stoneStack}></Indicator>
            </div>
            <div className='col-auto h-50 d-flex justify-content-center align-items-around flex-column'>
              {(stoneSelection.stoneDetail != undefined || stoneStack.stoneStack != undefined) && <button className='btn btn-info' onClick={() => {
                setStoneSelection({
                  isSelected: false,
                  stoneDetail: undefined
                })
                setStoneStack({X:-1, Y:-1, stoneStack:undefined});
              }}>cancel</button>}
              <Item stoneNumber={whiteStoneNumber} setStoneSelection={setStoneSelection} stoneSelection={stoneSelection} setStoneStack={setStoneStack} turn={turn}></Item>
            </div>
          </div>
        </div>

        <div className="col-auto mx-auto">
          <Board stoneStack={stoneStack} setStoneStack={setStoneStack} board={board} setBoard={setBoard} stoneSelection={stoneSelection} setStoneSelection={setStoneSelection} whiteStoneNumber={whiteStoneNumber} setWhiteStoneNumber={setWhiteStoneNumber} blackStoneNumber={blackStoneNumber} setBlackStoneNumber={setBlackStoneNumber} turn={turn} setTurn={setTurn}></Board>
        </div>

        <div className='col bg-success'>
          <div className='row flex-column h-100'>
            <div className="col-auto h-50"></div>
            <div className='col-auto h-50 d-flex justify-content-center align-items-around flex-column'>
              <Item stoneNumber={blackStoneNumber} setStoneSelection={setStoneSelection} stoneSelection={stoneSelection} setStoneStack={setStoneStack} turn={turn}></Item>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
