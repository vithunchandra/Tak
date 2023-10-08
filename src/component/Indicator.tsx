export default function Indicator({stoneStack}){
    if(!stoneStack){
        return <></>
    }
    console.log(stoneStack);
    return (
        <div>
            {
                stoneStack.map((item, index) => item.printAsIndicator(index))
            }
        </div>
    )
}