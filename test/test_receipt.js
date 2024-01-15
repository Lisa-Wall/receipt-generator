/**
 * Test Receipt
 *  
 * Creates a sample JSON object representing a receipt and converts it to a PDF.
 * 
 * @author Lisa Wall <lisac@live.ca>
 */
import Receipt from '../src/Receipt.js';

let receiptData = 
{
    "receivedFrom": "Sample Tenant",
    "amount": 745,
    "dateOfIssue": new Date(),
    "receivedBy": 
    {
        "name": "Lisa Wall",
        "title": "(landlord)",
        "signatureImage": "signature-lisa.jpg"
    },
    "paymentMenthod": "eTransfer",
    "receiptTitle": "Rent Receipt",
    "logoFilename": "logo.png",
    "month": "January, 2024",
    "paymentMethod": "eTransfer",
    "rentAddress": "3-300 Tenant Avenue, Ottawa ON, K1L 7C5"
}

let receipt = new Receipt(receiptData);
receipt.toPDF();