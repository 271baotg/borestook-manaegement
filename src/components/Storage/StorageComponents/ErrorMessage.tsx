import React from "react"

export const ErrorMessage:React.FC<{message?: string}> = (props) => {
    return (
    <div>
        {props?.message}
    </div>
    )
}