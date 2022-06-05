import * as React from 'react'

const SvgImage = ({ className, children }) => {

    function stripquotes(a) {
        if (a.charAt(0) === '"' && a.charAt(a.length-1) === '"') {
            return a.substr(1, a.length-2);
        }
        return a;
    }
    
    var svg = decodeURI(children)
    var svgout = stripquotes(svg); 

    return (
        <div className={ className }
            dangerouslySetInnerHTML={{__html: svgout}}
        /> 
    )
}



export default SvgImage