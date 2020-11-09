const puppeteer = require("puppeteer");
const hbs = require("hbs");
const fs = require("fs-extra");
const path = require("path");
const compile = async function (templateName, data) {
  const filePath = path.join(
    __dirname,
    "../../templates/views",
    `${templateName}.hbs`
  );
  console.log(filePath);
  const html = await fs.readFile(filePath, "utf-8");
  return hbs.compile(html)(data);
};
const createPDF = async (user) => {
  try {
    const pdfPath = path.join(__dirname, "../../public/mypdf.pdf");
    console.log(pdfPath, "xxxxxx");
    // const browser = await puppeteer.launch({ defaultViewport: null });
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    const content = await compile("success", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      date: user.date,
    });
    await page.setContent(content);
    await page.setDefaultNavigationTimeout(0);
    await page.emulateMediaType("screen");
    // page.addStyleTag({
    //   path: "./public/css/success.css",
    // });
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      format: "A4",
    });

    console.log("done");
    await browser.close();
    // process.exit();
  } catch (err) {
    console.log(err);
  }
};

module.exports = createPDF;
