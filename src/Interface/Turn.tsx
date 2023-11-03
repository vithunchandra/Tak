import { Point } from "../enum/StoneEnum";

export default interface Turn{
    firstMove: boolean,
    turn: boolean,
    point : Point | undefined
}