# Receipt Generator

Generates a PDF receipt from a JSON object.

## Process

First, the JSON input object is converted to an HTML version of the receipt. This is then exported to PDF via a headless Chromium browser, using the puppeteer Node.js library.

## Input

A JSON object in the following format:

```
{
    "receivedFrom": "Sample Tenant",
    "amount": 745,
    "dateOfIssue": new Date(),
    "receivedBy": 
    {
        "name": "Sample Landlord",
        "title": "(landlord)",
        "signatureImage": "signature-landlord.jpg"
    },
    "paymentMenthod": "eTransfer",
    "receiptTitle": "Rent Receipt",
    "logoFilename": "logo.png",
    "month": "January, 2024",
    "paymentMethod": "eTransfer",
    "rentAddress": "3-300 Tenant Avenue, Ottawa ON, K1L 7C5"
}
```

## Output

Produces a PDF receipt. Example:

<img src="https://lcchomes.com/images/SampleReceipt.jpg" />

