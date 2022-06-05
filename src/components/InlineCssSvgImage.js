import * as React from 'react'

const InlineCssSvgImage = ({ className, children }) => {

    console.log(children)
    
    return (
        <div className={ className } style={{ backgroundImage: children}} />
    )
}



export default InlineCssSvgImage