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

<img src="https://lcchomes.com/images/SampleReceipt1.jpg" />

## Purpose

This component is part of a group of components that will work together to produce rent receipts automatically in response to a client sending an eTransfer.

Components:

1. interac-parser: converts an Interac email into a JSON object containing the data relevant to the receipt.
2. payment-validator: validates an Interac payment (JSON object from #1) and produces another JSON object formatted ready to for PDF conversion.
3. receipt-generator (this component): Converts the JSON object from #2 to a PDF receipt
4. receipt-mailer: Mails the receipt to the client.

