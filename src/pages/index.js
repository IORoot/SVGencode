import * as React from "react"
import Example from "../components/Example"
import DumbTextarea from "../components/DumbTextarea"
import FormTextarea from "../components/FormTextarea"
import SvgImage from '../components/SvgImage'


function removeWhitespace(svg){
  return svg.replace(/(\r\n|\n|\r|\s\s)/gm, "");
}

function regexEncode(svg){
  svg = svg.replace(/>\s{1,}</g, `><`);
  svg = svg.replace(/\s{2,}/g, ` `);
  return svg.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)
}

function prefixUrl(svg,type){
  return 'url("data:image/svg+'+ type +',' + svg + '")';
}

function prefixBackgroundImage(svg) {
  return 'background-image: ' + svg + ';';
}



function doublesToSingles(svg){
  return svg.replace(/"/g, "'")
}

function singlesToDoubles(svg){
  return svg.replace(/'/g, "\"")
}


function cssReady(svg) {
  var doublesToSingles = removeWhitespace.replace(/"/g, "'")
  return 'url("data:image/svg+xml,' + doublesToSingles + '")';
}


function cssReadyBase64(svg) {
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

      svgUrlregexEncoded   : '',
      svgUrlEncoded         : '',
      svgUrlComponentEncoded: '',

      svgCSSReady           : '',
      // svgCSSReadyBG         : '',
      // svgCSSReadyBase64     : ''

      // svgBase64             : '',
      // svgBase64Encoded      : '',
      // svgBase64EncodedSpaced: '',
    };
  }

  

  handleSvgRawChange(svg) {

    /** Raw Code */
    this.setState({svgRawCode:              svg});
    this.setState({svgRawCodeOneLine:       removeWhitespace(svg)});

    /** Encoded */
    this.setState({svgUrlregexEncoded:     regexEncode(svg)});
    this.setState({svgUrlEncoded:           encodeURI(svg)});
    this.setState({svgUrlComponentEncoded:  encodeURIComponent(svg)});


    /** CSS-Ready */
    this.setState({svgCSSReady:             prefixUrl(regexEncode(doublesToSingles(svg)), 'xml')  });
    this.setState({svgCSSReadyIMAGE:        prefixBackgroundImage(prefixUrl(regexEncode(doublesToSingles(svg)), 'xml'))  });


    /** Base64 Encoded */
    // this.setState({svgBase64:               btoa(svg)});
    // this.setState({svgBase64Encoded:        btoa(encodeURIComponent(svg))});

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

            <FormTextarea className="col-span-3" onSvgChange={this.handleSvgRawChange} rows="1" label="SVG Raw Code"></FormTextarea>
            <DumbTextarea className="col-span-3" label="Removed Newlines & Whitespace" rows="1" content={this.state.svgRawCodeOneLine}></DumbTextarea>
            
            <h2 className="col-span-3 text-xl text-blue-900 border-b-2 border-blue-900">Encoded</h2>
              <DumbTextarea className="col-span-1" label="URL-Encoded" rows="3" content={this.state.svgUrlregexEncoded}>regex.github.io encoded</DumbTextarea>
              <DumbTextarea className="col-span-1" label="URL-Encoded" rows="3" content={this.state.svgUrlEncoded}>encodeURI(svg)</DumbTextarea>
              <DumbTextarea className="col-span-1" label="URL-Encoded Component" rows="3" content={this.state.svgUrlComponentEncoded}>encodeURIComponent(svg)</DumbTextarea>

              <h2 className="col-span-3 text-xl text-blue-900 border-b-2 border-blue-900">CSS Ready</h2>

                <Example 
                  className="col-span-3 grid grid-cols-3 gap-10"
                  label="CSS-Ready" 
                  sublabel="CSS background-image rule" 
                  image={this.state.svgCSSReady}>
                  {this.state.svgCSSReadyIMAGE}
                </Example>


            <h2 className="col-span-3 text-xl text-blue-900 border-b-2 border-blue-900">Base64 Encoded</h2>
              <DumbTextarea className="col-span-1" label="Base64" rows="3" content={this.state.svgBase64}>base64(encodeURIComponent(svg))</DumbTextarea>
              <DumbTextarea className="col-span-1" label="Base64 URI-Encoded" rows="3" content={this.state.svgBase64Encoded}>base64(encodeURIComponent(svg))</DumbTextarea>
              <DumbTextarea className="col-span-1" label="Base64 URI-Encoded Spaced" rows="3" content={this.state.svgBase64EncodedSpaced}>base64(encodeURIComponent(svg)) with %20 converted back to spaces.</DumbTextarea>
            
            
          
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
