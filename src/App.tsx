import { useState } from 'react'
import './App.css'
import Board from './component/Board'
import Stone from './class/Stone'
import Indicator from './component/Indicator';

function App() {
  const [stoneStack, setStoneStack] = useState<Stone[]>();
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className='col bg-success'>
          <div className='row flex-column'>
            <div className="col-6">
              <Indicator stoneStack={stoneStack}></Indicator>
            </div>
            <div className='col-6'></div>
          </div>
        </div>
        <div className="col-auto mx-auto">
          <Board setStoneStack={setStoneStack}></Board>
        </div>
      </div>
    </div>
  )
}

export default App
