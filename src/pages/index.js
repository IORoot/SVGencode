import * as React from "react"

// markup
const IndexPage = () => {
  return (
    <main>
      <title>Home Page</title>
      
      <div className="w-full h-screen flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">

        <div className="w-fixed w-1/6 flex-shrink flex-grow-0 px-4 bg-slate-100">
            <div className="sticky top-0 p-4 w-full h-full">
                NAV
            </div>
        </div>


        <div role="main" className="w-4/6 h-full flex-grow pt-1 px-3">
          CONTENT
        </div>
        
        <div className="w-fixed w-1/6 flex-shrink flex-grow-0 px-2 bg-slate-200">
            <div className="flex sm:flex-col px-2">
                SIDEBAR
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
