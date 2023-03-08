import { Client, LocalAuth,} from "whatsapp-web.js"

const client = new Client({
    authStrategy : new LocalAuth(),
    puppeteer: {
      args: ['--no-sandbox','--disable-setuid-sandbox'],
    }
})


export default client