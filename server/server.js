const express = require("express");
const cors = require("cors");
const { ConnectionBD } = require("./ConnectionDB");
const { router } = require("./Routes");
const bodyParser = require("body-parser");
const PORT = 3000 || process.env.PORT;
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router)

ConnectionBD().then(() => {
    app.listen(PORT, () => {
        console.log(`Your API is working in port ${PORT}`);
    })
}).catch(err => {
    console.log(err);
})
