import puppeteer from "puppeteer"; // To launch a headles Chromium browser
import fs from "fs";

/**
 * Represents a receipt. 
 * Expects a JSON object representing the data.
 * 
 * Generates an HTML version of the receipt and converts it to PDF using a headless Chromium browser via the puppeteer Node.js library.
 * 
 * @class
 * @author Lisa Wall <lisac@live.ca>
 */
export default class Receipt
{
    constructor(receiptData)
    {
        this.receivedFrom  = receiptData.receivedFrom;
        this.dateOfIssue   = receiptData.dateOfIssue.toLocaleDateString();
        this.amount        = eval(receiptData.amount).toFixed(2);
        this.receivedBy    = receiptData.receivedBy;
        this.paymentMethod = receiptData.paymentMethod;
        this.receiptTitle  = receiptData.receiptTitle ? receiptData.receiptTitle : "Receipt";
        this.rentAddress   = receiptData.rentAddress;
        this.month         = receiptData.month;
        this.logoFilename  = receiptData.logoFilename;
    }

    toHTML()
    {
        let HTML = '`'+fs.readFileSync('../src/receipt.html','utf8')+'`';        
        return eval(HTML);
    }

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

    

} 