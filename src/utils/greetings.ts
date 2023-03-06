import people from "../data/recipients.json";
import client from "../config/whatsapp.config";
import api from "../config/chatgpt.config";
import handleMessage from "../controllers/message.controller";
// import { ChatResponse } from "chatgpt";

const sendGreetingText = async () => {
  try {
    for (const person of people) {
      const phone = person.phone + "@c.us";

      // Ask ChatGPT for a greeting based on the recipient's relationship
      let prompt: string;

      if (person.relationship === "Friend") {
        prompt =
          "Give me a goodmorning text for my boss and remind him we have job to do";
      } else if (person.relationship === "Girlfriend") {
        prompt =
          "Give a sweet good morning text to send my girlfriend. It should be 10 words or less.";
      }
      const response: any = await new Promise((resolve, reject) => {
        handleMessage(prompt, (err: any, res: any) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(res);
          }
        });
      });
      // replace all quotation marks with nothing
      //   const message = response.response.replace(/"/g, "");

      // Send the greeting to the recipient
      client.sendMessage(phone, response);
    }
  } catch (err) {
    console.log(err);
  }
};

export default sendGreetingText;
