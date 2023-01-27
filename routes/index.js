const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");

router.get("/invoice/:text", (req, res, next) => {
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment;filename=invoice.pdf",
  });

  let text;
  if (req.params.text) {
    text = req.params.text.toString();
  }

  const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
  doc.on("data", (chunk) => stream.write(chunk));
  doc.on("end", () => stream.end());
  doc.fontSize(25).text(`${text}`);
  doc.end();
});

module.exports = router;
