import * as React from "react"
import DumbTextarea from "../components/DumbTextarea"
import FormTextarea from "../components/FormTextarea"
import SvgImage from '../components/SvgImage'
import mixpanel from 'mixpanel-browser';
import { Helmet } from "react-helmet"

mixpanel.init('951229746a9235dd49749d8f6490ac83', {debug: true, ignore_dnt: true})
mixpanel.track('Website Visit')

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

        <Helmet htmlAttributes={{ lang: 'en',}}>
          <meta charSet="utf-8" />
          <title>SVG Encoder</title>
          <link rel="canonical" href="http://svgencode.com" />
          <meta name="description" content="SVG URI-Encoder and Base64 Converter Tool." />
        </Helmet>

        
        
        <div className="w-full flex flex-col lg:flex-row min-h-screen">

          <div className="w-full lg:w-1/6 p-4 bg-slate-100">
              <div className="sticky top-0 p-4 w-full h-full flex flex-col gap-8">
                  <h1 className="">⚙️ SVG Encoder / Converter</h1>

                  <h2 className="text-sm">
                    A simple tool to convert an SVG into different formats, ready for use in CSS and HTML.
                  </h2>

                  <a className="hover:fill-blue-800 fill-black" href="https://github.com/IORoot/SVGencode">
                    <svg role="img" width="2rem" height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>

                  <p className="text-xxs mt-auto">Created by Andy Pearson (IORoot) 2022.</p>
              </div>
          </div>


          <div role="main" className="w-full lg:w-4/6 p-4 grid grid-cols-4 gap-6 auto-rows-auto mb-auto">

              {/* Input */}
              <FormTextarea className="col-span-4 lg:col-span-3" onSvgChange={this.handleSvgRawChange} rows="7" label="SVG Raw Code"></FormTextarea>
              
              {/* Image */}
              <div className="col-span-full lg:col-span-1 flex sm:flex-col px-2">
                  <h3 className="mb-2 text-sm font-medium text-gray-900">SVG Preview</h3>
                  <SvgImage className="w-full h-40 checkered overflow-scroll rounded">{this.state.svgRawCode}</SvgImage>
              </div>


            <h3 className="col-span-4 text-xl text-blue-900 border-b-2 border-blue-900">URL-Encoding</h3>

              {/* URL Encoding without spaces */}
              <DumbTextarea id="svgUrlregexEncoded" className="col-span-2 lg:col-span-1" label="URL-Encoded" rows="3" content={this.state.svgUrlregexEncoded}>Spaces excluded.</DumbTextarea>

              {/* CSS Inline URL-Encoded */}
              <DumbTextarea id="svgCSSReadyInline" className="col-span-2 lg:col-span-1" label="URL-Encoded CSS " rows="3" content={this.state.svgCSSReadyInline}>background-image:url()</DumbTextarea>

              {/* HTML Image URL-Encoded */}
              <DumbTextarea id="svgHTMLimg" className="col-span-2 lg:col-span-1" label="URL-Encoded <img>" rows="3" content={this.state.svgHTMLimg}> &#60;img src="" &#62; </DumbTextarea>

              {/* HTML Object URL-Encoded */}
              <DumbTextarea id="svgHTMLobject" className="col-span-2 lg:col-span-1" label="URL-Encoded <object>" rows="3" content={this.state.svgHTMLobject}> &#60;object type="" data="" &#62; </DumbTextarea>







            <h3 className="col-span-4 text-xl text-blue-900 border-b-2 border-blue-900">Base64 Encoded</h3>

              {/* Base64 Encoded */}
              <DumbTextarea id="svgBase64Encoded" className="col-span-2 lg:col-span-1" label="Base64 Encoded" rows="3" content={this.state.svgBase64Encoded}>Single-quotes and Whitespace removed</DumbTextarea>

              {/* CSS Inline Base64 */}
              <DumbTextarea id="svgCSSReadyInlineB64" className="col-span-2 lg:col-span-1" label="Base64 Encoded CSS" rows="3" content={this.state.svgCSSReadyInlineB64}>background-image:url()</DumbTextarea>

              {/* HTML Image Base64-Encoded */}
              <DumbTextarea id="svgHTMLimgB64" className="col-span-2 lg:col-span-1" label="Base64 Encoded <img>" rows="3" content={this.state.svgHTMLimgB64}> &#60;img src="" &#62; </DumbTextarea>
              
              {/* HTML Object Base64-Encoded */}
              <DumbTextarea id="svgHTMLobjectB64" className="col-span-2 lg:col-span-1" label="Base64 Encoded <object>" rows="3" content={this.state.svgHTMLobjectB64}> &#60;object type="" data="" &#62; </DumbTextarea>




            <h3 className="col-span-4 text-xl text-blue-900 border-b-2 border-blue-900">Alterations</h3>

              {/* One-Liner */}
              <DumbTextarea id="svgRawCodeOneLine" className="col-span-2 lg:col-span-1" label="One-liner" rows="2" content={this.state.svgRawCodeOneLine}>Removed newlines and extra whitespace</DumbTextarea>

              {/* Single Quotes */}
              <DumbTextarea id="svgRawSingleQuotes" className="col-span-2 lg:col-span-1" label="Single-Quotes" rows="2" content={this.state.svgRawSingleQuotes}>Convert all quotes to singles</DumbTextarea>

              {/* Double Quotes */}
              <DumbTextarea id="svgRawDoubleQuotes" className="col-span-2 lg:col-span-1" label="Double-Quotes" rows="2" content={this.state.svgRawDoubleQuotes}>Convert all quotes to doubles</DumbTextarea>

              {/* No Colour */}
              <DumbTextarea id="svgRawCodeNoColour" className="col-span-2 lg:col-span-1" label="No Colour" rows="2" content={this.state.svgRawCodeNoColour}>Removed All Fills and Strokes</DumbTextarea>

              {/* No Transforms */}
              <DumbTextarea id="svgRawCodeNoTransforms" className="col-span-2 lg:col-span-1" label="No Transforms" rows="2" content={this.state.svgRawCodeNoTransforms}>Removed All Transforms</DumbTextarea>

              {/* No Groups */}
              <DumbTextarea id="svgRawCodeNoGroups" className="col-span-2 lg:col-span-1" label="No Groups" rows="2" content={this.state.svgRawCodeNoGroups}>Removed All Groups</DumbTextarea>




            <h3 className="col-span-4 text-xl text-blue-900 border-b-2 border-blue-900">Other Encodings</h3>

              {/* Encode using encodeURI() */}
              <DumbTextarea id="svgEncodedUri" className="col-span-2 lg:col-span-1" label="Encode URI" rows="3" content={this.state.svgEncodedUri}>encodeURI(svg)</DumbTextarea>

              {/* Encode using encodeURIComponent() */}
              <DumbTextarea id="svgUrlComponentEncoded" className="col-span-2 lg:col-span-1" label="Encode-URI Component" rows="3" content={this.state.svgUrlComponentEncoded}>encodeURIComponent(svg)</DumbTextarea>



          </div>

          <div className="w-1/6 grow shrink-0 p-4 bg-slate-200 flex flex-col gap-4" >
            <iframe title="ad1" sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style={{width: '120px', height: '240px'}} marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0" src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=londonparkour-21&language=en_GB&marketplace=amazon&region=GB&placement=B08GTYFC37&asins=B08GTYFC37&linkId=5d023d3ef7d25a1e7fe25c805de781e7&show_border=true&link_opens_in_new_window=true"></iframe>
            <iframe title="ad2" sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style={{width: '120px', height: '240px'}} marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0" src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=londonparkour-21&language=en_GB&marketplace=amazon&region=GB&placement=B08PVD4Y33&asins=B08PVD4Y33&linkId=104d2b03fe933bc76dd288160495feba&show_border=true&link_opens_in_new_window=true"></iframe>
            <iframe title="ad3" sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style={{width: '120px', height: '240px'}} marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0" src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=londonparkour-21&language=en_GB&marketplace=amazon&region=GB&placement=B09MT2W356&asins=B09MT2W356&linkId=60a391aa306ae2dbfb259a3fb4d9cae1&show_border=false&link_opens_in_new_window=true"></iframe>
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
