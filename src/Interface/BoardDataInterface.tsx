import Stone from "../class/Stone";
import { StoneSelection, StoneStack } from "./Stone";
import StoneNumber from "./StoneNumber";

export default interface BoardDataInterface {
    stoneStack: StoneStack | undefined;
    setStoneStack: React.Dispatch<React.SetStateAction<StoneStack | undefined>>;
    board: Stone[][][] | undefined;
    setBoard: React.Dispatch<React.SetStateAction<Stone[][][] | undefined>>;
    stoneSelection: StoneSelection;
    setStoneSelection: React.Dispatch<React.SetStateAction<StoneSelection>>;
    whiteStoneNumber: StoneNumber;
    setWhiteStoneNumber: React.Dispatch<React.SetStateAction<StoneNumber>>;
    blackStoneNumber: StoneNumber;
    setBlackStoneNumber: React.Dispatch<React.SetStateAction<StoneNumber>>;
    turn: boolean;
    setTurn: React.Dispatch<React.SetStateAction<boolean>>;
}