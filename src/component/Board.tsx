import React, { useEffect} from "react";
import Stone from "../class/Stone";
import BoardDataInterface from "../Interface/BoardDataInterface";
// import StoneNumber from "../Interface/StoneNumber";
import { Color, Point, Position } from "../enum/StoneEnum";
import { StoneStack } from "../Interface/Stone";

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
        console.log(board);
        // if((turn.firstMove && turn.turn) || (!turn.firstMove && !turn.turn)){
            board && minimax(board, 2, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, blackStoneNumber.flatStoneNumber, whiteStoneNumber.flatStoneNumber, blackStoneNumber.capStoneNumber, whiteStoneNumber.capStoneNumber);
        // }
    }, [board, turn])

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
    }

    function copyBoard (board : Stone[][][]) {
        return ([
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
                    }
    
                }
            }
        }else{
            if(turn.point == undefined){
                board && setCBoard(copyBoard(board))
            }

            if(board && ((board[x][y][board[x][y].length-1]?.color == Color.WHITE && turn.turn) || (board[x][y][board[x][y].length-1]?.color == Color.BLACK && !turn.turn))){
                const count = board[x][y].length > 6 ? 6 : board[x][y].length;
                const temp = board.slice();
                setStoneStack({
                    X: x,
                    Y: y,
                    Stack: [...temp[x][y].slice(temp[x][y].length - count)]
                })
                temp && temp[x][y].splice(0, count);
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

    function hitungSkorPemain(pemain : string, board : Stone[][][]) {
        let skor = 0;
        
        let jumlahKotakDiisi = 0;
        let jumlahPiece = 0;
        let jumlahCapstone = 0;
        board.forEach((baris) => {
            baris.forEach((kolom) => {
                // Hitung jumlah kotak diisi (K)
                if (kolom.length > 0) {
                    jumlahKotakDiisi++;
                }
                // Hitung jumlah piece (P)
                jumlahPiece += kolom.length;
                // Hitung jumlah capstone (C)
                kolom.forEach((stone) => {
                    if (stone.isCapstone) {
                        jumlahCapstone++;
                    }
                });
            });
        });
        skor += (jumlahKotakDiisi + jumlahPiece + 5 * jumlahCapstone);
    
        // Hitung jumlah jalur (W)
        let jumlahJalur = 0;

        // Cek jalur horizontal
        for (let i = 0; i < board.length; i++) {
            let jalurHorizontal = true;
            for (let j = 1; j < board[i].length; j++) {
                if (board[i][j].length === 0 || board[i][j].length !== board[i][j - 1].length) {
                    jalurHorizontal = false;
                    break;
                }
            }
            if (jalurHorizontal) {
                jumlahJalur++;
            }
        }
    
        // Cek jalur vertikal
        for (let j = 0; j < board[0].length; j++) {
            let jalurVertikal = true;
            for (let i = 1; i < board.length; i++) {
                if (board[i][j].length === 0 || board[i][j].length !== board[i - 1][j].length) {
                    jalurVertikal = false;
                    break;
                }
            }
            if (jalurVertikal) {
                jumlahJalur++;
            }
        }
    
        skor += 10 * jumlahJalur;
        console.log(skor);
        
    
        return skor;
    }

    let test = 0;
    
    function minimax (board : Stone[][][], ply : number, alpha : number, beta : number, blackStone : number, whiteStone : number, blackCapStone : number, whiteCapStone : number) {
        console.log(board, blackStone, whiteStone, blackCapStone, whiteCapStone);
        console.log(++test);
        console.log(alpha, beta);
        if(ply == 0){
            // console.log("next");
            // console.log(turn.turn ? "putih : " : "hitam : " + hitungSkorPemain(turn.turn ? "putih" : "hitam", board))

            //----------------------------------------------------------------
            // Contoh penggunaan fungsi untuk menghitung skor pemain putih
            // const skorPemainPutih = hitungSkorPemain("putih", board);
            
            // Contoh penggunaan fungsi untuk menghitung skor pemain hitam
            // const skorPemainHitam = hitungSkorPemain("hitam", board);

            return 0;
        }else{
            let value = 0;
            for (let i = 0; i < board.length; i++) {
                const baris = board[i];
                for (let j = 0; j < baris.length; j++) {
                    const kolom = board[i][j];
                    if(kolom.length == 0){
                        // place stone
                        if(ply%2 == 0 ? (blackStone > 0) : (whiteStone > 0)){
                            // stone
                            let nblackStone = blackStone;
                            let nwhiteStone = whiteStone;
                            ply%2 == 0 ? nblackStone-- : nwhiteStone--;
                            // postision flat
                            let nboard = copyBoard(board);
                            nboard[i][j].push(new Stone(Position.FLAT, false, ply%2==0 ? Color.BLACK : Color.WHITE));
                            value = minimax(nboard, ply-1, alpha, beta, nblackStone, nwhiteStone, blackCapStone, whiteCapStone);
                            if(ply%2 == 0){
                                //max
                                if(value > alpha) {
                                    //save move
                                    alpha = value
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

                            // position stand
                            nboard = copyBoard(board);
                            nboard[i][j].push(new Stone(Position.STAND, false, ply%2==0 ? Color.BLACK : Color.WHITE));
                            value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone);
                            if(ply%2 == 0){
                                //max
                                if(value > alpha) {
                                    //save move
                                    alpha = value
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
                        if(ply%2 == 0 ? (blackCapStone > 0) : (whiteCapStone > 0)){
                            //cap stone
                            let nblackCapStone = blackCapStone;
                            let nwhiteCapStone = whiteCapStone;
                            ply%2 == 0 ? nblackCapStone-- : nwhiteCapStone--;

                            let nboard = copyBoard(board);
                            nboard[i][j].push(new Stone(Position.FLAT, true, ply%2==0 ? Color.BLACK : Color.WHITE));
                            value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, nblackCapStone, nwhiteCapStone);
                            if(ply%2 == 0){
                                //max
                                if(value > alpha) {
                                    //save move
                                    alpha = value
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
                    }else{
                        if(kolom.length == 1){
                            // move just one stone
                            if(!kolom[0].isCapStone){
                                // move for non cap stone (can be position flat or stand)
                                if(kolom[0].color == (ply%2 == 0 ? Color.BLACK : Color.WHITE)){
                                    // up
                                    if(i-1 >= 0){
                                        if((board[i-1][j][board[i-1][j].length-1]?.position == Position.FLAT && !board[i-1][j][board[i-1][j].length-1].isCapStone) || board[i-1][j].length == 0){
                                            let nboard = copyBoard(board);
                                            let piece = nboard[i][j].pop();
                                            nboard[i-1][j].push(piece);
                                            value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone);
                                            if(ply%2 == 0){
                                                //max
                                                if(value > alpha) {
                                                    //save move
                                                    alpha = value
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
                                    //right
                                    if(j+1 < board.length){
                                        if((board[i][j+1][board[i][j+1].length-1]?.position == Position.FLAT && !board[i][j+1][board[i][j+1].length-1].isCapStone) || board[i][j+1].length == 0){
                                            let nboard = copyBoard(board);
                                            let piece = nboard[i][j].pop();
                                            nboard[i][j+1].push(piece);
                                            value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone);
                                            if(ply%2 == 0){
                                                //max
                                                if(value > alpha) {
                                                    //save move
                                                    alpha = value
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
                                    // down
                                    if(i+1 < board.length){
                                        if((board[i+1][j][board[i+1][j].length-1]?.position == Position.FLAT && !board[i+1][j][board[i+1][j].length-1].isCapStone) || board[i+1][j].length == 0){
                                            let nboard = copyBoard(board);
                                            let piece = nboard[i][j].pop();
                                            nboard[i+1][j].push(piece);
                                            value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone);
                                            if(ply%2 == 0){
                                                //max
                                                if(value > alpha) {
                                                    //save move
                                                    alpha = value
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
                                        if((board[i][j-1][board[i][j-1].length-1]?.position == Position.FLAT && !board[i][j-1][board[i][j-1].length-1].isCapStone) || board[i][j-1].length == 0){
                                            let nboard = copyBoard(board);
                                            let piece = nboard[i][j].pop();
                                            nboard[i][j-1].push(piece);
                                            value = minimax(nboard, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone);
                                            if(ply%2 == 0){
                                                //max
                                                if(value > alpha) {
                                                    //save move
                                                    alpha = value
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
                                // up
                                if(i-1 >= 0){
                                    let nboard = copyBoard(board);
                                    let piece = nboard[i][j].pop();
                                    if(board[i-1][j][board[i-1][j].length-1]?.position == Position.STAND){
                                        nboard[i-1][j][board[i-1][j].length-1].position = Position.FLAT
                                    }
                                    nboard[i-1][j].push(piece);
                                    value = minimax(board, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone);
                                    if(ply%2 == 0){
                                        //max
                                        if(value > alpha) {
                                            //save move
                                            alpha = value
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
                                // right
                                if(j+1 < board.length){
                                    let nboard = copyBoard(board);
                                    let piece = nboard[i][j].pop();
                                    if(board[i][j+1][board[i][j+1].length-1]?.position == Position.STAND){
                                        board[i][j+1][board[i][j+1].length-1].position = Position.FLAT
                                    }
                                    board[i][j+1].push(piece);
                                    value = minimax(board, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone);
                                    if(ply%2 == 0){
                                        //max
                                        if(value > alpha) {
                                            //save move
                                            alpha = value
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
                                // down
                                if(i+1 < board.length){
                                    let nboard = copyBoard(board);
                                    let piece = nboard[i][j].pop();
                                    if(board[i+1][j][board[i+1][j].length-1]?.position == Position.STAND){
                                        board[i+1][j][board[i+1][j].length-1].position = Position.FLAT
                                    }
                                    board[i+1][j].push(piece);
                                    value = minimax(board, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone);
                                    if(ply%2 == 0){
                                        //max
                                        if(value > alpha) {
                                            //save move
                                            alpha = value
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
                                // left
                                if(j-1 >= 0){
                                    let nboard = copyBoard(board);
                                    let piece = nboard[i][j].pop();
                                    if(board[i][j-1][board[i][j-1].length-1]?.position == Position.STAND){
                                        board[i][j-1][board[i][j-1].length-1].position = Position.FLAT
                                    }
                                    board[i][j-1].push(piece);
                                    value = minimax(board, ply-1, alpha, beta, blackStone, whiteStone, blackCapStone, whiteCapStone);
                                    if(ply%2 == 0){
                                        //max
                                        if(value > alpha) {
                                            //save move
                                            alpha = value
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
                        }else{
                            // move unstack (more than one stone)

                        }
                    }
                }
                if(alpha >= beta){
                    break
                }
            }
            if(ply%2 == 0){
                return alpha
            }else{
                return beta
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