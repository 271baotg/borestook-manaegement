import styled from "styled-components"
const Select_Styled = styled.select`
    border: 2px solid black;
    border-radius: 0.5em;
    margin-right: 10%;
`;
export const FillterBar: React.FC<{
    categoryList: Category[]
    currentCategory: number
    setCurrentCategory: Function
}> = (props) => {
    const handleOnCategoryChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.setCurrentCategory(e.currentTarget.value);
    }

    return (
        <div className="container-fluid d-flex justify-content-end" >
                <Select_Styled name="book_category" id="book_category" value={props.currentCategory} onChange={handleOnCategoryChanged} >
                    <option key={0} value={0}>All</option>
                    {props.categoryList.map((item, idx) => {
                        return (<>
                            <option key={idx + 1} value={item.id}>{item.categoryName}</option>
                        </>)
                    })}
                </Select_Styled>
        </div>
    )
}