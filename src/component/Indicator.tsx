export default function Indicator({stoneStack}){
    if(!stoneStack.Stack){
        return <></>
    }
    // console.log(stoneStack);
    return (
        <div>
            {
                stoneStack.Stack.slice(0).reverse().map((item, index) => item.printAsIndicator(index))
            }
        </div>
    )
}