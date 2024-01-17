# Receipt Generator

Generates a PDF receipt from a JSON object.

## Purpose

This component is part of a group of components that work together to produce rent receipts automatically in response to a client sending an eTransfer.

Components:

1. interac-parser: converts an Interac email into a JSON object containing the data relevant to the receipt.
2. payment-validator: validates an Interac payment (JSON object from #1) and produces another JSON object formatted ready to for PDF conversion.
3. receipt-generator (this component): Converts the JSON object from #2 to a PDF receipt
4. receipt-mailer: Mails the receipt to the client.

## Process

First, the JSON input object is converted to an HTML version of the receipt. This is then exported to PDF via a headless Chromium browser, using the puppeteer Node.js library.

## Input

A structure containing the receipt fields:

```
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
```

## Output

Produces a PDF receipt. Example:

<img src="https://lcchomes.com/images/SampleReceipt1.jpg" />

## Puppeteer image handling

* Puppeteer purposely blocks local resource files for security reasons. This means we cannot load images from a local folder from within the html markup in the usual way, ex: `<img src="filePath/fileName.jpg">`. This will be blocked.

    * Ways to get around this:
        * a) Run a web server and access the image from localhost. 
             * Not a great solution since I don't want to keep a web server running just to have images served up for this process. 
        * b) Host the image on a remote server. 
            * Also not ideal, since it relies on the resource always being present, and it also means that I can no longer keep all resources for this module together in one place.
        * c) Embed the images direcly into the html, encoded as base 64.
            * `<img src="data:image/jpeg;base64,[encoded image]`
            * The images for this project small enough that this is a practical solution.
    
Note: Method c) is being used in this project.

# Image format and storage considerations

* I will probably move to storing images in a database, already base64-encoded. Right now I'm reading them in from the file system and converting them within this module.   
* Note that images are optional on the receipt. If used, they would tend to be quite small (ex: logo, signature).