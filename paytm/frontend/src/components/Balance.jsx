
export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-2 text-lg">
            is : {value}/-
        </div>
    </div>
}