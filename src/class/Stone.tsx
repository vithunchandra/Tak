import { Position, Color } from "../enum/StoneEnum";

export default class Stone {
    isCapStone: boolean = false;
    position: String = '';
    color: String = '';
    capStoneColor: String = '';

    constructor(position: String, isCapStone: boolean, color: String){
        this.isCapStone = isCapStone;
        this.position = position;
        this.color = color;
        this.capStoneColor = color === Color.BLACK ? "brown" : "limegreen"
    }

    printStone(index: string){
        const width = 90;
        const height = this.position === Position.FLAT || this.isCapStone ? 90 : 30;
        const borderRadius = this.isCapStone ? "50%" : "0%";
        const pieceColor = this.isCapStone ? this.capStoneColor : this.color;
        return this.isCapStone ? 
                    <div className="position-absolute" key={index} style={{
                            width: "90px",
                            height: "90px",
                            backgroundColor: `${this.capStoneColor}`,
                            borderRadius: "50%",
                            zIndex: `${index}`
                        }}
                    ></div> :
                    <div className="position-absolute" key={index} style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        backgroundColor: `${this.color}`,
                        zIndex: `${index}`
                    }}></div> 
                    
                
        
    }

    printAsIndicator(index: number){
        if(this.isCapStone){
            const width = 30;
            const height = 90;

            return (
                <div style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: `${this.capStoneColor}`,
                    zIndex: `${index}`
                }} key={Math.random()}></div>
            )
        }else{
            const width = 90;
            const height = 30;
            
            return (
                <div style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: `${this.color}`,
                    zIndex: `${index}`
                }} key={Math.random()}></div>
            )
        }
    }
}