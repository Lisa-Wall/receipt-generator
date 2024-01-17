import puppeteer from "puppeteer"; // To launch a headless Chromium browser
import fs from "fs";

/**
 * Creates a receipt.
 * 
 * Generates a PDF version of the receipt as follows:
 *      1. Builds the HTML markup from the receipt fields.
 *      2. Converts the receipt to PDF using a headless Chromium browser via the puppeteer Node.js library. 
 * 
 * Note: Puppeteer purposely blocks local resource files for security reasons. This means we cannot load 
 * images from a local folder from within the html markup in the usual way, ex: <img src="filePath/fileName.jpg">
 * Intstead, we embed the images direcly into the html, encoded as base 64. ex: <img src="data:image/jpeg;base64,[encoded image]
 * See README for further detail.
 *
 * @class
 * @author Lisa Wall <lisac@live.ca>
 */
export default class Receipt
{
    /**
     * Receipt fields.
     */
    receipt = 
    {
        logoFilePath: "",                      // Optional. Logo should be approx 80px square.
        receiptTitle: "Receipt",               // ex: "Rent Receipt", "Service Receipt"
        dateOfIssue: "2024-01-15",             // String. ex: new Date().toLocaleDateString()
        amount: "745.00",                      // String representation of the amount paid.
        receivedFrom: "Sample Tenant",
        receivedBy_Name: "Sample Landlord",
        receivedBy_Title: "",                  // Optional. ex: (landlord)
        receivedBy_signatureImageFilePath: "", // Optional. If you want a signature on the receipt.
        paymentMethod: "",                     // ex: "eTransfer", "Cheque", "Cash", "Sweat Equity"
        rentalAddress: "1-100 Tenant Avenue, Ottawa ON, K1P 5S3",
        month: "January, 2024"
    }

    displayLogo = "none"; // "none" or "block"
    base64Img_Signature = "";
    base64Img_Logo = "";
    receiptTemplateFilePath = "receiptTemplate.html"; // Default HTML template file used to display receipt. User can provide their own if desired.

    /**
     * Creates a receipt.
     * 
     * @param {*} receipt                      // The receipt fields. See expected structure above.
     * @param {string} receiptTemplateFilePath // Optional. A receipt template (html file). The user can customize the receipt by providing their own template file if desired.
     */
    constructor(receipt, receiptTemplateFilePath = this.receiptTemplateFilePath)
    {
        Object.assign(this.receipt, receipt);
        this.receiptTemplateFilePath = receiptTemplateFilePath;
        this.displayLogo = (this.receipt.logoFilePath) ? "block" : "none";

        // If a logo is present, encode it for embedding in HTML
        if (this.receipt.logoFilePath)
        {
            this.base64Img_Logo = this.getImgBase64(this.receipt.logoFilePath);
        }

        // If a signature is present, encode it for embedding in HTML
        if (this.receipt.receivedBy_signatureImageFilePath)
        {
            this.base64Img_Signature = this.getImgBase64(this.receipt.receivedBy_signatureImageFilePath);
        }
    }

    /**
     * Converts the receipt to HTML. Uses eval to substitute the receipt fields into the markup.
     *   
     * @returns an HTML string.
     */
    toHTML()
    {
        let receipt = this.receipt; // simplify namespace for easier reference within the html. 
        let HTML = '`'+fs.readFileSync(this.receiptTemplateFilePath,'utf8')+'`'; 
        return eval(HTML);
    }

    /**
     * Converts the receipt to PDF using a headless Chromium browser via the puppeteer Node.js library.
     * The markup is first built from the receipt fields and then converted to PDF.
     * 
     * Note: When working with this function, it is useful to turn headless mode off in order to 
     * view the contents of the browser window.
     * Headed mode: puppeteer.launch({headless: false})
     * Headless mode: puppeteer.launch({headless: 'new'})
     */
    toPDF() 
    {
        (async () => 
        {
            const browser = await puppeteer.launch({headless: 'new'});
            const page = await browser.newPage();
            await page.setContent(this.toHTML());
            await page.addStyleTag({ path: '../src/receipt.css' });
            await page.pdf({ path: 'receipt.pdf', format: 'A4', printBackground: true });
            await browser.close();
        })();
    }

    /**
     * Encodes an image to base64
     * @param {string} imgFilePath 
     * @returns {string} // The base64 encoded image
     */
    getImgBase64(imgFilePath)
    {
        return fs.readFileSync(imgFilePath, {encoding: 'base64'});
    }
} 