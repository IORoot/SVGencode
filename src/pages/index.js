import * as React from "react"
import DumbTextarea from "../components/DumbTextarea"
import FormTextarea from "../components/FormTextarea"
import SvgImage from '../components/SvgImage'
import mixpanel from 'mixpanel-browser';

mixpanel.init('951229746a9235dd49749d8f6490ac83', {debug: true, ignore_dnt: true})
mixpanel.track('Weebsite Visit')

function removeNewlines(svg){
  return svg.replace(/(\r\n|\n|\r)/gm, " ");  // New lines
}

function removeWhitespace(svg){
  svg = svg.replace(/>\s{1,}</g, `><`);      // One of more spaces between groups or tags
  return svg.replace(/\s{2,}/g, ` `);         // Double or more spaces
}

function regexEncode(svg){
  svg = svg.replace(/>\s{1,}</g, `><`);
  svg = svg.replace(/\s{2,}/g, ` `);
  return svg.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)
}

function prefixDataType(svg,type){
  return "data:image/svg+"+ type +"," + svg;
}

function prefixURLDoubleQuotes(svg){
  return "url(\"" + svg + "\")";
}

function prefixBackgroundImage(svg,type){
  svg = prefixDataType(svg,type)
  svg = prefixURLDoubleQuotes(svg)
  return 'background-image: ' + svg + ';';
}

function prefixIMG(svg,type){
  svg = prefixDataType(svg,type)
  return '<img src="' + svg + '">';
}

function prefixObject(svg,type){
  svg = prefixDataType(svg,type)
  return '<object type="image/svg+' + type + '" data="' + svg + '"></object>';
}

