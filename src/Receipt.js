import puppeteer from "puppeteer";
import fs from "fs";

/**
 * Represents a receipt. 
 * Expects a JSON object representing the data.
 * 
 * Generates an HTML version of the receipt and converts it to PDF using a headless Chromium browser, using the puppeteer module.
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
        this.amount        = receiptData.amount;
        this.receivedBy    = receiptData.receivedBy;
        this.paymentMethod = receiptData.paymentMethod;
        this.receiptTitle  = receiptData.receiptTitle ? receiptData.receiptTitle : "Receipt";
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
            await page.pdf({ path: 'example.pdf', format: 'A4' });
            await browser.close();
            console.log('PDF created!');
        })();
    }


} 