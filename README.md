# Receipt Generator

Generates a PDF receipt from a JSON object.

## Process

Generates an HTML version of the receipt and converts it to PDF using a headless Chromium browser, using the puppeteer module.

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

