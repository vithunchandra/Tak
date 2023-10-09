import { useEffect, useState } from 'react'
import './App.css'
import Board from './component/Board'
import Stone from './class/Stone'
import Indicator from './component/Indicator';
import StoneNumber from './Interface/StoneNumber';
import { Color } from './enum/StoneEnum';
import Item from './component/Item';
import { StoneSelection } from './Interface/Stone';

function App() {
  const [board, setBoard] = useState<Stone[][][]>();
  const [stoneStack, setStoneStack] = useState<Stone[]>();
  const [whiteStoneNumber, setWhiteStoneNumber] = useState<StoneNumber>(
    {
      capStoneNumber: 1,
      flatStoneNumber: 31,
      color: Color.WHITE
    }
  )
  const [blackStoneNumber, setBlackStoneNumber] = useState<StoneNumber>(
    {
      capStoneNumber: 1,
      flatStoneNumber: 31,
      color: Color.BLACK
    }
  )
  const [stoneSelection, setStoneSelection] = useState<StoneSelection>({
    isSelected: false,
    stoneDetail: undefined
  });
  useEffect(() => {
    console.log(stoneSelection)
  }, [stoneSelection])
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className='col bg-success'>
          <div className='row flex-column h-100'>
            <div className="col-auto h-50">
              <Indicator stoneStack={stoneStack}></Indicator>
            </div>
            <div className='col-auto h-50 d-flex justify-content-center align-items-around flex-column'>
              <Item stoneNumber={whiteStoneNumber} setStoneSelection={setStoneSelection} stoneSelection={stoneSelection}></Item>
            </div>
          </div>
        </div>
        <div className="col-auto mx-auto">
          <Board setStoneStack={setStoneStack} board={board} setBoard={setBoard} stoneSelection={stoneSelection} setStoneSelection={setStoneSelection}></Board>
        </div>
        <div className="col"></div>
      </div>
    </div>
  )
}

export default App
