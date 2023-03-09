import { Client, RemoteAuth } from "whatsapp-web.js";
import dotenv from "dotenv";
dotenv.config();
// Require database
import { MongoStore } from "wwebjs-mongo";
import mongoose from "mongoose";
let client;
// Load the session data
mongoose.connect(process.env.MONGODB_URI || "").then(() => {
    const store = new MongoStore({ mongoose: mongoose });
    client = new Client({
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000,
        }),
    });
    client.initialize();
});
export default client;
