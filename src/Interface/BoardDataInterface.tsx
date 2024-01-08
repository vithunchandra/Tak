import Stone from "../class/Stone";
import { StoneSelection, StoneStack } from "./Stone";
import StoneNumber from "./StoneNumber";
import Turn from "./Turn";

export default interface BoardDataInterface {
    stoneStack: StoneStack;
    setStoneStack: React.Dispatch<React.SetStateAction<StoneStack>>;
    board: Stone[][][] | undefined;
    setBoard: React.Dispatch<React.SetStateAction<Stone[][][] | undefined>>;
    Cboard: Stone[][][] | undefined;
    setCBoard: React.Dispatch<React.SetStateAction<Stone[][][] | undefined>>;
    stoneSelection: StoneSelection;
    setStoneSelection: React.Dispatch<React.SetStateAction<StoneSelection>>;
    whiteStoneNumber: StoneNumber;
    setWhiteStoneNumber: React.Dispatch<React.SetStateAction<StoneNumber>>;
    blackStoneNumber: StoneNumber;
    setBlackStoneNumber: React.Dispatch<React.SetStateAction<StoneNumber>>;
    turn: Turn;
    setTurn: React.Dispatch<React.SetStateAction<Turn>>;
    level:number;
    setStackView: React.Dispatch<React.SetStateAction<Stone[] | undefined>>;
    setSomebodyWin: React.Dispatch<React.SetStateAction<boolean>>;
}