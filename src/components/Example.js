import * as React from "react"
import DumbTextarea from "../components/DumbTextarea"
import InlineCssSvgImage from '../components/InlineCssSvgImage'

const Example = ({ label, sublabel, image, className, children }) => {

    return (
        <div className={className}>
            <DumbTextarea className="col-span-2" rows="3" label={label} content={children}>{sublabel}</DumbTextarea>
            <InlineCssSvgImage className="col-span-1 h-18 checkered overflow-scroll rounded mt-10">{image}</InlineCssSvgImage>
        </div>
    )

}

export default Example 