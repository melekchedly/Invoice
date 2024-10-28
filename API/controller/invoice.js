const Invoice = require("../models/invoice.js");
const Product = require("../models/product.js");
const Client = require("../models/client.js");
const Seller = require("../models/seller.js");

const xlsx = require("xlsx");
const path = require("path");
const { createObjectCsvWriter } = require("csv-writer");

exports.createInvoice = async (req, res) => {
  const { clientId, sellerId, productIds } = req.body;

  try {
    const productPrices = await Promise.all(
      productIds.map(async (id) => {
        const product = await Product.findById(id);
        return product.price * product.quantity;
      })
    );

    const totalPrice = productPrices.reduce((total, price) => total + price, 0);
    const invoice = await Invoice.create({
      client: clientId,
      seller: sellerId,
      products: productIds,
      totalPrice: Number(totalPrice),
    });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const { invoiceId, clientId, sellerId, productIds } = req.body;
  const ids = productIds.data;

  try {
    const existingInvoice = await Invoice.findById(invoiceId);
    if (!existingInvoice) {
      return res.status(404).send({ message: "Invoice not found" });
    }
    const productPrices = await Promise.all(
      ids.map(async (id) => {
        const product = await Product.findById(id);
        if (!product) {
          return 0;
        }
        return product.price * product.quantity;
      })
    );

    const totalPrice = productPrices.reduce((total, price) => total + price, 0);

    existingInvoice.client = clientId.data;
    existingInvoice.seller = sellerId.data;
    existingInvoice.products = ids;
    existingInvoice.totalPrice = Number(totalPrice);

    const updatedInvoice = await existingInvoice.save();

    res.status(200).json(updatedInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.json({ message: "Invoice deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const { clientFullName, companyName, page, limit, order = 1 } = req.query;

  console.log(order);
  try {
    let clientIds = [];
    let sellerIds = [];

    if (clientFullName) {
      const clients = await Client.find({
        fullName: { $regex: clientFullName, $options: "i" },
      });
      clientIds = clients.map((client) => client._id);
    }

    if (companyName) {
      const sellers = await Seller.find({
        companyName: { $regex: companyName, $options: "i" },
      });
      sellerIds = sellers.map((seller) => seller._id);
    }

    const query = {};

    if (clientIds.length > 0) {
      query.client = { $in: clientIds };
    }
    if (sellerIds.length > 0) {
      query.seller = { $in: sellerIds };
    }
    const invoices = await Invoice.find(query)
      .populate("client", "fullName")
      .populate("seller", "companyName")
      .populate("products")
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .sort({ totalPrice: parseInt(order) })
      .exec();

    const count = await Invoice.countDocuments(query);
    res.json({
      invoices,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id)
      .populate("client")
      .populate("seller")
      .populate("products");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.export = async (req, res) => {
  const csvWriter = createObjectCsvWriter({
    path: "invoices.csv",
    header: [
      { id: "client", title: "Fullname" },
      { id: "address", title: "address" },
      { id: "phone", title: "phone" },
      { id: "companyname", title: "companyname" },
      { id: "addressCom", title: "address" },
      { id: "product1_title", title: "Product 1 Title" },
      { id: "product1_price", title: "Product 1 Price" },
      { id: "product1_quantity", title: "Product 1 Quantity" },
      { id: "product2_title", title: "Product 2 Title" },
      { id: "product2_price", title: "Product 2 Price" },
      { id: "product2_quantity", title: "Product 2 Quantity" },
    ],
  });
  const invoices = await findAllEager();
  const records = invoices.map((invoice) => {
    const baseRecord = {
      client: invoice.client.fullName,
      address: invoice.client.address,
      phone: invoice.client.phone,
      companyname: invoice.seller.companyName,
      addressCom: invoice.seller.address,
    };

    invoice.products.forEach((product, index) => {
      const productIndex = index + 1; // Start indexing from 1
      baseRecord[`product${productIndex}_title`] = product.title;
      baseRecord[`product${productIndex}_price`] = product.price;
      baseRecord[`product${productIndex}_quantity`] = product.quantity;
    });

    return baseRecord;
  });

  try {
    console.log(records);
    await csvWriter.writeRecords(records);
    res.download("invoices.csv");
  } catch (error) {
    console.error("Error writing CSV:", error);
    res.status(500).send("Error generating CSV");
  }
};

findAllEager = async () => {
  try {
    response = await Invoice.find()
      .populate("client")
      .populate("seller")
      .populate("products");
    return response;
  } catch (e) {
    console.log;
  }
};

exports.upload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../uploads", req.file.filename);

    const workbook = xlsx.readFile(filePath);

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const headers = data[0];
    const objectsArray = data.slice(1).map((row) => {
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    const newInvoices = await createInvoices(objectsArray);

    console.log(newInvoices);
    res.json(newInvoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process the uploaded file" });
  }
};

const createInvoices = async (ArrayInvoices) => {
  const newInvoices = [];

  for (const invoice of ArrayInvoices) {
    const {
      Fullname,
      address,
      phone,
      companyname,
      addressCom = address,
    } = invoice;

    const savedProductIds = [];
    let totalPrice = 0;

    for (let i = 1; i <= 2; i++) {
      const title = invoice[`Product ${i} Title`];

      const price = invoice[`Product ${i} Price`];

      const quantity = invoice[`Product ${i} Quantity`];

      if (title) {
        totalPrice += price * quantity;

        const savedProduct = await Product.create({ title, price, quantity });
        savedProductIds.push(savedProduct._id);
      }
    }
    const savedClient = await Client.create({
      fullName: Fullname,
      address,
      phone,
    });
    const savedClientId = savedClient._id;
    const savedSeller = await Seller.create({
      companyName: companyname,
      address: addressCom,
    });

    const savedSellerId = savedSeller._id;
    const theInvoice = await Invoice.create({
      client: savedClientId,
      seller: savedSellerId,
      products: savedProductIds,
      totalPrice,
    });

    newInvoices.push(theInvoice);
  }
  return newInvoices;
};
