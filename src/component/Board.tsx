import React, { useEffect} from "react";
import Stone from "../class/Stone";
import BoardDataInterface from "../Interface/BoardDataInterface";
// import StoneNumber from "../Interface/StoneNumber";
import { Color, Point, Position } from "../enum/StoneEnum";
import { StoneSelection, StoneStack } from "../Interface/Stone";
import Turn from "../Interface/Turn";

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
        turn, setTurn,
        level
    } : BoardDataInterface
    
){
    let turnind: boolean = true;
    const width: number = 800;
    const height: number = 700;
    const size: number = 6;
    const temp: Stone[][][] = [];
    for(let i=0; i<size; i++){
        temp.push([]);
        for(let j=0; j<size; j++){
            temp[i].push([]);
        }
    }
    let test = 0;
    const global_ply = level
    const botMove : {nextMove : Stone[][][], newStoneWhite : number, newStoneBlack : number, newCapStoneWhite : number, newCapStoneBlack : number} = {
        nextMove: [],
        newStoneWhite : whiteStoneNumber.flatStoneNumber,
        newStoneBlack : blackStoneNumber.flatStoneNumber,
        newCapStoneWhite : whiteStoneNumber.capStoneNumber,
        newCapStoneBlack : blackStoneNumber.capStoneNumber
    };
    useEffect(() => {
        setBoard(temp)
    }, [])
    useEffect(() => {
        // console.log(board);
        // if((!turn.firstMove && !turn.turn && !stoneStack.Stack?.length)){
        //     board && minimax(copyBoard(board), global_ply, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, blackStoneNumber.flatStoneNumber, whiteStoneNumber.flatStoneNumber, blackStoneNumber.capStoneNumber, whiteStoneNumber.capStoneNumber);
        //     console.log(nextMove);
        // }
        // board && terminal(board);
    }, [board, turn])
    useEffect(() => {
        // const cboard = copyBoard(temp);
        // const stack = [new Stone(Position.FLAT, false, Color.BLACK), new Stone(Position.FLAT, false, Color.BLACK), new Stone(Position.FLAT, false, Color.BLACK), new Stone(Position.FLAT, false, Color.BLACK), new Stone(Position.FLAT, false, Color.BLACK), new Stone(Position.FLAT, true, Color.BLACK)]
        // cboard[2][2] = stack;
        // cboard[5][1] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[4][0] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[4][1] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[4][3] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[3][1] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[2][1] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[2][2] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[2][3] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[1][3] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[3][3] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[3][4] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // cboard[3][5] = [new Stone(Position.FLAT, false, Color.WHITE)]
        // minimax(cboard, global_ply, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 23, 30, 0, 1);
        // console.log(botMove.nextMove);
        // cboard[0][0] = [new Stone(Position.FLAT, false, Color.BLACK)]
        // cboard[0][1] = [new Stone(Position.FLAT, false, Color.BLACK)]
        // cboard[0][2] = [new Stone(Position.FLAT, false, Color.BLACK)]
        // cboard[0][3] = [new Stone(Position.FLAT, false, Color.BLACK)]
        // cboard[0][4] = [new Stone(Position.FLAT, false, Color.BLACK)]
        // cboard[0][5] = [new Stone(Position.FLAT, false, Color.BLACK)]
        // console.log(terminal(cboard));
        // console.log((1 < 5) !== (1 > 4))
    }, [])

    function AIMove (temp : Stone[][][], stoneSelection : StoneSelection, turn : Turn, stoneStack : StoneStack, deskripsiLastMove : string) {
        if((turn.firstMove ? !turn.turn : turn.turn && !stoneStack.Stack?.length)){
            const checkTerminal_whiteTurn = terminal(temp);
            if(checkTerminal_whiteTurn == Color.WHITE){
                alert("White Won!!!")
            }else if(checkTerminal_whiteTurn == Color.BLACK){
                alert("Black Won!!!")
            }else{
                if(deskripsiLastMove == "placeStone" && stoneSelection?.stoneDetail){
                    if(turn.firstMove){
                        minimax(copyBoard(temp), global_ply, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, stoneSelection.stoneDetail.isCapstone ? blackStoneNumber.flatStoneNumber : blackStoneNumber.flatStoneNumber - 1, whiteStoneNumber.flatStoneNumber, stoneSelection.stoneDetail.isCapstone ? blackStoneNumber.capStoneNumber - 1 : blackStoneNumber.capStoneNumber, whiteStoneNumber.capStoneNumber, turn.firstMove ? Color.WHITE : Color.BLACK);
                    }else{
                        minimax(copyBoard(temp), global_ply, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, blackStoneNumber.flatStoneNumber, stoneSelection.stoneDetail.isCapstone ? whiteStoneNumber.flatStoneNumber : whiteStoneNumber.flatStoneNumber - 1, blackStoneNumber.capStoneNumber, stoneSelection.stoneDetail.isCapstone ? whiteStoneNumber.capStoneNumber - 1 : whiteStoneNumber.capStoneNumber, turn.firstMove ? Color.WHITE : Color.BLACK);
                    }
                }else if(deskripsiLastMove == "move"){
                    minimax(copyBoard(temp), global_ply, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, blackStoneNumber.flatStoneNumber, whiteStoneNumber.flatStoneNumber, blackStoneNumber.capStoneNumber, whiteStoneNumber.capStoneNumber, turn.firstMove ? Color.WHITE : Color.BLACK);
                }
                setBoard(botMove.nextMove);
                setWhiteStoneNumber({
                    flatStoneNumber: botMove.newStoneWhite,
                    capStoneNumber: botMove.newCapStoneWhite,
                    color: Color.WHITE
                })
                setBlackStoneNumber({
                    flatStoneNumber: botMove.newStoneBlack,
                    capStoneNumber: botMove.newCapStoneBlack,
                    color: Color.BLACK
                })
                setTurn({
                    firstMove: false,
                    turn: turn.firstMove ? !turn.turn : turn.turn,
                    point: undefined
                });

                const checkTerminal_blackTurn = terminal(botMove.nextMove);
                if(checkTerminal_blackTurn == Color.WHITE){
                    alert("White Won!!!")
                }else if(checkTerminal_blackTurn == Color.BLACK){
                    alert("Black Won!!!")
                }
            }
        }
    }

    function move4Direction (tmp : StoneStack, temp : Stone[][][], x : number, y : number, getPoint : Point) {
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

        AIMove(temp, stoneSelection, turn, tmp, "move");
    }

    function copyBoard (board : Stone[][][]) {
        const copy: Stone[][][] = [];
        for(let i = 0; i < board.length; i++){
            copy.push([]);
            for(let j = 0; j < board[i].length; j++){
                copy[i].push([]);
                for(let k = 0; k < board[i][j].length; k++){
                    const stone = board[i][j][k];
                    copy[i][j].push(new Stone(stone.position, stone.isCapStone, stone.color))
                }
            }
        }
        return copy;
    }

    function copyStack (stack : Stone[]) {
        const copy: Stone[] = [];
        for(let k = 0; k < stack.length; k++){
            const stone = stack[k];
            copy.push(new Stone(stone.position, stone.isCapStone, stone.color))
        }
        return copy;
    }
    
    function terminal(board : Stone[][][]){
        for(let i = 0; i < board.length; i++){
            if(board[0][i].length != 0){
                if(board[0][i][board[0][i].length - 1].position === Position.FLAT){
                    if(upToDown(board, 0, i, "")){
                        return board[0][i][board[0][i].length - 1].color;
                    }
                }
            }
            if(board[i][0].length != 0){
                if(board[i][0][board[i][0].length - 1].position === Position.FLAT){
                    if(leftToRight(board, i, 0, "")){
                        return board[i][0][board[i][0].length - 1].color;
                    }
                }
            }
        }
        return undefined;
    }

    function leftToRight(board: Stone[][][], rowIndex: number, colIndex: number, lastMove: string){
        if(colIndex === board.length-1){
            return true;
        }
        if(rowIndex > board.length-1 || rowIndex < 0){
            return false;
        }
        if(board[rowIndex][colIndex].length === 0){
            return false;
        }

        const stone = board[rowIndex][colIndex][board[rowIndex][colIndex].length - 1];
        const stoneRight = board[rowIndex][colIndex + 1][
            board[rowIndex][colIndex + 1].length <= 0 ? 0 : board[rowIndex][colIndex + 1].length - 1
        ]
        if(stone.color === stoneRight?.color && stoneRight?.position === Position.FLAT){
            if(leftToRight(board, rowIndex, colIndex + 1, "right")){
                return true
            }
        }
        
        if(rowIndex-1 >= 0 && lastMove != "down"){
            const stoneUp = board[rowIndex - 1][colIndex][
                board[rowIndex - 1][colIndex].length <= 0 ? 0 : board[rowIndex - 1][colIndex].length - 1
            ]
            if(stone.color === stoneUp?.color && stoneUp?.position === Position.FLAT){
                if(leftToRight(board, rowIndex - 1, colIndex, "up")){
                    return true;
                }
            }
        }
        if(rowIndex+1 < board.length && lastMove != "up"){
            const stoneDown = board[rowIndex + 1][colIndex][
                board[rowIndex + 1][colIndex].length <= 0 ? 0 : board[rowIndex + 1][colIndex].length - 1
            ]
            if(stone.color === stoneDown?.color && stoneDown?.position === Position.FLAT){
                return leftToRight(board, rowIndex + 1, colIndex, "down")
            }
        }
        return false;
    }

    function upToDown(board: Stone[][][], rowIndex: number, colIndex: number, lastMove: string){
        if(rowIndex === board.length-1){
            return true;
        }
        if(colIndex > board.length-1 || colIndex < 0){
            return false;
        }
        if(board[rowIndex][colIndex].length === 0){
            return false;
        }

        const stone = board[rowIndex][colIndex][board[rowIndex][colIndex].length - 1];
        const stoneDown = board[rowIndex + 1][colIndex][
            board[rowIndex + 1][colIndex].length <= 0 ? 0 : board[rowIndex + 1][colIndex].length - 1
        ]
        if(stone.color === stoneDown?.color && stoneDown?.position === Position.FLAT){
            if(upToDown(board, rowIndex + 1, colIndex, "down")){
                return true;
            }
        }
        if(colIndex-1 >= 0 && lastMove != "right"){
            const stoneLeft = board[rowIndex][colIndex - 1][
                board[rowIndex][colIndex - 1].length <= 0 ? 0 : board[rowIndex][colIndex - 1].length - 1
            ]
            if(stone.color === stoneLeft?.color && stoneLeft?.position === Position.FLAT){
                if(upToDown(board, rowIndex, colIndex - 1, "left")){
                    return true
                }
            }
        }
        if(colIndex+1 < board.length && lastMove != "left"){
            const stoneRight = board[rowIndex][colIndex + 1][
                board[rowIndex][colIndex + 1].length <= 0 ? 0 : board[rowIndex][colIndex + 1].length - 1
            ]
            if(stone.color === stoneRight?.color && stoneRight?.position === Position.FLAT){
                return upToDown(board, rowIndex, colIndex + 1, "right")
            }
        }
        return false
    }

    function checkTerminalNode(board : Stone[][][]) {
        const checkTerminal = terminal(board);
        if(checkTerminal === Color.WHITE){
            turnind = true;
            return Number.MIN_SAFE_INTEGER;
        }else if(checkTerminal === Color.BLACK){
            turnind = false;
            return Number.MAX_SAFE_INTEGER;
        }
        return undefined
    }

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
                // console.log("test");
                // const nboard = copyBoard(board);
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

                            AIMove(temp, stoneSelection, turn, tmp, "move");
                        }
                    }else if((turn.point == Point.UP || turn.point == Point.CENTER) && getPoint == Point.UP){
                        // console.log("test up");
                        move4Direction(tmp, temp, x, y, getPoint);
                    }else if((turn.point == Point.RIGHT || turn.point == Point.CENTER) && getPoint == Point.RIGHT){
                        // console.log("test right");
                        move4Direction(tmp, temp, x, y, getPoint);
                    }else if((turn.point == Point.DOWN || turn.point == Point.CENTER) && getPoint == Point.DOWN){
                        // console.log("test down");
                        move4Direction(tmp, temp, x, y, getPoint);
                    }else if((turn.point == Point.LEFT || turn.point == Point.CENTER) && getPoint == Point.LEFT){
                        // console.log("test left");
                        move4Direction(tmp, temp, x, y, getPoint);
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

                        AIMove(temp, stoneSelection, turn, tmp, "move");
                    }
    
                }
            }
        }else{
            if(turn.point == undefined){
                board && setCBoard(copyBoard(board))
            }

            if(board && board[x][y].length > 0 && ((board[x][y][board[x][y].length-1]?.color == Color.WHITE && turn.turn) || (board[x][y][board[x][y].length-1]?.color == Color.BLACK && !turn.turn))){
                const count = board[x][y].length > 6 ? 6 : board[x][y].length;
                const temp = copyBoard(board);
                setStoneStack({
                    X: x,
                    Y: y,
                    Stack: [...temp[x][y].slice(temp[x][y].length - count)]
                })
                temp && temp[x][y].splice(temp[x][y].length - count, count);
                setBoard(temp);
            }else{
                console.log("choose another");
            }
        }
    }

    function placeStone(event: React.MouseEvent<HTMLElement>){
        if(board){
            const x = parseInt(event.currentTarget.getAttribute('data-x') || '-1');
            const y = parseInt(event.currentTarget.getAttribute('data-y') || '-1');
            if(board[x][y].length == 0){
            
                if(stoneSelection.stoneDetail){
                    if(stoneSelection.stoneDetail.color === Color.BLACK){
                        setBlackStoneNumber(
                            {
                                capStoneNumber: stoneSelection.stoneDetail.isCapstone ? blackStoneNumber.capStoneNumber - 1 : blackStoneNumber.capStoneNumber,
                                flatStoneNumber: stoneSelection.stoneDetail.isCapstone ? blackStoneNumber.flatStoneNumber : blackStoneNumber.flatStoneNumber - 1,
                                color: stoneSelection.stoneDetail.color
                            }
                        )    
                    }else{
                        setWhiteStoneNumber(
                            {
                                capStoneNumber: stoneSelection.stoneDetail.isCapstone ? whiteStoneNumber.capStoneNumber - 1 : whiteStoneNumber.capStoneNumber,
                                flatStoneNumber: stoneSelection.stoneDetail.isCapstone ? whiteStoneNumber.flatStoneNumber : whiteStoneNumber.flatStoneNumber - 1,
                                color: stoneSelection.stoneDetail.color
                            }
                        )
                    }
                    const temp = copyBoard(board);
                    board && stoneSelection.stoneDetail && temp[x][y].push(
                        new Stone(stoneSelection.stoneDetail.position, stoneSelection.stoneDetail.isCapstone, stoneSelection.stoneDetail.color)
                    );
                    setBoard(temp);
    
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
    
                        AIMove(temp, stoneSelection, turn, stoneStack, "placeStone");
                    }
    
                    setStoneSelection({
                        isSelected: false,
                        stoneDetail: undefined
                    });
                }
            }
        }
    }

    // function hitungSkorPemain(pemain : string, board : Stone[][][]) {
    //     let skor = 0;
        
    //     let jumlahKotakDiisi = 0;
    //     let jumlahPiece = 0;
    //     let jumlahCapstone = 0;
    //     board.forEach((baris) => {
    //         baris.forEach((kolom) => {
    //             // Hitung jumlah kotak diisi (K)
    //             if (kolom.length > 0) {
    //                 jumlahKotakDiisi++;
    //             }
    //             // Hitung jumlah piece (P)
    //             jumlahPiece += kolom.length;
    //             // Hitung jumlah capstone (C)
    //             kolom.forEach((stone) => {
    //                 if (stone.isCapstone) {
    //                     jumlahCapstone++;
    //                 }
    //             });
    //         });
    //     });
    //     skor += (jumlahKotakDiisi + jumlahPiece + 5 * jumlahCapstone);
    
    //     // Hitung jumlah jalur (W)
    //     let jumlahJalur = 0;

    //     // Cek jalur horizontal
    //     for (let i = 0; i < board.length; i++) {
    //         let jalurHorizontal = true;
    //         for (let j = 1; j < board[i].length; j++) {
    //             if (board[i][j].length === 0 || board[i][j].length !== board[i][j - 1].length) {
    //                 jalurHorizontal = false;
    //                 break;
    //             }
    //         }
    //         if (jalurHorizontal) {
    //             jumlahJalur++;
    //         }
    //     }
    
    //     // Cek jalur vertikal
    //     for (let j = 0; j < board[0].length; j++) {
    //         let jalurVertikal = true;
    //         for (let i = 1; i < board.length; i++) {
    //             if (board[i][j].length === 0 || board[i][j].length !== board[i - 1][j].length) {
    //                 jalurVertikal = false;
    //                 break;
    //             }
    //         }
    //         if (jalurVertikal) {
    //             jumlahJalur++;
    //         }
    //     }
    
    //     skor += 10 * jumlahJalur;
    //     console.log(skor);
        
    
    //     return skor;
    // }

    function staticBoardEvaluation(board: Stone[][][]){
        const flatStoneScore = 1
        const flatStonePlacementScore = 5
        const stackStoneScore = 3
        const capstonePlacementMultiplier = 1.5
        let maximizingScore = 0
        let minimizingScore = 0

        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                const stack = board[i][j]
                if(stack.length > 0){

                    if(stack.length > 1){
                        //check kalau stacking
                        const upperStone = stack[stack.length - 1]
                        let totalStackScore = 0;

                        for(let k = 0; k < stack.length; k++){
                            const stone = stack[k]
                            if(upperStone.color === stone.color){
                                totalStackScore += stackStoneScore
                            }
                        }

                        if(upperStone.isCapStone){
                            totalStackScore = totalStackScore * capstonePlacementMultiplier
                        }
    
                        if(upperStone.color === Color.WHITE){
                            minimizingScore += totalStackScore
                        }else{
                            maximizingScore += totalStackScore
                        }
                    }else{
                        //tanpa stacking
                        const stone = stack[0]
                        if(stone.color === Color.BLACK){
                            maximizingScore += flatStoneScore
                        }else{
                            minimizingScore += flatStoneScore
                        }
                    }

                    //Check adjacent cell to check stone placement for trading
                    const adjacentCell = [
                        i - 1 >= 0 ? board[i - 1][j] : undefined, //up
                        i + 1 < 6 ? board[i + 1][j] : undefined, //down
                        j - 1 >= 0 ? board[i][j - 1] : undefined, //left
                        j + 1 < 6 ? board[i][j + 1] : undefined //right
                    ]

                    const centerUpperStone = stack[stack.length - 1]
                    let adjacentScore = 0

                    for(const cell of adjacentCell){
                        if(cell && cell.length > 0){
                            const adjacentUpperStone = cell[cell.length - 1]
                            if(centerUpperStone.color === adjacentUpperStone.color){
                                adjacentScore += flatStonePlacementScore
                            }
                            if(centerUpperStone.isCapStone && (adjacentUpperStone.position === Position.STAND && adjacentUpperStone.color !== centerUpperStone.color)){
                                adjacentScore += 100000
                            }
                        }
                        if(centerUpperStone.isCapStone){
                            adjacentScore -= 10000
                        }
                    }

                    if(centerUpperStone.color === Color.WHITE){
                        minimizingScore += adjacentScore;
                    }else{
                        maximizingScore += adjacentScore - 100;
                    }
                }
            }
        }

        let isExplored: boolean[][] = [];
        for(let i = 0; i < size; i++){
            isExplored.push([false, false, false, false, false, false])
        }
        // console.log(isExplored)

        for(let i = 0; i < 6; i++){
            for(let j = 0; j < 6; j++){
                if(board[i][j].length > 0 && !isExplored[i][j]){
                    if(board[i][j][board[i][j].length - 1].color === Color.WHITE){
                        minimizingScore += roadScore(board, isExplored, i, j, 0, 0, Color.WHITE, Point.CENTER, false)
                    }
    
                    if(board[i][j][board[i][j].length - 1].color === Color.BLACK){
                        maximizingScore += roadScore(board, isExplored, i, j, 0, 0, Color.BLACK, Point.CENTER, false)
                    }
                }
            }
        }

        // console.log(maximizingScore, minimizingScore)

        return maximizingScore - minimizingScore
    }

    // function staticBoardEvaluation(board: Stone[][][]){
    //     const flatStoneScore = 1
    //     const flatStonePlacementScore = 3
    //     const stackStoneScore = 5
    //     const capstonePlacementMultiplier = 2
    //     let maximizingScore = 0
    //     let minimizingScore = 0

    //     for(let i = 0; i < board.length; i++){
    //         for(let j = 0; j < board[i].length; j++){
    //             const stack = board[i][j]
    //             if(stack.length > 0){

    //                 if(stack.length > 1){
    //                     //check kalau stacking
    //                     const upperStone = stack[stack.length - 1]
    //                     let totalStackScore = 0;

    //                     for(let k = 0; k < stack.length; k++){
    //                         const stone = stack[k]
    //                         if(upperStone.color === stone.color){
    //                             totalStackScore += stackStoneScore
    //                         }
    //                     }

    //                     if(upperStone.isCapStone){
    //                         totalStackScore = totalStackScore * capstonePlacementMultiplier;
    //                     }
    
    //                     if(upperStone.color === Color.WHITE){
    //                         minimizingScore += totalStackScore
    //                     }else{
    //                         maximizingScore += totalStackScore
    //                     }
    //                 }else{
    //                     //tanpa stacking
    //                     const stone = stack[0]
    //                     if(stone.color === Color.BLACK){
    //                         maximizingScore += flatStoneScore
    //                     }else{
    //                         minimizingScore += flatStoneScore
    //                     }
    //                 }

    //                 //Check adjacent cell to check stone placement for trading
    //                 const adjacentCell = [
    //                     i - 1 >= 0 ? board[i - 1][j] : undefined, //up
    //                     i + 1 < 6 ? board[i + 1][j] : undefined, //down
    //                     j - 1 >= 0 ? board[i][j - 1] : undefined, //left
    //                     j + 1 < 6 ? board[i][j + 1] : undefined //right
    //                 ]

    //                 const centerUpperStone = stack[stack.length - 1]
    //                 let adjacentScore = 0

    //                 for(const cell of adjacentCell){
    //                     if(cell && cell.length > 0){
    //                         const adjacentUpperStone = cell[cell.length - 1]
    //                         if(centerUpperStone.color === adjacentUpperStone.color){
    //                             adjacentScore += flatStonePlacementScore
    //                         }
    //                     }
    //                 }

    //                 if(centerUpperStone.color === Color.WHITE){
    //                     minimizingScore += adjacentScore;
    //                 }else{
    //                     maximizingScore += adjacentScore;
    //                 }
    //             }
    //         }
    //     }

    //     for(let i=0; i<6; i++){
    //         minimizingScore += roadScore(board, "vertical", 0, i, 0, 0, Color.WHITE, Point.CENTER, false, false)
    //         minimizingScore += roadScore(board, "horizontal", i, 0, 0, 0, Color.WHITE, Point.CENTER, false, false)
    //         maximizingScore += roadScore(board, "vertical", 0, i, 0, 0, Color.BLACK, Point.CENTER, false, false)
    //         maximizingScore += roadScore(board, "horizontal", i, 0, 0, 0, Color.BLACK, Point.CENTER, false, false)
    //     }

    //     // console.log(maximizingScore, minimizingScore)

    //     return maximizingScore - minimizingScore
    // }

    function roadScore(
        board: Stone[][][], isExplored: boolean[][], rowIndex: number, colIndex: number,
        dx: number, dy: number, color: Color, lastMove: Point, isAllyCapstoneExist: boolean
    ){
        if(colIndex >= 6 || rowIndex >= 6 || colIndex < 0 || rowIndex < 0 || isExplored[rowIndex][colIndex]){
            if(dx >= 6 || dy >= 6){
                return Number.MAX_SAFE_INTEGER
            }
            return dx * 100 * (isAllyCapstoneExist ? 1.5 : 1) + dy * 100 * (isAllyCapstoneExist ? 1.5 : 1)
        }
        const stone = board[rowIndex][colIndex].length - 1 < 0 ? undefined : board[rowIndex][colIndex][board[rowIndex][colIndex].length - 1]
        if(!stone || stone.color !== color || stone.position === Position.STAND){
            if(dx >= 6 || dy >= 6){
                return Number.MAX_SAFE_INTEGER
            }
            return dx * 100 * (isAllyCapstoneExist ? 1.5 : 1) + dy * 100 * (isAllyCapstoneExist ? 1.5 : 1)
        }

        isExplored[rowIndex][colIndex] = true
        if(stone && stone.color === color && stone.isCapStone){
            isAllyCapstoneExist = true
        }

        let scoreUp: number = 0, scoreDown: number = 0, scoreLeft: number = 0, scoreRight: number = 0

        if(lastMove !== Point.DOWN){
            scoreUp = roadScore(board, isExplored, rowIndex - 1, colIndex, dx + 1, dy, color, Point.UP, isAllyCapstoneExist)
        }
        if(lastMove !== Point.UP){
            scoreDown = roadScore(board, isExplored, rowIndex + 1, colIndex, dx + 1, dy, color, Point.DOWN, isAllyCapstoneExist)
        }
        if(lastMove !== Point.RIGHT){
            scoreLeft = roadScore(board, isExplored, rowIndex, colIndex - 1, dx, dy + 1, color, Point.LEFT, isAllyCapstoneExist)
        }
        if(lastMove !== Point.LEFT){
            scoreRight = roadScore(board, isExplored, rowIndex, colIndex + 1, dx, dy + 1, color, Point.RIGHT, isAllyCapstoneExist)
        }
        
        return scoreUp + scoreDown + scoreLeft + scoreRight
    }

    function unstack({board, alpha, beta, ply, direction, row, col, stack, isFirst, blackStone, whiteStone, blackCapStone, whiteCapStone, turn}: {
        board: Stone[][][],
        alpha: number,
        beta: number,
        ply: number,
        direction: Point,
        row: number,
        col: number,
        stack: Stone[],
        isFirst: boolean,
        blackStone: number,
        whiteStone: number,
        blackCapStone: number,
        whiteCapStone: number,
        turn : Color
    }){
        // console.log(board);
        // console.log(stack);
        // console.log(alpha, beta);

        if(stack.length <= 0){
            if(ply > 0){
                let value = minimax(board, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn)
                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                    if(value > alpha) {
                        if(global_ply == ply){
                            botMove.nextMove = copyBoard(board);
                            botMove.newStoneWhite = whiteStone;
                            botMove.newStoneBlack = blackStone;
                            botMove.newCapStoneWhite = whiteCapStone;
                            botMove.newCapStoneBlack = blackCapStone;
                        }
                    }
                }
                return value
            }else{
                const val = checkTerminalNode(board);
                if (val) {return val}
                return staticBoardEvaluation(board)
            }
        }

        if(stack.length == 1){
            const newBoard = copyBoard(board)
            const currentStack = newBoard[row][col]
            newBoard[row][col] = currentStack.concat(stack)
            return unstack({board: newBoard, alpha, beta, ply, direction, row, col, stack: [], isFirst: false, blackStone, whiteStone, blackCapStone, whiteCapStone, turn})
        }

        let rowDifference = 0
        let columnDifference = 0
        if(direction === Point.UP){
            rowDifference = -1
        }else if(direction === Point.DOWN){
            rowDifference = 1
        }else if(direction === Point.LEFT){
            columnDifference = -1
        }else if(direction === Point.RIGHT){
            columnDifference = 1
        }

        if(
            (row + rowDifference > 5 || row + rowDifference < 0) || 
            (col + columnDifference > 5 || col + columnDifference < 0)
        ){
            const newBoard = copyBoard(board)
            const currentStack = newBoard[row][col]
            newBoard[row][col] = currentStack.concat(stack)

            if(ply > 0){
                let value = minimax(newBoard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn)
                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                    if(value > alpha) {
                        if(global_ply == ply){
                            botMove.nextMove = copyBoard(newBoard);
                            botMove.newStoneWhite = whiteStone;
                            botMove.newStoneBlack = blackStone;
                            botMove.newCapStoneWhite = whiteCapStone;
                            botMove.newCapStoneBlack = blackCapStone;
                        }
                    }
                }
                return value
            }else{
                const val = checkTerminalNode(newBoard)
                if (val) {return val}
                return staticBoardEvaluation(newBoard)
            }
        }

        const nextStack = board[row + rowDifference][col + columnDifference]
        if(nextStack[nextStack.length - 1]?.isCapStone){
            const newBoard = copyBoard(board)
            const currentStack = newBoard[row][col]
            newBoard[row][col] = currentStack.concat(stack)

            if(ply > 0){
                let value = minimax(newBoard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn)
                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                    if(value > alpha) {
                        if(global_ply == ply){
                            botMove.nextMove = copyBoard(newBoard);
                            botMove.newStoneWhite = whiteStone;
                            botMove.newStoneBlack = blackStone;
                            botMove.newCapStoneWhite = whiteCapStone;
                            botMove.newCapStoneBlack = blackCapStone;
                        }
                    }
                }
                return value
            }else{
                const val = checkTerminalNode(newBoard)
                if (val) {return val}
                return staticBoardEvaluation(newBoard)
            }
        }
        
        let value = 0;
        for(let i = isFirst ? 1 : 0; i <= (isFirst ? stack.length : stack.length - 1); i++){
            // console.log(i, stack.length);
            const newStack = copyStack(stack);
            const dividedStack = newStack.splice(stack.length - i, i)
            const newBoard = copyBoard(board)
            const nextStack = newBoard[row + rowDifference][col + columnDifference]
            const nextUpperStone = nextStack[nextStack.length - 1 < 0 ? 0 : nextStack.length - 1]
            const dividedLowerStone = dividedStack[0]
            const currentStack = newBoard[row][col]

            if(nextUpperStone && nextUpperStone.position === Position.STAND && !dividedLowerStone?.isCapStone){
                newBoard[row][col] = currentStack.concat(dividedStack)
                value = unstack({board: newBoard, alpha, beta, ply, direction, row: row + rowDifference, col: col + columnDifference, stack: [], isFirst: false, blackStone, whiteStone, blackCapStone, whiteCapStone, turn})
                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                    //max
                    if(value > alpha) {
                        alpha = value
                    }
                }else{
                    //min
                    if(value < beta) {
                        beta = value
                    }
                }
                if(alpha >= beta){
                    // break
                }
            }else if(nextUpperStone && nextUpperStone.position === Position.STAND && dividedLowerStone?.isCapStone){
                nextUpperStone.position = Position.FLAT
                newBoard[row + rowDifference][col + columnDifference] = nextStack.concat(dividedStack)
                newBoard[row][col] = currentStack.concat(newStack)
                value = unstack({board: newBoard, alpha, beta, ply, direction, row: row + rowDifference, col: col + columnDifference, stack: [], isFirst: false, blackStone, whiteStone, blackCapStone, whiteCapStone, turn})
                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                    //max
                    if(value > alpha) {
                        alpha = value
                    }
                }else{
                    //min
                    if(value < beta) {
                        beta = value
                    }
                }
                if(alpha >= beta){
                    // break
                }
            }else{
                newBoard[row][col] = currentStack.concat(newStack)
                value = unstack({board: newBoard, alpha, beta, ply, direction, row: row + rowDifference, col: col + columnDifference, stack: dividedStack, isFirst: false, blackStone, whiteStone, blackCapStone, whiteCapStone, turn})
                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                    //max
                    if(value > alpha) {
                        alpha = value
                    }
                }else{
                    //min
                    if(value < beta) {
                        beta = value
                    }
                }
                if(alpha >= beta){
                    // break
                }
            }
        }
        if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
            return alpha
        }else{
            return beta
        }
    }
    
    function minimax (board : Stone[][][], ply : number, alpha : number, beta : number, blackStone : number, whiteStone : number, blackCapStone : number, whiteCapStone : number, turn : Color) {
        // console.log(board, blackStone, whiteStone, blackCapStone, whiteCapStone);
        // console.log(++test);
        // console.log(alpha, beta);
        // console.log(terminal(board));
        const val = checkTerminalNode(board)
        if (val) {return val}
        
        if(ply == 0){
            return staticBoardEvaluation(board);
        }else{
            let value = 0;
            for (let i = 0; i < board.length; i++) {
                const baris = board[i];
                for (let j = 0; j < baris.length; j++) {
                    const kolom = board[i][j];
                    if(kolom.length == 0){
                        // place stone
                        if((((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0) !== (turn == Color.WHITE)) ? (blackStone > 0) : (whiteStone > 0)){
                            // stone
                            let nblackStone = blackStone;
                            let nwhiteStone = whiteStone;
                            (((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0) !== (turn == Color.WHITE)) ? nblackStone-- : nwhiteStone--;
                            // position flat
                            let nboard = copyBoard(board);
                            nboard[i][j].push(new Stone(Position.FLAT, false, (((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0) !== (turn == Color.WHITE)) ? Color.BLACK : Color.WHITE));
                            value = minimax(nboard, ply-1, alpha, beta, nblackStone, nwhiteStone, blackCapStone, whiteCapStone, turn);
                            if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                //max
                                if(value > alpha) {
                                    alpha = value
                                    //save move
                                    if(global_ply == ply){
                                        botMove.nextMove = copyBoard(nboard);
                                        botMove.newStoneWhite = nwhiteStone;
                                        botMove.newStoneBlack = nblackStone;
                                        botMove.newCapStoneWhite = whiteCapStone;
                                        botMove.newCapStoneBlack = blackCapStone;
                                    }
                                }
                            }else{
                                //min
                                if(value < beta) {
                                    //save move
                                    beta = value
                                }
                            }
                            if(alpha >= beta){
                                break
                            }

                            if(turn != Color.WHITE){
                                // position stand
                                nboard = copyBoard(board);
                                nboard[i][j].push(new Stone(Position.STAND, false, ((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0) ? Color.BLACK : Color.WHITE));
                                value = minimax(nboard, ply-1, alpha, beta, nblackStone, nwhiteStone, blackCapStone, whiteCapStone, turn);
                                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                    //max
                                    if(value > alpha) {
                                        alpha = value
                                        //save move
                                        if(global_ply == ply){
                                            botMove.nextMove = copyBoard(nboard);
                                            botMove.newStoneWhite = nwhiteStone;
                                            botMove.newStoneBlack = nblackStone;
                                            botMove.newCapStoneWhite = whiteCapStone;
                                            botMove.newCapStoneBlack = blackCapStone;
                                        }
                                    }
                                }else{
                                    //min
                                    if(value < beta) {
                                        beta = value
                                    }
                                }
                                if(alpha >= beta){
                                    break
                                }
                            }
                        }
                        if(turn != Color.WHITE){
                            if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0 ? (blackCapStone > 0) : (whiteCapStone > 0)){
                                //cap stone
                                let nblackCapStone = blackCapStone;
                                let nwhiteCapStone = whiteCapStone;
                                (global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0 ? nblackCapStone-- : nwhiteCapStone--;
    
                                const nboard = copyBoard(board);
                                nboard[i][j].push(new Stone(Position.FLAT, true, (global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0 ? Color.BLACK : Color.WHITE));
                                value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, nblackCapStone, nwhiteCapStone, turn);
                                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                    //max
                                    if(value > alpha) {
                                        alpha = value
                                        //save move
                                        if(global_ply == ply){
                                            botMove.nextMove = copyBoard(nboard);
                                            botMove.newStoneWhite = whiteStone;
                                            botMove.newStoneBlack = blackStone;
                                            botMove.newCapStoneWhite = nwhiteCapStone;
                                            botMove.newCapStoneBlack = nblackCapStone;
                                        }
                                    }
                                }else{
                                    //min
                                    if(value < beta) {
                                        beta = value
                                    }
                                }
                                if(alpha >= beta){
                                    break
                                }
                            }
                        }
                    }else{
                        if(turn != Color.WHITE){
                            if(kolom.length == 1){
                                // move just one stone
                                if(!kolom[0].isCapStone){
                                    // move for non cap stone (can be position flat or stand)
                                    if(kolom[0].color == ((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0 ? Color.BLACK : Color.WHITE)){
                                        // up
                                        if(i-1 >= 0){
                                            let lanjut = false;
                                            if(board[i-1][j].length == 0){
                                                lanjut = true
                                            }else if(board[i-1][j][board[i-1][j].length-1].position == Position.FLAT && !board[i-1][j][board[i-1][j].length-1].isCapStone){
                                                lanjut = true
                                            }
                                            if(lanjut){
                                                let nboard = copyBoard(board);
                                                let piece = nboard[i][j].pop();
                                                nboard[i-1][j].push(piece);
                                                value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn);
                                                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                    //max
                                                    if(value > alpha) {
                                                        alpha = value
                                                        //save move
                                                        if(global_ply == ply){
                                                            botMove.nextMove = copyBoard(nboard);
                                                            botMove.newStoneWhite = whiteStone;
                                                            botMove.newStoneBlack = blackStone;
                                                            botMove.newCapStoneWhite = whiteCapStone;
                                                            botMove.newCapStoneBlack = blackCapStone;
                                                        }
                                                    }
                                                }else{
                                                    //min
                                                    if(value < beta) {
                                                        beta = value
                                                    }
                                                }
                                                if(alpha >= beta){
                                                    break
                                                }
                                            }
                                        }
                                        //right
                                        if(j+1 < board.length){
                                            let lanjut = false;
                                            if(board[i][j+1].length == 0){
                                                lanjut = true
                                            }else if(board[i][j+1][board[i][j+1].length-1].position == Position.FLAT && !board[i][j+1][board[i][j+1].length-1].isCapStone){
                                                lanjut = true
                                            }
                                            if(lanjut){
                                                let nboard = copyBoard(board);
                                                let piece = nboard[i][j].pop();
                                                nboard[i][j+1].push(piece);
                                                value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn);
                                                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                    //max
                                                    if(value > alpha) {
                                                        alpha = value
                                                        //save move
                                                        if(global_ply == ply){
                                                            botMove.nextMove = copyBoard(nboard);
                                                            botMove.newStoneWhite = whiteStone;
                                                            botMove.newStoneBlack = blackStone;
                                                            botMove.newCapStoneWhite = whiteCapStone;
                                                            botMove.newCapStoneBlack = blackCapStone;
                                                        }
                                                    }
                                                }else{
                                                    //min
                                                    if(value < beta) {
                                                        beta = value
                                                    }
                                                }
                                                if(alpha >= beta){
                                                    break
                                                }
                                            }
                                        }
                                        // down
                                        if(i+1 < board.length){
                                            let lanjut = false;
                                            if(board[i+1][j].length == 0){
                                                lanjut = true
                                            }else if(board[i+1][j][board[i+1][j].length-1].position == Position.FLAT && !board[i+1][j][board[i+1][j].length-1].isCapStone){
                                                lanjut = true
                                            }
                                            if(lanjut){
                                                let nboard = copyBoard(board);
                                                let piece = nboard[i][j].pop();
                                                nboard[i+1][j].push(piece);
                                                value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn);
                                                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                    //max
                                                    if(value > alpha) {
                                                        alpha = value
                                                        //save move
                                                        if(global_ply == ply){
                                                            botMove.nextMove = copyBoard(nboard);
                                                            botMove.newStoneWhite = whiteStone;
                                                            botMove.newStoneBlack = blackStone;
                                                            botMove.newCapStoneWhite = whiteCapStone;
                                                            botMove.newCapStoneBlack = blackCapStone;
                                                        }
                                                    }
                                                }else{
                                                    //min
                                                    if(value < beta) {
                                                        //save move
                                                        beta = value
                                                    }
                                                }
                                                if(alpha >= beta){
                                                    break
                                                }
                                            }
                                        }
                                        // left
                                        if(j-1 >= 0){
                                            let lanjut = false;
                                            if(board[i][j-1].length == 0){
                                                lanjut = true
                                            }else if(board[i][j-1][board[i][j-1].length-1].position == Position.FLAT && !board[i][j-1][board[i][j-1].length-1].isCapStone){
                                                lanjut = true
                                            }
                                            if(lanjut){
                                                let nboard = copyBoard(board);
                                                let piece = nboard[i][j].pop();
                                                nboard[i][j-1].push(piece);
                                                value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn);
                                                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                    //max
                                                    if(value > alpha) {
                                                        alpha = value
                                                        //save move
                                                        if(global_ply == ply){
                                                            botMove.nextMove = copyBoard(nboard);
                                                            botMove.newStoneWhite = whiteStone;
                                                            botMove.newStoneBlack = blackStone;
                                                            botMove.newCapStoneWhite = whiteCapStone;
                                                            botMove.newCapStoneBlack = blackCapStone;
                                                        }
                                                    }
                                                }else{
                                                    //min
                                                    if(value < beta) {
                                                        //save move
                                                        beta = value
                                                    }
                                                }
                                                if(alpha >= beta){
                                                    break
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    // move for cap stone
                                    if(kolom[0].color == ((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0 ? Color.BLACK : Color.WHITE)){
                                        // up
                                        if(i-1 >= 0){
                                            let lanjut = true;
                                            if(board[i-1][j].length != 0 && board[i-1][j][board[i-1][j].length-1].isCapStone){
                                                lanjut = false
                                            }
                                            if(lanjut){
                                                const nboard = copyBoard(board);
                                                let piece = nboard[i][j].pop();
                                                if(board[i-1][j].length != 0 && board[i-1][j][board[i-1][j].length-1].position == Position.STAND){
                                                    nboard[i-1][j][nboard[i-1][j].length-1].position = Position.FLAT
                                                }
                                                nboard[i-1][j].push(piece);
                                                value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn);
                                                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                    //max
                                                    if(value > alpha) {
                                                        alpha = value
                                                        //save move
                                                        if(global_ply == ply){
                                                            botMove.nextMove = copyBoard(nboard);
                                                            botMove.newStoneWhite = whiteStone;
                                                            botMove.newStoneBlack = blackStone;
                                                            botMove.newCapStoneWhite = whiteCapStone;
                                                            botMove.newCapStoneBlack = blackCapStone;
                                                        }
                                                    }
                                                }else{
                                                    //min
                                                    if(value < beta) {
                                                        beta = value
                                                    }
                                                }
                                                if(alpha >= beta){
                                                    break
                                                }
                                            }
                                        }
                                        // right
                                        if(j+1 < board.length){
                                            let lanjut = true;
                                            if(board[i][j+1].length != 0 && board[i][j+1][board[i][j+1].length-1].isCapStone){
                                                lanjut = false
                                            }
                                            if(lanjut){
                                                const nboard = copyBoard(board);
                                                let piece = nboard[i][j].pop();
                                                if(board[i][j+1].length != 0 && board[i][j+1][board[i][j+1].length-1].position == Position.STAND){
                                                    nboard[i][j+1][nboard[i][j+1].length-1].position = Position.FLAT
                                                }
                                                nboard[i][j+1].push(piece);
                                                value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn);
                                                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                    //max
                                                    if(value > alpha) {
                                                        alpha = value
                                                        //save move
                                                        if(global_ply == ply){
                                                            botMove.nextMove = copyBoard(nboard);
                                                            botMove.newStoneWhite = whiteStone;
                                                            botMove.newStoneBlack = blackStone;
                                                            botMove.newCapStoneWhite = whiteCapStone;
                                                            botMove.newCapStoneBlack = blackCapStone;
                                                        }
                                                    }
                                                }else{
                                                    //min
                                                    if(value < beta) {
                                                        beta = value
                                                    }
                                                }
                                                if(alpha >= beta){
                                                    break
                                                }
                                            }
                                        }
                                        // down
                                        if(i+1 < board.length){
                                            let lanjut = true;
                                            if(board[i+1][j].length != 0 && board[i+1][j][board[i+1][j].length-1].isCapStone){
                                                lanjut = false
                                            }
                                            if(lanjut){
                                                const nboard = copyBoard(board);
                                                let piece = nboard[i][j].pop();
                                                if(board[i+1][j].length != 0 && board[i+1][j][board[i+1][j].length-1].position == Position.STAND){
                                                    nboard[i+1][j][nboard[i+1][j].length-1].position = Position.FLAT
                                                }
                                                nboard[i+1][j].push(piece);
                                                value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn);
                                                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                    //max
                                                    if(value > alpha) {
                                                        alpha = value
                                                        //save move
                                                        if(global_ply == ply){
                                                            botMove.nextMove = copyBoard(nboard);
                                                            botMove.newStoneWhite = whiteStone;
                                                            botMove.newStoneBlack = blackStone;
                                                            botMove.newCapStoneWhite = whiteCapStone;
                                                            botMove.newCapStoneBlack = blackCapStone;
                                                        }
                                                    }
                                                }else{
                                                    //min
                                                    if(value < beta) {
                                                        beta = value
                                                    }
                                                }
                                                if(alpha >= beta){
                                                    break
                                                }
                                            }
                                        }
                                        // left
                                        if(j-1 >= 0){
                                            let lanjut = true;
                                            if(board[i][j-1].length != 0 && board[i][j-1][board[i][j-1].length-1].isCapStone){
                                                lanjut = false
                                            }
                                            if(lanjut){
                                                const nboard = copyBoard(board);
                                                let piece = nboard[i][j].pop();
                                                if(board[i][j-1].length != 0 && board[i][j-1][board[i][j-1].length-1].position == Position.STAND){
                                                    nboard[i][j-1][nboard[i][j-1].length-1].position = Position.FLAT
                                                }
                                                nboard[i][j-1].push(piece);
                                                value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone, turn);
                                                if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                    //max
                                                    if(value > alpha) {
                                                        alpha = value
                                                        //save move
                                                        if(global_ply == ply){
                                                            botMove.nextMove = copyBoard(nboard);
                                                            botMove.newStoneWhite = whiteStone;
                                                            botMove.newStoneBlack = blackStone;
                                                            botMove.newCapStoneWhite = whiteCapStone;
                                                            botMove.newCapStoneBlack = blackCapStone;
                                                        }
                                                    }
                                                }else{
                                                    //min
                                                    if(value < beta) {
                                                        beta = value
                                                    }
                                                }
                                                if(alpha >= beta){
                                                    break
                                                }
                                            }
                                        }
                                    }
                                }
                            }else{
                                // move unstack (more than one stone)
                                if(kolom[kolom.length - 1].color == ((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0 ? Color.BLACK : Color.WHITE)){
                                    const nboard = copyBoard(board);
                                    nboard[i][j] = []
                                    // up
                                    if(i-1 >= 0){
                                        let lanjut = false
                                        if(board[i-1][j].length == 0){
                                            lanjut = true
                                        }else if(board[i-1][j][board[i-1][j].length - 1].position == Position.STAND){
                                            if(board[i][j][board[i][j].length - 1].isCapStone){
                                                lanjut = true
                                            }
                                        }else if(!board[i-1][j][board[i-1][j].length - 1].isCapStone){
                                            lanjut = true
                                        }
    
                                        if(lanjut){
                                            // console.log("masuk up");
                                            value = unstack({board: nboard, alpha, beta, ply, direction: Point.UP, row: i, col: j, stack: board[i][j].slice(), isFirst: true, blackStone, whiteStone, blackCapStone, whiteCapStone, turn})
                                            if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                //max
                                                alpha = value
                                            }else{
                                                //min
                                                beta = value
                                            }
                                            if(alpha >= beta){
                                                break
                                            }
                                        }
                                    }
                                    // down
                                    if(i+1 < board.length){
                                        let lanjut = false
                                        if(board[i+1][j].length == 0){
                                            lanjut = true
                                        }else if(board[i+1][j][board[i+1][j].length - 1].position == Position.STAND){
                                            if(board[i][j][board[i][j].length - 1].isCapStone){
                                                lanjut = true
                                            }
                                        }else if(!board[i+1][j][board[i+1][j].length - 1].isCapStone){
                                            lanjut = true
                                        }
    
                                        if(lanjut){
                                            // console.log("masuk down");
                                            value = unstack({board: nboard, alpha, beta, ply, direction: Point.DOWN, row: i, col: j, stack: board[i][j].slice(), isFirst: true, blackStone, whiteStone, blackCapStone, whiteCapStone, turn})
                                            if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                //max
                                                alpha = value
                                            }else{
                                                //min
                                                beta = value
                                            }
                                            if(alpha >= beta){
                                                break
                                            }
                                        }
                                    }
                                    // left
                                    if(j-1 >= 0){
                                        let lanjut = false
                                        if(board[i][j-1].length == 0){
                                            lanjut = true
                                        }else if(board[i][j-1][board[i][j-1].length - 1].position == Position.STAND){
                                            if(board[i][j][board[i][j].length - 1].isCapStone){
                                                lanjut = true
                                            }
                                        }else if(!board[i][j-1][board[i][j-1].length - 1].isCapStone){
                                            lanjut = true
                                        }
    
                                        if(lanjut){
                                            // console.log("masuk left");
                                            value = unstack({board: nboard, alpha, beta, ply, direction: Point.LEFT, row: i, col: j, stack: board[i][j].slice(), isFirst: true, blackStone, whiteStone, blackCapStone, whiteCapStone, turn})
                                            if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                //max
                                                alpha = value
                                            }else{
                                                //min
                                                beta = value
                                            }
                                            if(alpha >= beta){
                                                break
                                            }
                                        }
                                    }
                                    // right
                                    if(j+1 < board.length){
                                        let lanjut = false
                                        if(board[i][j+1].length == 0){
                                            lanjut = true
                                        }else if(board[i][j+1][board[i][j+1].length - 1].position == Position.STAND){
                                            if(board[i][j][board[i][j].length - 1].isCapStone){
                                                lanjut = true
                                            }
                                        }else if(!board[i][j+1][board[i][j+1].length - 1].isCapStone){
                                            lanjut = true
                                        }
                                        
                                        if(lanjut){
                                            // console.log("masuk right");
                                            value = unstack({board: nboard, alpha, beta, ply, direction: Point.RIGHT, row: i, col: j, stack: board[i][j].slice(), isFirst: true, blackStone, whiteStone, blackCapStone, whiteCapStone, turn})
                                            if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                                                //max
                                                alpha = value
                                            }else{
                                                //min
                                                beta = value
                                            }
                                            if(alpha >= beta){
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if(alpha >= beta){
                    break
                }
            }
            if((global_ply%2 == 0 ? ply%2 : (ply-1)%2) == 0){
                return alpha
            }else{
                return beta
            }
        }
    }

    const columnCodes: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
    const rowNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className="">
            <div className="row backgroundcolor leveltext">
                <h2 className="whitetext">Level : {level}</h2>
            </div>
            {(!turn.turn) && 
             <div className="row backgroundcolor atas">
                <p className="judul1">Black Turn !</p>
            </div> }
            {(turn.turn) && 
             <div className="row backgroundcolor atas">
                <p className="judul2">White Turn !</p>
            </div> }

            <div className="p-5 putihh border border-dark rounded rounded-4">
                <div className=" justify-content-center mx-auto " style={{ width: `${width}px` }}>
                    <div className="row justify-content-center mx-auto brownbg" style={{ width: `${width}px` }} >
                        <h2 className="col-1 margg" ></h2>
                        <div className="row jaraks col-10">
                            {columnCodes.map((y, indexY) => (
                                <div
                                    className={`col-2 position-relative d-flex align-items-center jarakabjad justify-content-center text-center`}
                                    style={{ height: `${height / size}px` }}
                                    key={`${indexY}`}
                                >
                                    <h2  className="codecolor">{y}</h2>
                                </div>
                                
                            ))}
                            
                        </div>
                    
                        {board && board.map((x, indexX) => (
                            <div className="row justify-content-center mx-auto brownbg" style={{ width: `${width}px` }} key={indexX.toString()}>
                                <h2 className="col-1 margg  codecolor" >{rowNumbers[indexX]}</h2>
                                <div className="row col-10">
                                    {x.map((y, indexY) => (
                                        <div
                                            className={`col-2 position-relative d-flex align-items-center justify-content-center text-center warna roundedl board-column`}
                                            style={{ height: `${height / size}px` }}
                                            key={`${indexX}${indexY}`}
                                            data-x={indexX} data-y={indexY}
                                            onClick={stoneSelection.isSelected ? placeStone : setIndicator}
                                        >
                                            
                                            {y.map((z, indexZ) => {

                                            
                                            let idx = `${indexX}${indexY}${indexZ}`;
                                            return (
                                                z.printStone(idx)
                                            )
                                            })}
                                        </div>
                                        
                                    ))}
                                </div>
                                <h2 className="col-1 margg1  codecolor" >{rowNumbers[indexX]}</h2>
                            </div>
                        ))}
                        {/* <div className="row batasbawah" ></div> */}
                        <div className="row jaraks col-10">
                            {columnCodes.map((y, indexY) => (
                                <div
                                    className={`col-2 position-relative d-flex align-items-center  justify-content-center text-center`}
                                    style={{ height: `${height / size}px` }}
                                    key={`${indexY}`}
                                >
                                    <h2 className="codecolor">{y}</h2>
                                </div>
                                
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
      
}