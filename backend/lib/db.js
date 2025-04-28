import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB bağlantısı başarılı (db.js üzerinden)");
    } catch (error) {
        console.error("❌ MongoDB bağlantı hatası (db.js üzerinden):", error);
        process.exit(1);
    }
};

export default connectDB;
