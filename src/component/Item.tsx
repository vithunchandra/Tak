import { StoneSelection, StoneStack } from "../Interface/Stone";
import StoneNumber from "../Interface/StoneNumber";
import Turn from "../Interface/Turn";
import Stone from "../class/Stone";
import { Color, Position, StoneSize } from "../enum/StoneEnum";

export default function Item(
    {stoneNumber, stoneSelection, setStoneSelection, stoneStack, setStoneStack, turn, setBoard, board, Cboard, setCBoard}: 
    {
        stoneNumber: StoneNumber,
        stoneSelection: StoneSelection,
        setStoneSelection: React.Dispatch<React.SetStateAction<StoneSelection>>,
        stoneStack: StoneStack,
        setStoneStack: React.Dispatch<React.SetStateAction<StoneStack>>,
        turn: Turn,
        setBoard: React.Dispatch<React.SetStateAction<Stone[][][] | undefined>>,
        board: Stone[][][] | undefined,
        Cboard: Stone[][][] | undefined,
        setCBoard: React.Dispatch<React.SetStateAction<Stone[][][] | undefined>>,
    }
){
    function copyBoard (board : Stone[][][]) {
        return (board && [
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

    function selectStone(event: React.MouseEvent<HTMLElement>){
        // console.log(stoneStack);
        if(stoneStack?.Stack){
            setStoneStack({X:-1, Y:-1, Stack: undefined});
            Cboard && setBoard(copyBoard(Cboard))
        }else{
            board && setCBoard(copyBoard(board))
        }

        const isCapstone = event.currentTarget.getAttribute('data-iscapstone') === "false" ? false : true;
        const color = event.currentTarget.getAttribute('data-color');
        if(!isCapstone || !turn.firstMove){
            const isSelectedNotNull = isCapstone ? stoneNumber.capStoneNumber > 0 ? true : false : stoneNumber.flatStoneNumber > 0 ? true : false;
            if(isSelectedNotNull && ((color === "white" && turn.turn) || (color === "black" && !turn.turn))){
                if(stoneSelection.stoneDetail?.isCapstone == false && stoneSelection.stoneDetail.position == "flat" && !turn.firstMove){
                    setStoneSelection(
                        {
                            isSelected: true,
                            stoneDetail: {
                                color: Color.BLACK === color ? Color.BLACK : Color.WHITE,
                                isCapstone: isCapstone,
                                position: Position.STAND
                            }
                        }
                    )
                }else{
                    setStoneSelection(
                        {
                            isSelected: true,
                            stoneDetail: {
                                color: Color.BLACK === color ? Color.BLACK : Color.WHITE,
                                isCapstone: isCapstone,
                                position: Position.FLAT
                            }
                        }
                    )
                }
            }
        }
    }

    return (
        <>
            <div className="row text-center">
                <div className="col-4 d-flex align-items-center justify-content-center">
                    {
                        stoneSelection.stoneDetail == undefined || stoneSelection.stoneDetail?.position == "flat" ?
                        <div className={`${stoneNumber.color}-stone mx-auto`} style={{
                            width: "90px",
                            height: `${StoneSize.flatStoneHeight}px`,
                            cursor: "pointer"
                        }} data-iscapstone="false" data-color={stoneNumber.color} onClick={selectStone}></div>
                        :
                        <div className={`${stoneNumber.color}-stone mx-auto`} style={{
                            width: "90px",
                            height: `${StoneSize.standStoneHeight}px`,
                            cursor: "pointer"
                        }} data-iscapstone="false" data-color={stoneNumber.color} onClick={selectStone}></div>
                    }
                </div>
                <div className="col-6 d-flex align-items-center">
                    <span className="fs-5 fw-bold">{stoneNumber.flatStoneNumber}</span>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-4">
                    <div className={`${stoneNumber.color}-capstone mx-auto`} style={{
                        width: `${StoneSize.capStoneSize}px`,
                        height: `${StoneSize.capStoneSize}px`,
                        borderRadius: "50%",
                        cursor:"pointer"
                    }} data-iscapstone="true" data-color={stoneNumber.color} onClick={selectStone}></div>
                </div>
                <div className="col d-flex align-items-center">
                    <span className="fs-5 fw-bold">{stoneNumber.capStoneNumber}</span>
                </div>
            </div>
        </>
    )
}