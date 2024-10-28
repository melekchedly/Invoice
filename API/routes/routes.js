module.exports = (app) => {
  const invoice = require("../controller/invoice.js");
  const client = require("../controller/client.js");
  const product = require("../controller/product.js");
  const seller = require("../controller/seller.js");
  const multer = require("multer");
  const path = require("path");

  const uploadPath = path.join(__dirname, "../uploads");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  var router = require("express").Router();

  router.post("/invoices", invoice.createInvoice);
  router.get("/invoices", invoice.findAll);
  router.get("/invoices/export", invoice.export);
  router.post("/invoices/upload", upload.single("file"), invoice.upload);
  router.delete("/invoices/:id", invoice.delete);
  router.get("/invoices/:id", invoice.getById);
  router.put("/invoices", invoice.update);

  router.post("/sellers", seller.create);
  router.put("/sellers", seller.update);

  router.post("/clients", client.create);
  router.put("/clients", client.update);

  router.post("/products", product.create);
  router.put("/products", product.update);

  app.use("/api/v1", router);
};
