import { generateReport } from "@/utils/generateReport";
import pdf from "html-pdf";
var html_to_pdf = require("html-pdf-node");

export default async function generatePdf(req, res) {
  const patient = req.body;
  const html = generateReport(patient);
  const options = { format: "A4" };
  // const filename = `${Math.random()}.pdf`;

  html_to_pdf.generatePdf({content: html}, options).then((pdfBuffer) => {
    console.log("PDF Buffer:-", pdfBuffer);
    res.setHeader("Content-Disposition", `attachment; filename="${Math.random()}.pdf"`);
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfBuffer, "base64"));
    
  });
}