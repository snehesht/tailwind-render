### tailwind-render [WIP]
Render html template with Tailwind CSS

Uses `tailwind cli` to generate and minify CSS from html before injecting into it.


#### TODO
 - [ ] Add ejs/pug template engine support
 - [ ] Add ExpressJS support

### Usage
```bash
npm i tailwind-render
````

```js
const compile = require('compile')

const baseTailwindCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`

const htmlContent = `<h1 class="text-5xl font-bold text-blue-900 px-10 py-10">Hello World!</h1>`

const renderedHtmlContent = compile(htmlContent, baseTailwindCss);

// <html><head><style type="text/css">*,::after,::before........................
// .text-xl{font-size:1.25rem;line-height:1.75rem}.font-bold{font-weight:700}</style>
// </head><body><h1 class="text-xl font-bold">Hello World!</h1></body></html>

```
![Screenshot from 2022-07-03 04-44-35](https://user-images.githubusercontent.com/5787031/177032289-48a6e6f8-b012-47d7-bc2e-4b608471c77c.png)

Inspired from [mailwind](https://github.com/soheilpro/mailwind) by [soheilpro](https://github.com/soheilpro)

## License
MIT License

Copyright (c) 2022 Snehesh Thalapaneni

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
