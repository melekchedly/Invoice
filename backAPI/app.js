const express = require('express');
const cors = require('cors');


const dbConnect = require("./config/dbConfig");

const port = 3000;
var corsOptions = {
    origin: "*"
  };



const app = express();
dbConnect()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Welcome test app" });
});


require("./routes/routes")(app);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
