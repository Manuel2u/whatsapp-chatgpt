import client from "./config/whatsapp.config";
import qrcode from "qrcode-terminal";
import handleMessage from "./controllers/message.controller";
import { Chat, Message } from "whatsapp-web.js";

const startServer = async () => {
  try {
    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("client is ready");
    });

    client.on("message", async (message: Message) => {
      const chat: Chat = await message.getChat();
      if (chat.isGroup) {
        return null;
      }
      if (message.body.length === 0) {
        return null;
      }
      if (message.from === "status@broadcast") {
        return null;
      }
      const response: any = await new Promise((resolve, reject) => {
        handleMessage(message.body, (err: any, res: any) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(res);
          }
        });
      });

      message.reply(response);
    });

    client.initialize();
  } catch (err: any) {
    console.log(`Failed to initialize the client: ${err.message}`);
  }
};

startServer();
