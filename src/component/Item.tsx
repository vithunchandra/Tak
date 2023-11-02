import { StoneSelection, StoneStack } from "../Interface/Stone";
import StoneNumber from "../Interface/StoneNumber";
import { Color, Position, StoneSize } from "../enum/StoneEnum";

export default function Item(
    {stoneNumber, stoneSelection, setStoneSelection, setStoneStack, turn}: 
    {
        stoneNumber: StoneNumber,
        stoneSelection: StoneSelection,
        setStoneSelection: React.Dispatch<React.SetStateAction<StoneSelection>>,
        setStoneStack: React.Dispatch<React.SetStateAction<StoneStack>>,
        turn: Boolean
    }
){
    function selectStone(event: React.MouseEvent<HTMLElement>){
        setStoneStack({X:-1, Y:-1, stoneStack: undefined});
        const isCapstone = event.currentTarget.getAttribute('data-iscapstone') === "false" ? false : true;
        const color = event.currentTarget.getAttribute('data-color');
        const isSelectedNotNull = isCapstone ? stoneNumber.capStoneNumber > 0 ? true : false : stoneNumber.flatStoneNumber > 0 ? true : false;
        if(isSelectedNotNull && ((color === "white" && turn) || (color === "black" && !turn))){
            if(stoneSelection.stoneDetail?.isCapstone == false && stoneSelection.stoneDetail.position == "flat"){
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
                        borderRadius:"50%",
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