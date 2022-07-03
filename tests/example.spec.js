const compile = require('../src/index');

const htmlContent = `<h1 class="text-xl font-bold">Hello World!</h1>`

describe("Compile", () => {
  it("should inject tailwind css into html", async () => {
    const compiledContent = await compile(htmlContent);
    expect(compiledContent.includes(htmlContent)).toEqual(true)
    expect(compiledContent.includes('</style>')).toEqual(true)
  })
})
