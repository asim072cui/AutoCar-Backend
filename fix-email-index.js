import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const fixEmailIndex = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;
        const collection = db.collection("employees");

        // Get existing indexes
        const indexes = await collection.indexes();
        console.log("Current indexes:", indexes);

        // Drop the email_1 index if it exists
        try {
            await collection.dropIndex("email_1");
            console.log("Dropped email_1 index successfully");
        } catch (error) {
            console.log("email_1 index may not exist:", error.message);
        }

        // Create a new sparse index on email (allows multiple nulls)
        await collection.createIndex({ email: 1 }, { sparse: true, unique: true });
        console.log("Created new sparse unique index on email");

        console.log("\nIndex fix completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error fixing index:", error);
        process.exit(1);
    }
};

fixEmailIndex();
