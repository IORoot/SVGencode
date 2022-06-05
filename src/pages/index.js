import * as React from "react"
import DumbTextarea from "../components/DumbTextarea"
import FormTextarea from "../components/FormTextarea"
import SvgImage from '../components/SvgImage'
import InlineCssSvgImage from '../components/InlineCssSvgImage'


function ccsReady(svg) {
  var singleLine = svg.replace(/(\r\n|\n|\r|\s\s)/gm, "");
  var doublesToSingles = singleLine.replace(/"/g, "'")
  return 'url("data:image/svg+xml,' + doublesToSingles + '")';
}

function ccsReadyBackgroundImage(svg) {
  return 'background-image: ' + svg;
}


function ccsReadyBase64(svg) {
  var base64 = btoa(encodeURIComponent(svg))
  return 'url("data:image/svg+xml;base64,' + base64 + '")';
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
      svgCSSReady           : '',
      svgCSSReadyBG         : '',
      svgCSSReadyBase64     : ''
    };
  }

  

  handleSvgRawChange(svg) {
    this.setState({svgRawCode: svg});
    this.setState({svgRawCodeOneLine:       svg.replace(/(\r\n|\n|\r|\s\s)/gm, "")});
    this.setState({svgUrlEncoded:           encodeURI(svg)});
    this.setState({svgUrlComponentEncoded:  encodeURIComponent(svg)});
    this.setState({svgBase64:               btoa(encodeURIComponent(svg))});
    this.setState({svgCSSReady:             ccsReady(svg)});
    this.setState({svgCSSReadyBG:           ccsReadyBackgroundImage(ccsReady(svg))});
    this.setState({svgCSSReadyBase64:       ccsReadyBase64(svg)});
  }

  


  render() {

    return (
      <main>
        <title>Home Page</title>
        
        <div className="w-full min-h-screen flex sm:flex-row">

          <div className="w-fixed w-1/6 flex-shrink flex-grow-0 p-4 bg-slate-100">
              <div className="sticky top-0 p-4 w-full h-full">
                  SVG Converter ⚙️
              </div>
          </div>


          <div role="main" className="w-4/6 p-4 grid grid-cols-3 gap-10 auto-rows-auto mb-auto">

            <FormTextarea className="col-span-3" onSvgChange={this.handleSvgRawChange} label="SVG Raw Code"></FormTextarea>

            <h2 className="col-span-3 text-xl text-blue-900 border-b-2 border-blue-900">Single-line with whitespace removed</h2>
            <DumbTextarea className="col-span-2" label="Single Line" content={this.state.svgRawCodeOneLine}>All newlines and tabs removed.</DumbTextarea>
            
            <h2 className="col-span-3 text-xl text-blue-900 border-b-2 border-blue-900">URL-Encoded</h2>
            <DumbTextarea className="col-span-2" label="URL-Encoded" content={this.state.svgUrlEncoded}>encodeURI(svg)</DumbTextarea>
            <DumbTextarea className="col-span-2" label="URL-Encoded Component" content={this.state.svgUrlComponentEncoded}>encodeURIComponent(svg)</DumbTextarea>
            
            <h2 className="col-span-3 text-xl text-blue-900 border-b-2 border-blue-900">Base64</h2>
            <DumbTextarea className="col-span-2" label="Base64 (URL-Encoded)" content={this.state.svgBase64}>base64(encodeURIComponent(svg))</DumbTextarea>
            
            <h2 className="col-span-3 text-xl text-blue-900 border-b-2 border-blue-900">CSS Ready</h2>
                <DumbTextarea className="col-span-2" label="CSS-Ready" content={this.state.svgCSSReadyBG}>CSS background-image rule </DumbTextarea>
                <InlineCssSvgImage className="col-span-1 h-32 checkered overflow-scroll rounded mt-10">{this.state.svgCSSReady}</InlineCssSvgImage>

                <DumbTextarea className="col-span-2" label="CSS-Ready Base64" content={this.state.svgCSSReadyBase64}>CSS background-image rule with Base64 Encoding </DumbTextarea>
          </div>
          


          <div className="w-fixed w-1/6 flex-shrink flex-grow-0 p-4 bg-slate-200">
              <div className="flex sm:flex-col px-2">
                <h2 className="mb-2 text-sm font-medium text-gray-900">SVG Preview</h2>
                <SvgImage className="w-full h-40 checkered overflow-scroll rounded mb-10">{this.state.svgRawCode}</SvgImage>

                <h2 className="mb-2 text-sm font-medium text-gray-900">CSS Inline SVG Preview</h2>
                
              </div>
          </div>
        </div>


        
      </main>
    );
  }
}

export default IndexPage
