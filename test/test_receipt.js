
import Receipt from '../src/Receipt.js';

let receiptData = 
{
    "receivedFrom": "Sample Tenant",
    "dateOfIssue": new Date(),
    "receivedBy": 
    [
        {
            "name": "Lisa Wall",
            "signatureURL": "./images/signature-lisa.jpg"
        },
        {
            "name": "Charbel Choueiri",
            "signatureURL": "./images/signature-charbel.jpg"
        }
    ],
    "paymentMenthod": "eTransfer",
    "receiptTitle": "Rent Receipt",
    "logoURL": "../images/logo-lcchomes.png"

}

let receipt = new Receipt(receiptData);
receipt.toPDF();