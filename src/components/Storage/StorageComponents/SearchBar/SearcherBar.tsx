import React from "react";
import st from '../../style/search-bar-style.module.css'

export const SearchBar: React.FC<{searchKeyWord:string, setSeachKeyWord:Function}> = (props) => {


    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        props.setSeachKeyWord(e.target.value);
    }


    const handleOnClick:Function = () =>{
        
    }

    return (<>
        <div className={st.searchBarContainer}>
            <input type='text' onChange={e => {handleOnChange(e)}} className={st.input} value={props.searchKeyWord}>
                
            </input>
            <button type="button" className={`${st.button} btn btn-primary p-1 ps-4 pe-4`}>
                Search
            </button>
        </div>

    </>)
}