

<div id="top"></div>

<div align="center">


<img src="https://svg-rewriter.sachinraja.workers.dev/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40mdi%2Fsvg%406.7.96%2Fsvg%2Fsvg.svg&fill=%23FCD34D&width=200px&height=200px" style="width:200px;"/>

<h3 align="center">SVGEncoder.com Website</h3>

<p align="center">
Convert your SVG to common encodings for CSS & HTML.
</p>    
</div>

##  1. <a name='TableofContents'></a>Table of Contents


* 1. [Table of Contents](#TableofContents)
* 2. [About The Project](#AboutTheProject)
	* 2.1. [Built With](#BuiltWith)
	* 2.2. [Installation](#Installation)
* 3. [Usage](#Usage)
	* 3.1. [Current Encode List](#CurrentEncodeList)
	* 3.2. [Tools](#Tools)
* 4. [ Customising](#Customising)
* 5. [Troubleshooting](#Troubleshooting)
* 6. [Contributing](#Contributing)
* 7. [License](#License)
* 8. [Contact](#Contact)
* 9. [Changelog](#Changelog)


##  2. <a name='AboutTheProject'></a>About The Project

[SVGEncode.com](https://SVGEncode.com)

This is just a small little one-day project to learn gatsby with netlify. I'm always using yoksel's [https://yoksel.github.io/url-encoder/](https://yoksel.github.io/url-encoder/) project, but I sometimes need the result in a Base64 encoded format with a backgroung-image. 

So I thought whis might be a good little project to implement.

<p align="right">(<a href="#top">back to top</a>)</p>


###  2.1. <a name='BuiltWith'></a>Built With

This project was built with the following frameworks, technologies and software.

- [Gatsby](https://www.gatsbyjs.com/)

<p align="right">(<a href="#top">back to top</a>)</p>


###  2.2. <a name='Installation'></a>Installation

These are the steps to get up and running.

1. Clone the repo 
    ```sh
    git clone https://github.com/IORoot/SVGencode
    ```
2. Install package.json
    ```sh
    npm install
    ```
3. Run gatsby
    ```sh
    gatsby clean && gatsby develop
    ```


<p align="right">(<a href="#top">back to top</a>)</p>


##  3. <a name='Usage'></a>Usage

###  3.1. <a name='CurrentEncodeList'></a>Current Encode List
The current list of conversions are:

- URL-Encoded (Quotes and Spaces excluded)
- URL-Encoded CSS background-image:url()
- URL-Encoded &#60;Img&#62; Tag
- URL-Encoded &#60;Object&#62; Tag
- BASE64-Encoded (Quotes and Spaces excluded)
- BASE64-Encoded CSS background-image:url()
- BASE64-Encoded &#60;Img&#62; Tag
- BASE64-Encoded &#60;Object&#62; Tag
- Encoded with Javascript encodeURI()
- Encoded with Javascript encodeURIComponent()

###  3.2. <a name='Tools'></a>Tools
There are some extra functions that are useful for manipulating SVGs

- One-liner. Removes all new-lines and whitespace.
- Single-Quotes. Switch any double-quotes for singles.
- Double-Quotes. Switch any single-quotes for doubles.
- No Colour. Removes the following attributes:
    - `fill=""` 
    - `fill-rule=""`
    - `stroke=""`
    - `stroke-width=""`
- No Transforms. Removes all `transform=""` attribute.
- No Groups. Removes all group `<g>` and `</g>` tags.


##  4. <a name='Customising'></a> Customising

None.

##  5. <a name='Troubleshooting'></a>Troubleshooting

None

<p align="right">(<a href="#top">back to top</a>)</p>


##  6. <a name='Contributing'></a>Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



##  7. <a name='License'></a>License

Distributed under the MIT License.

MIT License

Copyright (c) 2022 Andy Pearson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<p align="right">(<a href="#top">back to top</a>)</p>



##  8. <a name='Contact'></a>Contact

Author Link: [https://github.com/IORoot](https://github.com/IORoot)

<p align="right">(<a href="#top">back to top</a>)</p>

##  9. <a name='Changelog'></a>Changelog

v1.0.0 - First version.
