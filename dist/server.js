import client from "./config/whatsapp.config";
import qrcode from "qrcode-terminal";
import handleMessage from "./controllers/message.controller";
import startAutomation from "./utils";
const startServer = async () => {
    try {
        client.on("qr", (qr) => {
            qrcode.generate(qr, { small: true });
        });
        client.on("ready", () => {
            console.log("client is ready");
            startAutomation();
        });
        client.on("message", async (message) => {
            const chat = await message.getChat();
            if (chat.isGroup) {
                return null;
            }
            if (message.body.length === 0) {
                return null;
            }
            if (message.from === "status@broadcast") {
                return null;
            }
            if (message.body.startsWith("! ")) {
                const response = await new Promise((resolve, reject) => {
                    handleMessage(message.body, (err, res) => {
                        if (err) {
                            reject(new Error(err));
                        }
                        else {
                            resolve(res);
                        }
                    });
                });
                message.reply(response);
            }
        });
        client.initialize();
    }
    catch (err) {
        console.log(`Failed to initialize the client: ${err.message}`);
    }
};
startServer();
