import { StoneStack } from "../Interface/Stone"
import Stone from "../class/Stone"

export default function Indicator({stoneStack, stackView, location} : {stoneStack : StoneStack, stackView : Stone[] | undefined, location : string}){
    if(location === "left"){
        if(!stoneStack.Stack){
            return <></>
        }
        return (
            <div className="d-flex flex-column align-items-center">
                {
                    stoneStack.Stack.slice(0).reverse().map((item, index) => item.printAsIndicator(index))
                }
            </div>
        )
    }else{
        if(!stackView){
            return <></>
        }
        return (
            <div className="d-flex flex-column align-items-center">
                {
                    stackView.slice(0).reverse().map((item, index) => item.printAsIndicator(index))
                }
            </div>
        )
    }
}