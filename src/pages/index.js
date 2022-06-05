import * as React from "react"
import Textbox from "../components/Textbox"
import FormTextarea from "../components/FormTextarea"
import SvgResult from '../components/Svg'

// markup
const IndexPage = () => {
  return (
    <main>
      <title>Home Page</title>
      
      <div className="w-full h-screen flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">

        <div className="w-fixed w-1/6 flex-shrink flex-grow-0 p-4 bg-slate-100">
            <div className="sticky top-0 p-4 w-full h-full">
                SVG Converter ⚙️
            </div>
        </div>


        <div role="main" className="w-4/6 h-full flex-grow p-3">
          <FormTextarea></FormTextarea>
        </div>
        
        <div className="w-fixed w-1/6 flex-shrink flex-grow-0 p-4 bg-slate-200">
            <div className="flex sm:flex-col px-2">
              <SvgResult className="w-full h-40 bg-white"></SvgResult>
            </div>
        </div>
      </div>


      <footer className="bg-slate-300 mt-auto">
        FOOTER
      </footer>
      
    </main>

  )
}

export default IndexPage
