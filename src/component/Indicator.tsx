export default function Indicator({stoneStack}){
    if(!stoneStack.stoneStack){
        return <></>
    }
    // console.log(stoneStack);
    return (
        <div>
            {
                stoneStack.stoneStack.map((item, index) => item.printAsIndicator(index))
            }
        </div>
    )
}