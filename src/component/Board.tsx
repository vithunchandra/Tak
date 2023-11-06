import React, { useEffect} from "react";
import Stone from "../class/Stone";
import BoardDataInterface from "../Interface/BoardDataInterface";
import { Color, Point, Position } from "../enum/StoneEnum";

export default function Board(
    {
        stoneStack,
        setStoneStack, 
        board, setBoard, 
        Cboard, setCBoard, 
        stoneSelection, 
        setStoneSelection, 
        whiteStoneNumber, 
        setWhiteStoneNumber, 
        blackStoneNumber, 
        setBlackStoneNumber,
        turn, setTurn
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
    useEffect(() => {
        console.log(turn);
    }, [turn])

    function setIndicator(event: React.MouseEvent<HTMLElement>){
        const x = parseInt(event.currentTarget.getAttribute('data-x') || '-1');
        const y = parseInt(event.currentTarget.getAttribute('data-y') || '-1');

        if(board && stoneStack?.Stack){
            let move = true
            if(stoneStack.Stack[0].isCapStone && board[x][y][board[x][y].length-1]?.isCapStone){
                move = false
            }else if(((stoneStack.Stack[0].position == Position.FLAT && !stoneStack.Stack[0].isCapStone) || stoneStack.Stack[0].position == Position.STAND) && (board[x][y][board[x][y].length-1]?.position == Position.STAND || board[x][y][board[x][y].length-1]?.isCapStone)){
                move = false
            }
            if(stoneStack.Stack[0].isCapStone && board[x][y][board[x][y].length-1]?.position == Position.STAND){
                console.log("test");
                board[x][y][board[x][y].length-1].position = Position.FLAT
                setBoard(board)
            }

            if(move){
                // move/unstack
                let getPoint;
                if(stoneStack.X == x-1 && stoneStack.Y == y){
                    getPoint = Point.DOWN
                }else if(stoneStack.X == x+1 && stoneStack.Y == y){
                    getPoint = Point.UP
                }else if(stoneStack.Y == y-1 && stoneStack.X == x){
                    getPoint = Point.RIGHT
                }else if(stoneStack.Y == y+1 && stoneStack.X == x){
                    getPoint = Point.LEFT
                }else if(y == stoneStack.Y && x == stoneStack.X){
                    getPoint = Point.CENTER
                }else{
                    getPoint = undefined
                }

                const temp = board.slice();
                const tmp = stoneStack;
    
                if(getPoint == undefined){
                    setBoard(Cboard)
                    setStoneStack({X:-1, Y:-1, Stack: undefined})
                    setTurn({
                        firstMove: turn.firstMove,
                        turn: turn.turn,
                        point: undefined
                    });
                }else if(turn.point){
                    if(getPoint == Point.CENTER){
                        // console.log("test center");
                        tmp.Stack && temp[x][y].push(tmp.Stack.splice(0, 1)[0]);
                        setBoard(temp);
                        setStoneStack({
                            X: x,
                            Y: y,
                            Stack: tmp.Stack?.length == 0 ? undefined : tmp.Stack
                        });
    
                        if(turn.point == Point.CENTER){
                            setTurn({
                                firstMove: turn.firstMove,
                                turn: turn.turn,
                                point: tmp.Stack?.length == 0 ? undefined : turn.point
                            });
                        }else{
                            setTurn({
                                firstMove: turn.firstMove,
                                turn: tmp.Stack?.length == 0 ? !turn.turn : turn.turn,
                                point: tmp.Stack?.length == 0 ? undefined : turn.point
                            });
                        }
                    }else if((turn.point == Point.UP || turn.point == Point.CENTER) && getPoint == Point.UP){
                        // console.log("test up");
                        tmp.Stack && temp[x][y].push(tmp.Stack.splice(0, 1)[0]);
                        setBoard(temp);
                        setStoneStack({
                            X: x,
                            Y: y,
                            Stack: tmp.Stack?.length == 0 ? undefined : tmp.Stack
                        });
    
                        setTurn({
                            firstMove: turn.firstMove,
                            turn: tmp.Stack?.length == 0 ? !turn.turn : turn.turn,
                            point: tmp.Stack?.length == 0 ? undefined : getPoint
                        });
                    }else if((turn.point == Point.RIGHT || turn.point == Point.CENTER) && getPoint == Point.RIGHT){
                        // console.log("test right");
                        tmp.Stack && temp[x][y].push(tmp.Stack.splice(0, 1)[0]);
                        setBoard(temp);
                        setStoneStack({
                            X: x,
                            Y: y,
                            Stack: tmp.Stack?.length == 0 ? undefined : tmp.Stack
                        });
    
                        setTurn({
                            firstMove: turn.firstMove,
                            turn: tmp.Stack?.length == 0 ? !turn.turn : turn.turn,
                            point: tmp.Stack?.length == 0 ? undefined : getPoint
                        });
                    }else if((turn.point == Point.DOWN || turn.point == Point.CENTER) && getPoint == Point.DOWN){
                        // console.log("test down");
                        tmp.Stack && temp[x][y].push(tmp.Stack.splice(0, 1)[0]);
                        setBoard(temp);
                        setStoneStack({
                            X: x,
                            Y: y,
                            Stack: tmp.Stack?.length == 0 ? undefined : tmp.Stack
                        });
    
                        setTurn({
                            firstMove: turn.firstMove,
                            turn: tmp.Stack?.length == 0 ? !turn.turn : turn.turn,
                            point: tmp.Stack?.length == 0 ? undefined : getPoint
                        });
                    }else if((turn.point == Point.LEFT || turn.point == Point.CENTER) && getPoint == Point.LEFT){
                        // console.log("test left");
                        tmp.Stack && temp[x][y].push(tmp.Stack.splice(0, 1)[0]);
                        setBoard(temp);
                        setStoneStack({
                            X: x,
                            Y: y,
                            Stack: tmp.Stack?.length == 0 ? undefined : tmp.Stack
                        });
    
                        setTurn({
                            firstMove: turn.firstMove,
                            turn: tmp.Stack?.length == 0 ? !turn.turn : turn.turn,
                            point: tmp.Stack?.length == 0 ? undefined : getPoint
                        });
                    }else{
                        setBoard(Cboard)
                        setStoneStack({X:-1, Y:-1, Stack: undefined})
                        setTurn({
                            firstMove: turn.firstMove,
                            turn: turn.turn,
                            point: undefined
                        });
                    }
                }else{
                    tmp.Stack && temp[x][y].push(tmp.Stack.splice(0, 1)[0]);
                    setBoard(temp);
                    setStoneStack({
                        X: x,
                        Y: y,
                        Stack: tmp.Stack?.length == 0 ? undefined : tmp.Stack
                    });
    
                    if(getPoint == Point.CENTER){
                        setTurn({
                            firstMove: turn.firstMove,
                            turn: turn.turn,
                            point: tmp.Stack?.length == 0 ? undefined : getPoint
                        });
                    }else{
                        setTurn({
                            firstMove: turn.firstMove,
                            turn: tmp.Stack?.length == 0 ? !turn.turn : turn.turn,
                            point: tmp.Stack?.length == 0 ? undefined : getPoint
                        });
                    }
    
                }
            }
        }else{
            if(turn.point == undefined){
                board && setCBoard([
                    [
                        [...board[0][0]], [...board[0][1]], [...board[0][2]], [...board[0][3]], [...board[0][4]], [...board[0][5]]
                    ],
                    [
                        [...board[1][0]], [...board[1][1]], [...board[1][2]], [...board[1][3]], [...board[1][4]], [...board[1][5]]
                    ],
                    [
                        [...board[2][0]], [...board[2][1]], [...board[2][2]], [...board[2][3]], [...board[2][4]], [...board[2][5]]
                    ],
                    [
                        [...board[3][0]], [...board[3][1]], [...board[3][2]], [...board[3][3]], [...board[3][4]], [...board[3][5]]
                    ],
                    [
                        [...board[4][0]], [...board[4][1]], [...board[4][2]], [...board[4][3]], [...board[4][4]], [...board[4][5]]
                    ],
                    [
                        [...board[5][0]], [...board[5][1]], [...board[5][2]], [...board[5][3]], [...board[5][4]], [...board[5][5]]
                    ],
                ])
            }

            if(board && ((board[x][y][board[x][y].length-1]?.color == Color.WHITE && turn.turn) || (board[x][y][board[x][y].length-1]?.color == Color.BLACK && !turn.turn))){
                setStoneStack({
                    X: x,
                    Y: y,
                    Stack: [...board[x][y]]
                })
                const temp = board.slice();
                temp && temp[x][y].splice(0, temp[x][y].length > 6 ? 6 : temp[x][y].length);
                setBoard(temp);
            }else{
                console.log("Test");
            }
        }
    }

    function placeStone(event: React.MouseEvent<HTMLElement>){
        if(board){
            const x = parseInt(event.currentTarget.getAttribute('data-x') || '-1');
            const y = parseInt(event.currentTarget.getAttribute('data-y') || '-1');
            if(board[x][y].length == 0){
            
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

                if(turn.firstMove && turn.turn){
                    setTurn({
                        firstMove: false,
                        turn: true,
                        point: undefined
                    })
                }else{
                    setTurn({
                        firstMove: turn.firstMove,
                        turn: !turn.turn,
                        point: undefined
                    });
                }
            }
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