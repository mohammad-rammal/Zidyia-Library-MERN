const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully Connected To MongoDB.");
    } catch (error) {
        console.log("Connection Failed to MongoDB!", error);
    }
}