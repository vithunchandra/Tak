import { useState } from "react";
import Stone from "../class/Stone";
import { Color, Position } from "../enum/StoneEnum";

export default function Board({setStoneStack}){
    const width: number = 700;
    const height: number = 700;
    const size: number = 6;
    const temp: Stone[][][] = [];
    for(let i=0; i<size; i++){
        temp.push([]);
        for(let j=0; j<size; j++){
            temp[i].push([]);
            for(let z=0; z<5; z++){
                let random = Math.floor(Math.random() * 2);
                const position = random === 0 ? Position.FLAT : Position.STAND;
                random = Math.floor(Math.random() * 2);
                const isCapStone = random === 0 ? false : true;
                random = Math.floor(Math.random() * 2);
                const color = random === 0 ? Color.BLACK : Color.WHITE;
                temp[i][j].push(new Stone(position, isCapStone, color));
            }
        }
    }
    const [board, setBoard] = useState<Stone[][][]>(temp)
    
    function setIndicator(event: React.MouseEvent<HTMLElement>){
        const x = parseInt(event.currentTarget.getAttribute('data-x') || '-1');
        const y = parseInt(event.currentTarget.getAttribute('data-y') || '-1');
        console.log(board[x][y])
        setStoneStack(
            [...board[x][y]]
        )
    }
        
    return (
        <div className="p-5 border border-dark rounded rounded-4">
            {
                board.map((x, indexX) => {
                    return (
                        <div className="row justify-content-center mx-auto bg-secondary" style={{width: `${width}px`}} key={indexX.toString()}>
                            {
                                x.map((y, indexY) => {
                                    return (
                                        <div
                                            className={`col-${12/board.length} position-relative d-flex align-items-center justify-content-center text-center border`} 
                                            style={{height: `${height/size}px`}}
                                            key={`${indexX}${indexY}`}
                                            data-x={indexX} data-y={indexY}
                                            onClick={setIndicator}
                                        >
                                            {
                                                y.map((z, indexZ) => {
                                                    let idx = `${indexX}${indexY}${indexZ}`;
                                                    return (
                                                        z.printStone(idx)
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}