import * as React from "react"
import DumbTextarea from "../components/DumbTextarea"
import FormTextarea from "../components/FormTextarea"
import SvgImage from '../components/SvgImage'

function ccsReady(svg) {
  return 'background-image: url("data:image/svg+xml,' + btoa(encodeURIComponent(svg)) + '")';
}



class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSvgRawChange = this.handleSvgRawChange.bind(this);

    this.state = {
      svgRawCode            : '',
      svgRawCodeOneLine     : '',
      svgUrlEncoded         : '',
      svgUrlComponentEncoded: '',
      svgBase64             : '',
      svgBase64CSSReady     : ''
    };
  }

  

  handleSvgRawChange(svg) {
    this.setState({svgRawCode: svg});
    this.setState({svgRawCodeOneLine: svg.replace(/(\r\n|\n|\r|\s\s)/gm, "")});
    this.setState({svgUrlEncoded: encodeURI(svg)});
    this.setState({svgUrlComponentEncoded: encodeURIComponent(svg)});
    this.setState({svgBase64: btoa(encodeURIComponent(svg))});
    this.setState({svgBase64CSSReady: ccsReady(svg)});
  }

  


  render() {
    const svgRawCode = this.state.svgRawCode;

    return (
      <main>
        <title>Home Page</title>
        
        <div className="w-full h-screen flex sm:flex-row">

          <div className="w-fixed w-1/6 flex-shrink flex-grow-0 p-4 bg-slate-100">
              <div className="sticky top-0 p-4 w-full h-full">
                  SVG Converter ⚙️
              </div>
          </div>


          <div role="main" className="w-4/6 p-4 grid grid-cols-2 gap-10 auto-rows-auto mb-auto">

            <FormTextarea className="col-span-2" onSvgChange={this.handleSvgRawChange} label="SVG Raw Code"></FormTextarea>

            <DumbTextarea className="" label="SVG Single Line" content={this.state.svgRawCodeOneLine}></DumbTextarea>
            <DumbTextarea className="" label="SVG URL-Encoded" content={this.state.svgUrlEncoded}></DumbTextarea>
            <DumbTextarea className="" label="SVG URL-Encoded Component" content={this.state.svgUrlComponentEncoded}></DumbTextarea>
            <DumbTextarea className="" label="SVG Base64 (URL-Encoded)" content={this.state.svgBase64}></DumbTextarea>
            <DumbTextarea className="" label="CSS-Ready SVG Base64 (URL-Encoded)" content={this.state.svgBase64CSSReady}></DumbTextarea>
          </div>
          


          <div className="w-fixed w-1/6 flex-shrink flex-grow-0 p-4 bg-slate-200">
              <div className="flex sm:flex-col px-2">
                <h2 className="mb-2 text-sm font-medium text-gray-900">Preview</h2>
                <SvgImage className="w-full h-40 checkered overflow-scroll rounded ">{svgRawCode}</SvgImage>
              </div>
          </div>
        </div>


        <footer className="bg-slate-300 mt-auto">
          FOOTER
        </footer>
        
      </main>
    );
  }
}

export default IndexPage
