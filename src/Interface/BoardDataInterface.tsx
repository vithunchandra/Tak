import Stone from "../class/Stone";
import { StoneSelection } from "./Stone";
import StoneNumber from "./StoneNumber";

export default interface BoardDataInterface {
    setStoneStack: React.Dispatch<React.SetStateAction<Stone[] | undefined>>;
    board: Stone[][][] | undefined;
    setBoard: React.Dispatch<React.SetStateAction<Stone[][][] | undefined>>;
    stoneSelection: StoneSelection;
    setStoneSelection: React.Dispatch<React.SetStateAction<StoneSelection>>;
    whiteStoneNumber: StoneNumber;
    setWhiteStoneNumber: React.Dispatch<React.SetStateAction<StoneNumber>>;
    blackStoneNumber: StoneNumber;
    setBlackStoneNumber: React.Dispatch<React.SetStateAction<StoneNumber>>
}