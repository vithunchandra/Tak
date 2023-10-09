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

export type {
    StoneDetailInterface, StoneSelection
};