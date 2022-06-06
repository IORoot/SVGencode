# SVG Encoder

[SVGEncode.com](SVGEncode.com)

Convert your SVG to common encodings for CSS & HTML.

---

## Current Encode List
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

## Tools
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

## Reasoning

This is just a small little one-day project to learn gatsby with netlify. I'm always using yoksel's [https://yoksel.github.io/url-encoder/](https://yoksel.github.io/url-encoder/) project, but I sometimes need the result in a Base64 encoded format with a backgroung-image. So I thought whis might be a good little project to implement.


## Changelog

1.0.0 - First version.