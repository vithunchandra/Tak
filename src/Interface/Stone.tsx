import Stone from "../class/Stone";
import { Color, Position } from "../enum/StoneEnum";

interface StoneDetailInterface{
    color: Color;
    isCapstone: boolean;
    position: Position;
}

interface StoneSelection{
    isSelected: boolean;
    stoneDetail: StoneDetailInterface | undefined;
}

interface StoneStack{
    X: number;
    Y: number;
    Stack: Stone[] | undefined;
}

export type {
    StoneDetailInterface, StoneSelection, StoneStack
};