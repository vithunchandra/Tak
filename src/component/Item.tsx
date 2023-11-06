import { StoneSelection, StoneStack } from "../Interface/Stone";
import StoneNumber from "../Interface/StoneNumber";
import Turn from "../Interface/Turn";
import Stone from "../class/Stone";
import { Color, Position, StoneSize } from "../enum/StoneEnum";

export default function Item(
    {stoneNumber, stoneSelection, setStoneSelection, stoneStack, setStoneStack, turn, setBoard, Cboard}: 
    {
        stoneNumber: StoneNumber,
        stoneSelection: StoneSelection,
        setStoneSelection: React.Dispatch<React.SetStateAction<StoneSelection>>,
        stoneStack: StoneStack,
        setStoneStack: React.Dispatch<React.SetStateAction<StoneStack>>,
        turn: Turn,
        setBoard: React.Dispatch<React.SetStateAction<Stone[][][] | undefined>>,
        Cboard: Stone[][][] | undefined
    }
){
    function selectStone(event: React.MouseEvent<HTMLElement>){
        console.log(stoneStack);
        if(stoneStack?.Stack){
            setStoneStack({X:-1, Y:-1, Stack: undefined});
            setBoard(Cboard)
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