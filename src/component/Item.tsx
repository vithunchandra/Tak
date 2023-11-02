import { StoneSelection } from "../Interface/Stone";
import StoneNumber from "../Interface/StoneNumber";
import { Color, Position, StoneSize } from "../enum/StoneEnum";

export default function Item(
    {stoneNumber, stoneSelection, setStoneSelection}: 
    {
        stoneNumber: StoneNumber,
        stoneSelection: StoneSelection,
        setStoneSelection: React.Dispatch<React.SetStateAction<StoneSelection>>
    }
){
    function selectStone(event: React.MouseEvent<HTMLElement>){
        const isCapstone = event.currentTarget.getAttribute('data-iscapstone') === "false" ? false : true;
        const color = event.currentTarget.getAttribute('data-color');

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

    return (
        <>
            <div className="row text-center">
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <div className={`${stoneNumber.color}-stone mx-auto`} style={{
                        width: `${StoneSize.flatStoneSize}px`,
                        height: `${StoneSize.flatStoneSize}px`,
                        cursor: 'pointer'
                    }} data-iscapstone="false" data-color={stoneNumber.color} onClick={selectStone}></div>
                </div>
                <div className="col-6 d-flex align-items-center">
                    <span className="fs-5 fw-bold">{stoneNumber.flatStoneNumber}</span>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-4">
                    <div className={`${stoneNumber.color}-capstone mx-auto`} style={{
                        width: `${StoneSize.capStoneWidth}px`,
                        height: `${StoneSize.capStoneHeight}px`,
                        cursor: 'pointer'
                    }} data-iscapstone="true" data-color={stoneNumber.color} onClick={selectStone}></div>
                </div>
                <div className="col d-flex align-items-center">
                    <span className="fs-5 fw-bold">{stoneNumber.capStoneNumber}</span>
                </div>
            </div>
        </>
    )
}