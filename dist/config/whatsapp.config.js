import { Client, LocalAuth, } from "whatsapp-web.js";
const client = new Client({
    authStrategy: new LocalAuth()
});
export default client;