function doublesToSingles(svg){
  return svg.replace(/"/g, "'")
}

function singlesToDoubles(svg){
  return svg.replace(/'/g, "\"")
}

function removeColour(svg){
  svg = svg.replace(/fill=".*?"/g, "")
  svg = svg.replace(/stroke=".*?"/g, "")
  svg = svg.replace(/stroke-width=".*?"/g, "")
  return svg.replace(/fill-rule=".*?"/g, "") 
}

function removeTransforms(svg){
  return svg.replace(/transform=".*?"/g, "")
}

function removeGroups(svg){
  svg = svg.replace(/(<g.*?>|<\/g\s*?>)/g, "")
  svg = removeNewlines(svg)
  return removeWhitespace(svg)
}

function base64(svg){
  svg = doublesToSingles(svg)
  svg = removeWhitespace(svg)
  return btoa(svg)
}


class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSvgRawChange = this.handleSvgRawChange.bind(this);

    this.state = {
      svgRawCode              : '',

      svgUrlregexEncoded      : '',
      svgCSSReadyInline       : '',
      svgHTMLimg              : '',
      svgHTMLobject           : '',

      svgBase64Encoded        : '',
      svgCSSReadyInlineB64    : '',
      svgHTMLimgB64           : '',
      svgHTMLobjectB64        : '',

      svgRawCodeOneLine       : '',
      svgRawSingleQuotes      : '',
      svgRawDoubleQuotes      : '',
      svgRawCodeNoColour      : '',
      svgRawCodeNoTransforms  : '',
      svgRawCodeNoGroups      : '',

      svgEncodedUri           : '',
      svgUrlComponentEncoded  : '',

    };
  }

  

  handleSvgRawChange(svg) {

    /** Raw Code */
    this.setState({svgRawCode:              svg});

    /** URL-Encoded */
    this.setState({svgUrlregexEncoded:      regexEncode(svg)});
    this.setState({svgCSSReadyInline:       prefixBackgroundImage(regexEncode(doublesToSingles(svg)), 'xml')  });
    this.setState({svgHTMLimg:              prefixIMG(regexEncode(doublesToSingles(svg)), 'xml')  });
    this.setState({svgHTMLobject:           prefixObject(regexEncode(doublesToSingles(svg)), 'xml')  });

    /** Base64 Encoded */
    this.setState({svgBase64Encoded:        base64(svg)});
    this.setState({svgCSSReadyInlineB64:    prefixBackgroundImage(base64(doublesToSingles(svg)), 'xml;base64')  });
    this.setState({svgHTMLimgB64:           prefixIMG(base64(doublesToSingles(svg)), 'xml;base64')  });
    this.setState({svgHTMLobjectB64:        prefixObject(base64(doublesToSingles(svg)), 'xml;base64')  });

    /** Alterations */
    this.setState({svgRawCodeOneLine:       removeNewlines(removeWhitespace(svg))});
    this.setState({svgRawSingleQuotes:      doublesToSingles(svg)});
    this.setState({svgRawDoubleQuotes:      singlesToDoubles(svg)});
    this.setState({svgRawCodeNoColour:      removeColour(svg)});
    this.setState({svgRawCodeNoTransforms:  removeTransforms(svg)});
    this.setState({svgRawCodeNoGroups:      removeGroups(svg)});

    /** Other Encodings */
    this.setState({svgEncodedUri:           encodeURI(svg)});
    this.setState({svgUrlComponentEncoded:  encodeURIComponent(svg)});
  }


  render() {

    return (
      <main>
        <title>SVG Encoder</title>
        
        <div className="w-full min-h-screen flex sm:flex-row">

          <div className="w-fixed w-1/6 flex-shrink flex-grow-0 p-4 bg-slate-100">
              <div className="sticky top-0 p-4 w-full h-full flex flex-col gap-8">
                  <h1 className="">SVG Encode ⚙️</h1>

                  <h2 className="text-sm">
                    A simple tool to convert an SVG into different formats, ready for use in CSS and HTML.
                  </h2>

                  <a className="hover:fill-blue-800 fill-black" href="https://github.com/IORoot/SVGencode">
                    <svg role="img" width="2rem" height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>

                  <p className="text-xxs mt-auto">Created by Andy Pearson (IORoot) 2022.</p>
              </div>
          </div>


          <div role="main" className="w-4/6 p-4 grid grid-cols-4 gap-6 auto-rows-auto mb-auto">

              {/* Input */}
              <FormTextarea className="col-span-3" onSvgChange={this.handleSvgRawChange} rows="7" label="SVG Raw Code"></FormTextarea>
              
              {/* Image */}
              <div className="col-span-1 flex sm:flex-col px-2">
                  <h3 className="mb-2 text-sm font-medium text-gray-900">SVG Preview</h3>
                  <SvgImage className="w-full h-40 checkered overflow-scroll rounded">{this.state.svgRawCode}</SvgImage>
              </div>


            <h3 className="col-span-4 text-xl text-blue-900 border-b-2 border-blue-900">URL-Encoding</h3>

              {/* URL Encoding without spaces */}
              <DumbTextarea className="col-span-1" label="URL-Encoded" rows="3" content={this.state.svgUrlregexEncoded}>Spaces excluded.</DumbTextarea>

              {/* CSS Inline URL-Encoded */}
              <DumbTextarea className="col-span-1" label="URL-Encoded CSS " rows="3" content={this.state.svgCSSReadyInline}>background-image:url()</DumbTextarea>

              {/* HTML Image URL-Encoded */}
              <DumbTextarea className="col-span-1" label="URL-Encoded <img>" rows="3" content={this.state.svgHTMLimg}> &#60;img src="" &#62; </DumbTextarea>

              {/* HTML Object URL-Encoded */}
              <DumbTextarea className="col-span-1" label="URL-Encoded <object>" rows="3" content={this.state.svgHTMLobject}> &#60;object type="" data="" &#62; </DumbTextarea>







            <h3 className="col-span-4 text-xl text-blue-900 border-b-2 border-blue-900">Base64 Encoded</h3>

              {/* Base64 Encoded */}
              <DumbTextarea className="col-span-1" label="Base64 Encoded" rows="3" content={this.state.svgBase64Encoded}>Single-quotes and Whitespace removed</DumbTextarea>

              {/* CSS Inline Base64 */}
              <DumbTextarea className="col-span-1" label="Base64 Encoded CSS" rows="3" content={this.state.svgCSSReadyInlineB64}>background-image:url()</DumbTextarea>

              {/* HTML Image Base64-Encoded */}
              <DumbTextarea className="col-span-1" label="Base64 Encoded <img>" rows="3" content={this.state.svgHTMLimgB64}> &#60;img src="" &#62; </DumbTextarea>
              
              {/* HTML Object Base64-Encoded */}
              <DumbTextarea className="col-span-1" label="Base64 Encoded <object>" rows="3" content={this.state.svgHTMLobjectB64}> &#60;object type="" data="" &#62; </DumbTextarea>




            <h3 className="col-span-4 text-xl text-blue-900 border-b-2 border-blue-900">Alterations</h3>

              {/* One-Liner */}
              <DumbTextarea className="col-span-1" label="One-liner" rows="2" content={this.state.svgRawCodeOneLine}>Removed newlines and extra whitespace</DumbTextarea>

              {/* Single Quotes */}
              <DumbTextarea className="col-span-1" label="Single-Quotes" rows="2" content={this.state.svgRawSingleQuotes}>Convert all quotes to singles</DumbTextarea>

              {/* Double Quotes */}
              <DumbTextarea className="col-span-1" label="Double-Quotes" rows="2" content={this.state.svgRawDoubleQuotes}>Convert all quotes to doubles</DumbTextarea>

              {/* No Colour */}
              <DumbTextarea className="col-span-1" label="No Colour" rows="2" content={this.state.svgRawCodeNoColour}>Removed All Fills and Strokes</DumbTextarea>

              {/* No Transforms */}
              <DumbTextarea className="col-span-1" label="No Transforms" rows="2" content={this.state.svgRawCodeNoTransforms}>Removed All Transforms</DumbTextarea>

              {/* No Groups */}
              <DumbTextarea className="col-span-1" label="No Groups" rows="2" content={this.state.svgRawCodeNoGroups}>Removed All Groups</DumbTextarea>




            <h3 className="col-span-4 text-xl text-blue-900 border-b-2 border-blue-900">Other Encodings</h3>

              {/* Encode using encodeURI() */}
              <DumbTextarea className="col-span-1" label="Encode URI" rows="3" content={this.state.svgEncodedUri}>encodeURI(svg)</DumbTextarea>

              {/* Encode using encodeURIComponent() */}
              <DumbTextarea className="col-span-1" label="Encode-URI Component" rows="3" content={this.state.svgUrlComponentEncoded}>encodeURIComponent(svg)</DumbTextarea>



          </div>

          <div className="w-fixed w-1/6 flex-shrink flex-grow-0 p-4 bg-slate-200">
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6307098859694609" crossorigin="anonymous"></script>
          </div>
        </div>


        <div className="bg-slate-800 text-slate-100 text-right text-xxs p-4">
          <a href="https://github.com/IORoot/SVGconverter">Written by Andy Pearson (IORoot) 2022.</a>
        </div>


      </main>
    );
  }
}

export default IndexPage
