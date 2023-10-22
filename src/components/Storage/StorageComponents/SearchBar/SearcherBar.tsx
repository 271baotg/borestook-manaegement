import React from "react";
import st from '../../style/search-bar-style.module.css'

export const SearchBar: React.FC<{}> = (props) => {



    const handleOnClick:Function = () =>{
        
    }

    return (<>
        <div className={st.searchBarContainer}>
            <input className={st.input}></input>
            <button  type="button" className={`${st.button} btn btn-primary`}>
                Search
            </button>
        </div>

    </>)
}