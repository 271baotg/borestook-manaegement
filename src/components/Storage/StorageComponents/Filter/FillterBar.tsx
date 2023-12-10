


export const FillterBar:React.FC<{
    categoryList:Category[]
    currentCategory:number
    setCurrentCategory:Function}> = (props) => {
        const handleOnCategoryChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
            props.setCurrentCategory(e.currentTarget.value);
        }

        return (
        <select name="book_category" id="book_category" value={props.currentCategory} onChange={handleOnCategoryChanged}>
            <option key={0} value={0}>All</option>
            {props.categoryList.map((item, idx)=>{
                return(<>
                    <option key={idx+1} value={item.id}>{item.categoryName}</option>
                </>)
            })}
        </select>
    )
}