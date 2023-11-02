import React, { useEffect} from "react";
import Stone from "../class/Stone";
import { StoneSelection } from "../Interface/Stone";
import BoardDataInterface from "../Interface/BoardDataInterface";
import { Color } from "../enum/StoneEnum";

export default function Board(
    {
        setStoneStack, 
        board, setBoard, 
        stoneSelection, 
        setStoneSelection, 
        whiteStoneNumber, 
        setWhiteStoneNumber, 
        blackStoneNumber, 
        setBlackStoneNumber
    } : BoardDataInterface
    
){
    const width: number = 700;
    const height: number = 700;
    const size: number = 6;
    const temp: Stone[][][] = [];
    for(let i=0; i<size; i++){
        temp.push([]);
        for(let j=0; j<size; j++){
            temp[i].push([]);
        }
    }
    useEffect(() => {
        setBoard(temp)
    }, [])
    
    
    function setIndicator(event: React.MouseEvent<HTMLElement>){
        const x = parseInt(event.currentTarget.getAttribute('data-x') || '-1');
        const y = parseInt(event.currentTarget.getAttribute('data-y') || '-1');
        board && setStoneStack(
            [...board[x][y]]
        );
    }

    function placeStone(event: React.MouseEvent<HTMLElement>){
        if(board){
            const x = parseInt(event.currentTarget.getAttribute('data-x') || '-1');
            const y = parseInt(event.currentTarget.getAttribute('data-y') || '-1');
            
            if(stoneSelection.stoneDetail && stoneSelection.stoneDetail.color === Color.BLACK){
                setBlackStoneNumber(
                    {
                        capStoneNumber: stoneSelection.stoneDetail.isCapstone ? blackStoneNumber.capStoneNumber - 1 : blackStoneNumber.capStoneNumber,
                        flatStoneNumber: stoneSelection.stoneDetail.isCapstone ? blackStoneNumber.flatStoneNumber : blackStoneNumber.flatStoneNumber - 1,
                        color: stoneSelection.stoneDetail.color
                    }
                )
            }else{
                stoneSelection.stoneDetail && setWhiteStoneNumber(
                    {
                        capStoneNumber: stoneSelection.stoneDetail.isCapstone ? whiteStoneNumber.capStoneNumber - 1 : whiteStoneNumber.capStoneNumber,
                        flatStoneNumber: stoneSelection.stoneDetail.isCapstone ? whiteStoneNumber.flatStoneNumber : whiteStoneNumber.flatStoneNumber - 1,
                        color: stoneSelection.stoneDetail.color
                    }
                )
            }

            const temp = board.slice();
            board && stoneSelection.stoneDetail && temp[x][y].push(
                new Stone(stoneSelection.stoneDetail.position, stoneSelection.stoneDetail.isCapstone, stoneSelection.stoneDetail.color)
            );
            setBoard(temp);

            setStoneSelection({
                isSelected: false,
                stoneDetail: undefined
            });


        }
    }
        
    return (
        <div className="p-5 border border-dark rounded rounded-4">
            {
                board && board.map((x, indexX) => {
                    return (
                        <div className="row justify-content-center mx-auto bg-secondary" style={{width: `${width}px`}} key={indexX.toString()}>
                            {
                                x.map((y, indexY) => {
                                    return (
                                        <div
                                            className={`col-${12/board.length} position-relative d-flex align-items-center justify-content-center text-center border board-column`} 
                                            style={{height: `${height/size}px`}}
                                            key={`${indexX}${indexY}`}
                                            data-x={indexX} data-y={indexY}
                                            onClick={stoneSelection.isSelected ? placeStone : setIndicator}
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