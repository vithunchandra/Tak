export default class Stone {
    isCapStone: boolean = false;
    position: String = '';
    color: String = '';
    isPinggirKiri: boolean = false;

    constructor(position: String, isCapStone: boolean, color: String, isPinggirKiri: boolean){
        this.isCapStone = isCapStone;
        this.position = position;
        this.color = color;
        this.isPinggirKiri = isPinggirKiri;
    }

    printStone(index: string){
        return this.isCapStone ? 
            <div className={`position-absolute left-0 top-0 ${this.color}-capstone capstone`} key={index} style={{
                    zIndex: `${index}`
                }}
            ></div> :
            <div className={`position-absolute left-0 top-0  ${this.color}-stone ${this.position}-stone`} key={index} style={{
                zIndex: `${index}`
            }}></div>
    }

    printAsIndicator(index: number){
        if(this.isCapStone){
            const width = 60;
            const height = 90;

            return (
                <div className={`${this.color}-capstone`} style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    zIndex: `${index}`
                }} key={Math.random()}></div>
            )
        }else{
            let width = 30;
            let height = 90;
            if(this.position == "flat"){
                width = 90;
                height = 30;
            }
            
            return (
                <div className={`${this.color}-stone`} style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    zIndex: `${index}`
                }} key={Math.random()}></div>
            )
        }
    }
}