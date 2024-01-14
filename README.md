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
    "receivedBy": 
    [
        {
            "name": "Sample Landlord",
            "signatureURL": "./images/signature-landlord.jpg"
        }
    ],
    "paymentMenthod": "eTransfer",
    "logoURL": "../images/logo-lcchomes.png",
    "dateOfIssue": "2024-01-13",
    "receiptTitle": "Rent Receipt"
}
```

## Output

Produces a PDF receipt. Sample:

<img src="https://lcchomes.com/images/SampleReceipt.jpg"
/>

