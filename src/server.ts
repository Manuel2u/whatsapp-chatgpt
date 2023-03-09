import client from "./config/whatsapp.config";
import qrcode from "qrcode-terminal";
import handleMessage from "./controllers/message.controller";
import { Chat, Message } from "whatsapp-web.js";
import startAutomation from "./utils";
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, welcome to my Bot!");
});

const startClient = async () => {
  try {
    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("client is ready");
      startAutomation();
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
      // if (message.body.startsWith("! ")) {
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

    await client.initialize();
  } catch (err: any) {
    console.log(`Failed to initialize the client: ${err.message}`);
  }
};

app.listen(process.env.PORT || 3000, async () => {
  await startClient();
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
