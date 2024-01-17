/**
 * Test Receipt
 *  
 * Creates an receipt from the sample oject and converts it to a PDF.
 * 
 * @author Lisa Wall <lisac@live.ca>
 */
import Receipt from '../src/Receipt.js';

let sampleReceipt = 
{
    logoFilePath: "../images/logo.png",               // Optional. Logo should be approx 80px square.
    receiptTitle: "Rent Receipt",                     // ex: "Rent Receipt", "Service Receipt"
    dateOfIssue: new Date().toLocaleDateString(),     // String. ex: new Date().toLocaleDateString()
    amount: "745.00",                                 // String representation of the amount paid.
    receivedFrom: "Sample Tenant",                    
    receivedBy_Name: "Sample Landlord",
    receivedBy_Title: "(landlord)",                   // Optional
    receivedBy_signatureImageFilePath: "../images/signature-landlord.jpg", // Optional
    paymentMethod: "eTransfer",                       // ex: "eTransfer", "Cheque", "Cash", "Sweat Equity"
    rentalAddress: "1-100 Tenant Avenue, Ottawa ON, K1P 5S3",
    month: "January, 2024"
}

let receipt = new Receipt(sampleReceipt, "../src/receiptTemplate.html");
receipt.toPDF();