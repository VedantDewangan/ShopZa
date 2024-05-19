const mongoose = require("mongoose");

const ConnectionBD = async () => {
    try {
        await mongoose.connect("mongodb+srv://vedantdewangan75:j5UpAkD6z9FMBM6a@cluster0.pfybt2w.mongodb.net/vedantdewangan75?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connection with DataBase is Successfull");
    } catch (error) {
        console.log(error);
        console.log("Connection with DataBase is Failed");
    }
}

module.exports = { ConnectionBD }