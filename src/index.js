const util = require('util');
const path = require('path')
const os = require('os')
const exec = util.promisify(require('child_process').exec);
const { mkdtemp, rm, writeFile, readFile } = require('fs/promises');
const { JSDOM } = require("jsdom");
const cleanCSS = require('@node-minify/clean-css');
const minify = require('@node-minify/core');

// Base tailwind CSS
const baseCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`

async function makeTempDir() {
  return await mkdtemp(path.join(os.tmpdir(), `tailwind_render_${Math.random().toString(36).substring(2, 15)}`));
}

async function compile(htmlContent, inputCss = baseCss) {
  let tmpdir;
  try {
    tmpdir = await makeTempDir();
    const tailwindCLI = path.join(process.cwd(), 'node_modules/tailwindcss/lib/cli.js')

    // Write htmlContent and inputCss to tmpdir
    const htmlContentFile = path.join(tmpdir, 'content.html')
    const inputCssFile = path.join(tmpdir, 'input.css')
    const generatedCssFile = path.join(tmpdir, 'generated.css')
    await writeFile(htmlContentFile, htmlContent);
    await writeFile(inputCssFile, inputCss);

    // Run tailwind CLI to generate CSS based on htmlContent
    const { error, stdout, stderr } = await exec(`node ${tailwindCLI} --input ${inputCssFile} --content ${htmlContentFile} --output ${generatedCssFile}`)
    if (error) {
      throw new Error(error)
    }

    // Read and minify HTML content
    const generatedCss = await readFile(generatedCssFile)
    const minifiedCssContent = await minify({ compressor: cleanCSS, content: generatedCss })

    // Append Stylesheet to htmlContent
    const dom = new JSDOM(htmlContent);
    const head = dom.window.document.getElementsByTagName('head')[0]
    stylesheet = dom.window.document.createElement("style");
    stylesheet.type = 'text/css';
    stylesheet.innerHTML = minifiedCssContent;
    head.appendChild(stylesheet);

    // Serialize dom
    const generatedHtmlContent = dom.serialize()
    return generatedHtmlContent
  } catch(error) {
    console.error('Error', error)
  } finally {
    await rm(tmpdir, { recursive: true })
  }
}

module.exports = compile
